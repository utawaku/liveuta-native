import type { Settings } from "~/types/settings";
import { Store } from "@tanstack/store";
import { load } from "@tauri-apps/plugin-store";
import { Effect } from "effect";
import { toast } from "solid-sonner";
import { siteConfig } from "~/site-config";
import { env } from "../../env";
import { FSReadError, FSWriteError } from "../../error";

const getSettingsFile = Effect.tryPromise({
  try: () => load(env.settingsFile),
  catch: (e) => new FSReadError({ message: "Cannot read settings from file", cause: e }),
}).pipe(
  Effect.catchAll((e) => {
    console.error("Failed to load settings from file", e.toString());
    toast.error("설정을 파일에서 읽지 못했습니다");
    return Effect.succeed(null);
  }),
);
const getInitialSettings = Effect.gen(function* (_) {
  const file = yield* _(getSettingsFile);
  if (file !== null) {
    const autoSync = yield* _(
      Effect.tryPromise(() => file.get<boolean>("autoSync")).pipe(
        Effect.map((v) => (v ? v : siteConfig.autoSync)),
        Effect.catchAll(() => Effect.succeed(siteConfig.autoSync)),
      ),
    );
    const syncPeriod = yield* _(
      Effect.tryPromise(() => file.get<number>("syncPeriod")).pipe(
        Effect.map((v) => (v ? v : siteConfig.syncPeriod)),
        Effect.catchAll(() => Effect.succeed(siteConfig.syncPeriod)),
      ),
    );

    return { autoSync, syncPeriod } as Settings;
  } else {
    return siteConfig;
  }
});

const saveSettings = (settings: Settings) =>
  Effect.gen(function* (_) {
    const file = yield* _(getSettingsFile);
    if (file !== null) {
      yield* _(Effect.tryPromise(() => file.set("autoSync", settings.autoSync)));
      yield* _(Effect.tryPromise(() => file.set("syncPeriod", settings.syncPeriod)));
      yield* _(
        Effect.tryPromise({
          try: () => file.save(),
          catch: (e) => new FSWriteError({ message: "Cannot save settings to file", cause: e }),
        }),
      );
    }
  }).pipe(
    Effect.catchTag("FSWriteError", (e) => {
      console.error("Failed to save settings to file", e.toString());
      toast.error("설정을 파일에 저장하지 못했습니다");
      return Effect.succeed(null);
    }),
    Effect.catchAll((e) => {
      console.error("Failed to save settings to file", e.toString());
      toast.error("설정을 파일에 저장하지 못했습니다");
      return Effect.succeed(null);
    }),
  );

// const getAutoSync = Effect.try(() => localStorage.getItem("autoSync")).pipe(
//   Effect.map((v) => (v ? v : siteConfig.autoSync)),
//   Effect.map((v) => (typeof v === "string" ? v === "true" : v)),
//   Effect.catchAll(() => Effect.succeed(siteConfig.autoSync)),
// );
// const getSyncPeriod = Effect.try(() => localStorage.getItem("syncPeriod")).pipe(
//   Effect.map((v) => (v !== null ? v : siteConfig.syncPeriod)),
//   Effect.map((v) => (typeof v === "string" ? parseInt(v) : v)),
//   Effect.catchAll(() => Effect.succeed(siteConfig.syncPeriod)),
// );
// const getSettings = Effect.zipWith(
//   getAutoSync,
//   getSyncPeriod,
//   (autoSync, syncPeriod) => ({ autoSync, syncPeriod }) as Settings,
// );

// const saveAutoSync = (autoSync: boolean) =>
//   Effect.try({
//     try: () => localStorage.setItem("autoSync", autoSync.toString()),
//     catch: (e) => new LocalStorageError({ cause: e }),
//   });
// const saveSyncPeriod = (syncPeriod: number) =>
//   Effect.try({
//     try: () => localStorage.setItem("syncPeriod", syncPeriod.toString()),
//     catch: (e) => new LocalStorageError({ cause: e }),
//   });
// const saveSettings = (autoSync: boolean | undefined, syncPeriod: number | undefined) =>
//   Effect.gen(function* (_) {
//     if (autoSync !== undefined) {
//       yield* _(saveAutoSync(autoSync));
//     }
//     if (syncPeriod !== undefined) {
//       yield* _(saveSyncPeriod(syncPeriod));
//     }
//   });

export const settingsStore = new Store<Settings>(await Effect.runPromise(getInitialSettings), {
  onUpdate: async () => {
    await Effect.runPromise(saveSettings(settingsStore.state));
  },
});
