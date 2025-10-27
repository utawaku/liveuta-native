import { DAY_MS, HOUR_MS, MINUTE_MS, SECOND_MS } from "~/constants/time.constant";

export function s_to_ms(s: number) {
  return s * SECOND_MS;
}

export function m_to_ms(m: number) {
  return m * MINUTE_MS;
}

export function h_to_ms(h: number) {
  return h * HOUR_MS;
}

export function d_to_ms(d: number) {
  return d * DAY_MS;
}

export function ms_to_s(ms: number) {
  return ms / SECOND_MS;
}

export function ms_to_m(ms: number) {
  return ms / MINUTE_MS;
}

export function ms_to_h(ms: number) {
  return ms / HOUR_MS;
}

export function ms_to_d(ms: number) {
  return ms / DAY_MS;
}
