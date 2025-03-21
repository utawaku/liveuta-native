import { Data } from "effect";

export class FetchError extends Data.TaggedError("FetchError")<{
  message?: string;
  cause?: unknown;
}> {}

export class JSONParseError extends Data.TaggedError("JSONParseError")<{
  message?: string;
  cause?: unknown;
}> {}

export class FSReadError extends Data.TaggedError("FSReadError")<{
  message?: string;
  cause?: unknown;
}> {}

export class FSWriteError extends Data.TaggedError("FSWriteError")<{
  message?: string;
  cause?: unknown;
}> {}

export class LocalStorageError extends Data.TaggedError("LocalStorageError")<{
  message?: string;
  cause?: unknown;
}> {}
