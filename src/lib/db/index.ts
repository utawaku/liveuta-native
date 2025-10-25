import Database from "@tauri-apps/plugin-sql";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import { Context, Data, Effect, Layer } from "effect";

import * as schema from "./schema";

export class SQLiteError extends Data.TaggedError("SQLiteError")<{
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

// export const sqlite = await Database.load(DB_NAME);

// function isSelectQuery(sql: string) {
//   return sql.startsWith("SELECT");
// }

// export const db = drizzle(
//   async (sql, params, method) => {
//     try {
//       // const db = await Database.load("sqlite:liveuta.db");
//       let rows: any = [];
//       let results = [];

//       if (isSelectQuery(sql)) {
//         rows = await sqlite.select(sql, params).catch((e) => {
//           console.error("SQL Error:", e);
//           return [];
//         });
//       } else {
//         rows = await sqlite.execute(sql, params).catch((e) => {
//           console.error("SQL Error:", e);
//           return [];
//         });
//         return { rows: [] };
//       }

//       rows = rows.map((row: any) => {
//         return Object.values(row);
//       });

//       results = method === "all" ? rows : rows[0];
//       return { rows: results };
//     } catch (e) {
//       // @ts-ignore
//       console.error(`Error from sqlite: ${e.response.data}`);
//       return { rows: [] };
//     }
//   },
//   { schema: schema },
// );
