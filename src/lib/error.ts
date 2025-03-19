import { Data } from "effect";

export class FetchError extends Data.TaggedError("FetchError")<{
  message?: string;
  cause?: unknown;
}> {}

export class JSONParseError extends Data.TaggedError("JSONParseError")<{
  message?: string;
  cause?: unknown;
}> {}
