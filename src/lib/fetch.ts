import type { ClientOptions } from "@tauri-apps/plugin-http";
import { fetch as tauriFetch } from "@tauri-apps/plugin-http";
import { Effect } from "effect";
import { FetchError, JSONParseError } from "./error";

export function fetch(url: string, init?: RequestInit & ClientOptions) {
  return Effect.tryPromise({
    try: () => tauriFetch(url, init),
    catch: (e) => new FetchError({ message: `Failed to fetch from ${url}`, cause: e }),
  });
}

export function parseJSON<T extends unknown>(response: Response): Effect.Effect<T, JSONParseError> {
  return Effect.tryPromise({
    try: () => response.json(),
    catch: (e) => new JSONParseError({ message: "Failed to parse JSON", cause: e }),
  });
}
