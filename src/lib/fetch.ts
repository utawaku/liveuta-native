import type { ClientOptions } from "@tauri-apps/plugin-http";

import { fetch as tauriFetch } from "@tauri-apps/plugin-http";
import { Effect, Schema } from "effect";

import { env } from "./env";
import { FetchError, JSONParseError } from "./error";

export function fetch(url: string, init?: RequestInit & ClientOptions) {
  return Effect.tryPromise({
    try: async () => {
      const response = await tauriFetch(url, init);
      if (!response.ok) throw new FetchError({ message: `HTTP ${response.status} from ${url}` });
      return response;
    },
    catch: (cause) =>
      cause instanceof FetchError
        ? cause
        : new FetchError({ message: `Failed to fetch from ${url}`, cause }),
  });
}

export function fetchBackend(pathName: string, init?: RequestInit & ClientOptions) {
  return fetch(`${env.backendUrl}${pathName}`, init);
}

export function parseJSON(response: Response) {
  return Effect.tryPromise({
    try: async (): Promise<unknown> => response.json(),
    catch: (cause) => new JSONParseError({ message: "Failed to parse JSON", cause }),
  });
}

export function fetchAndParse<A>(
  url: string,
  schema: Schema.ConstraintDecoder<A>,
  init?: RequestInit & ClientOptions,
) {
  return fetch(url, init).pipe(
    Effect.flatMap(parseJSON),
    Effect.flatMap(Schema.decodeUnknownEffect(schema)),
  );
}

export function fetchBackendAndParse<A>(
  pathName: string,
  schema: Schema.ConstraintDecoder<A>,
  init?: RequestInit & ClientOptions,
) {
  return fetchAndParse(`${env.backendUrl}${pathName}`, schema, init);
}
