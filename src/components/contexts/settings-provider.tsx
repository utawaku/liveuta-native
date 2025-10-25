import type { Theme } from "~/types/settings";

import { createContext, createEffect, JSX, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";

import { siteConfig } from "~/site-config";
import { Settings } from "~/types/settings";

export type SettingsContextType = {
  settings: Settings;
  setSettings: SetStoreFunction<Settings>;
  setTheme: (theme: Theme) => void;
  setAutoSync: (autoSync: boolean) => void;
  setSyncPeriod: (syncPeriod: number) => void;
  setPersonal: (personal: boolean) => void;
};

export const SettingsContext = createContext<SettingsContextType>();

export function useSettings() {
  const context = useContext(SettingsContext);

  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
}

type SiteConfigProviderProps = {
  children: JSX.Element;
};

function getInitialSettings(): Settings {
  const theme =
    (localStorage.getItem("theme") as Theme | null) ||
    ((window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") as Theme);

  const autoSync = localStorage.getItem("autoSync") === "true" || siteConfig.autoSync;
  // const syncPeriod = parseInt(localStorage.getItem("syncPeriod") || "5", 10) || 5;
  const syncPeriodStorage = localStorage.getItem("syncPeriod");
  const syncPeriod = syncPeriodStorage ? parseInt(syncPeriodStorage, 10) : siteConfig.syncPeriod;
  const personal =
    localStorage.getItem("vuta-gallery-wanjang-personal") === "true" || siteConfig.personal;

  return {
    theme,
    autoSync,
    syncPeriod,
    personal,
  };
}

export function SettingsProvider(props: SiteConfigProviderProps) {
  const [settings, setSettings] = createStore<Settings>(getInitialSettings());
  const root = document.documentElement;

  createEffect(() => {
    root.classList.remove("light", "dark");
    root.classList.add(settings.theme);
  });

  const setTheme = (theme: Theme) => {
    let t;
    if (theme === "system") {
      const systemTheme: Theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      t = systemTheme;
    } else {
      t = theme;
    }

    setSettings("theme", t);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(t);
    localStorage.setItem("theme", theme);
  };

  const setAutoSync = (autoSync: boolean) => {
    setSettings("autoSync", autoSync);
    localStorage.setItem("autoSync", autoSync.toString());
  };

  const setSyncPeriod = (syncPeriod: number) => {
    setSettings("syncPeriod", syncPeriod);
    localStorage.setItem("syncPeriod", syncPeriod.toString());
  };

  const setPersonal = (personal: boolean) => {
    setSettings("personal", personal);
    localStorage.setItem("vuta-gallery-wanjang-personal", personal.toString());
  };

  return (
    <SettingsContext.Provider
      value={{ settings, setSettings, setTheme, setAutoSync, setSyncPeriod, setPersonal }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}
