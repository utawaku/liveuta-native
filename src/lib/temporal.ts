import { Temporal } from "temporal-polyfill";

type MongoDate = { $date: string };

export type TemporalInstantInput =
  Date | MongoDate | Temporal.Instant | number | string | null | undefined;

export function toTemporalInstant(value: TemporalInstantInput): Temporal.Instant | undefined {
  if (value == null) return undefined;

  if (typeof value === "string") {
    return Temporal.Instant.from(/(?:Z|[+-]\d{2}:?\d{2})$/i.test(value) ? value : `${value}Z`);
  }

  if (typeof value === "number") {
    return Temporal.Instant.fromEpochMilliseconds(value);
  }

  if (value instanceof Date) {
    return Temporal.Instant.from(value.toISOString());
  }

  if (value instanceof Temporal.Instant) {
    return value;
  }

  if (typeof value === "object" && "$date" in value && typeof value.$date === "string") {
    return toTemporalInstant(value.$date);
  }

  return undefined;
}
