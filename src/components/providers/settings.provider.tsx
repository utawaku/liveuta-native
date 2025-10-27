import type { Theme } from "~/types/settings.type";

import { createContext, createEffect, JSX, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";

import {
  LOCAL_STORAGE_AUTO_SYNC,
  LOCAL_STORAGE_DEFAULT_PAGE,
  LOCAL_STORAGE_PERSONAL,
  LOCAL_STORAGE_SYNC_PERIOD,
  LOCAL_STORAGE_THEME,
} from "~/constants/settings.constant";
import { siteConfig } from "~/site-config";
import { Route } from "~/types/route-info.type";
import { Settings } from "~/types/settings.type";

export type SettingsContextType = {
  settings: Settings;
  setSettings: SetStoreFunction<Settings>;
  setTheme: (theme: Theme) => void;
  setAutoSync: (autoSync: boolean) => void;
  setSyncPeriod: (syncPeriod: number) => void;
  setPersonal: (personal: boolean) => void;
  setDefaultPage: (page: Route) => void;
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
    (localStorage.getItem(LOCAL_STORAGE_THEME) as Theme | null) ||
    ((window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") as Theme);

  const autoSync = localStorage.getItem(LOCAL_STORAGE_AUTO_SYNC) === "true" || siteConfig.autoSync;
  const syncPeriodStorage = localStorage.getItem(LOCAL_STORAGE_SYNC_PERIOD);
  const syncPeriod = syncPeriodStorage ? parseInt(syncPeriodStorage, 10) : siteConfig.syncPeriod;
  const personal = localStorage.getItem(LOCAL_STORAGE_PERSONAL) === "true" || siteConfig.personal;
  const defaultPage = (localStorage.getItem(LOCAL_STORAGE_DEFAULT_PAGE) || "/") as Route;

  return {
    theme,
    autoSync,
    syncPeriod,
    personal,
    defaultPage,
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
    localStorage.setItem(LOCAL_STORAGE_THEME, theme);
  };

  const setAutoSync = (autoSync: boolean) => {
    setSettings("autoSync", autoSync);
    localStorage.setItem(LOCAL_STORAGE_AUTO_SYNC, autoSync.toString());
  };

  const setSyncPeriod = (syncPeriod: number) => {
    setSettings("syncPeriod", syncPeriod);
    localStorage.setItem(LOCAL_STORAGE_SYNC_PERIOD, syncPeriod.toString());
  };

  const setPersonal = (personal: boolean) => {
    setSettings("personal", personal);
    localStorage.setItem(LOCAL_STORAGE_PERSONAL, personal.toString());
  };

  const setDefaultPage = (page: Route) => {
    setSettings("defaultPage", page);
    localStorage.setItem(LOCAL_STORAGE_DEFAULT_PAGE, page);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
        setTheme,
        setAutoSync,
        setSyncPeriod,
        setPersonal,
        setDefaultPage,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}
