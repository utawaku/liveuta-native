import type { Settings } from "~/types/settings";
import { Store } from "@tanstack/store";
import { Effect } from "effect";
import { LocalStorageError } from "~/lib/error";
import { siteConfig } from "~/site-config";

const getAutoSync = Effect.try(() => localStorage.getItem("autoSync")).pipe(
  Effect.map((v) => (v ? v : siteConfig.autoSync)),
  Effect.map((v) => (typeof v === "string" ? v === "true" : v)),
  Effect.catchAll(() => Effect.succeed(siteConfig.autoSync)),
);
const getSyncPeriod = Effect.try(() => localStorage.getItem("syncPeriod")).pipe(
  Effect.map((v) => (v !== null ? v : siteConfig.syncPeriod)),
  Effect.map((v) => (typeof v === "string" ? parseInt(v) : v)),
  Effect.catchAll(() => Effect.succeed(siteConfig.syncPeriod)),
);
const getSettings = Effect.zipWith(
  getAutoSync,
  getSyncPeriod,
  (autoSync, syncPeriod) => ({ autoSync, syncPeriod }) as Settings,
);

const saveAutoSync = (autoSync: boolean) =>
  Effect.try({
    try: () => localStorage.setItem("autoSync", autoSync.toString()),
    catch: (e) => new LocalStorageError({ cause: e }),
  });
const saveSyncPeriod = (syncPeriod: number) =>
  Effect.try({
    try: () => localStorage.setItem("syncPeriod", syncPeriod.toString()),
    catch: (e) => new LocalStorageError({ cause: e }),
  });
const saveSettings = (settings: Settings) =>
  Effect.gen(function* (_) {
    if (settings.autoSync !== undefined) {
      yield* _(saveAutoSync(settings.autoSync));
    }
    if (settings.syncPeriod !== undefined) {
      yield* _(saveSyncPeriod(settings.syncPeriod));
    }
  });

export const settingsStore = new Store<Settings>(Effect.runSync(getSettings), {
  onUpdate: () => {
    Effect.runSync(saveSettings(settingsStore.state));
  },
});
