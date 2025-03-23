import Database from "@tauri-apps/plugin-sql";
import { Context, Data, Effect, Layer } from "effect";

class SQLiteError extends Data.TaggedError("SQLiteError")<{
  message?: string;
  cause?: unknown;
}> {}

type SQLiteImpl = {
  use: <T>(fn: (client: Database) => T) => Effect.Effect<Awaited<T>, SQLiteError>;
};

export class SQLite extends Context.Tag("SQLite")<SQLite, SQLiteImpl>() {}

export function make(uri: string) {
  return Effect.gen(function* (_) {
    const client = yield* Effect.acquireRelease(
      Effect.tryPromise({
        try: () => Database.load(uri),
        catch: (e) =>
          new SQLiteError({ message: `Failed to load SQLite database: ${uri}`, cause: e }),
      }),
      (client) => Effect.promise(() => client.close()),
    );
    return SQLite.of({
      use: (fn) =>
        Effect.gen(function* (_) {
          const result = yield* Effect.try({
            try: () => fn(client),
            catch: (e) =>
              new SQLiteError({
                message: `Failed to execute SQLite function: ${e}`,
                cause: e,
              }),
          });
          if (result instanceof Promise) {
            return yield* Effect.tryPromise({
              try: () => result,
              catch: (e) =>
                new SQLiteError({ message: `Failed to execute SQLite function: ${e}`, cause: e }),
            });
          }

          return result;
        }),
    });
  });
}

export function sqliteLayer(uri: string) {
  return Layer.scoped(SQLite, make(uri));
}
