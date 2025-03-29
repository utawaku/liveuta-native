import type { ClientOptions } from "@tauri-apps/plugin-http";
import { fetch as tauriFetch } from "@tauri-apps/plugin-http";
import { Effect, Schema } from "effect";
import { env } from "./env";
import { FetchError, JSONParseError } from "./error";

export function fetch(url: string, init?: RequestInit & ClientOptions) {
  return Effect.tryPromise({
    try: () => tauriFetch(url, init),
    catch: (e) => new FetchError({ message: `Failed to fetch from ${url}`, cause: e }),
  });
}

export function fetchBackend(pathName: string, init?: RequestInit & ClientOptions) {
  return Effect.tryPromise({
    try: () => tauriFetch(`${env.backendUrl}${pathName}`, init),
    catch: (e) =>
      new FetchError({ message: `Failed to fetch from ${env.backendUrl}${pathName}`, cause: e }),
  });
}

export function parseJSON<T extends unknown>(response: Response): Effect.Effect<T, JSONParseError> {
  return Effect.tryPromise({
    try: () => response.json(),
    catch: (e) => new JSONParseError({ message: "Failed to parse JSON", cause: e }),
  });
}

// export function fetchAndParse<T extends unknown>(url: string, init?: ClientOptions) {
//   return Effect.gen(function* (_) {
//     const response = yield* _(fetch(url, init));
//     const json = yield* _(parseJSON<T>(response));

//     return json;
//   });
// }

// export function fetchBackendAndParse<T extends unknown>(pathName: string, init?: ClientOptions) {
//   return Effect.gen(function* (_) {
//     const response = yield* _(fetchBackend(pathName, init));
//     const json = yield* _(parseJSON<T>(response));

//     return json;
//   });
// }

export function fetchAndParse<T extends unknown, A, E>(
  url: string,
  schema: Schema.Schema<A, E>,
  init?: ClientOptions,
) {
  return Effect.gen(function* (_) {
    const response = yield* _(fetch(url, init));
    const json = yield* _(parseJSON<T>(response));
    const data = yield* _(Schema.decodeUnknownEither(schema)(json));

    return data;
  });
}

export function fetchBackendAndParse<T extends unknown, A, E>(
  pathName: string,
  schema: Schema.Schema<A, E>,
  init?: ClientOptions,
) {
  return Effect.gen(function* (_) {
    const response = yield* _(fetchBackend(pathName, init));
    const json = yield* _(parseJSON<T>(response));
    const data = yield* _(Schema.decodeUnknownEither(schema)(json));

    return data;
  });
}
