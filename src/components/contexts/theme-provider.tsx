import { Accessor, createContext, createEffect, createSignal, JSX, useContext } from "solid-js";

export type Theme = "light" | "dark" | "system";

export type ThemeContextType = {
  theme: Accessor<Theme>;
  setTheme: (value: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>();

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

type ThemeProviderProps = {
  children: JSX.Element;
};

function getInitialTheme(): Theme {
  const theme = localStorage.getItem("theme");

  if (!theme) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } else {
    return theme as Theme;
  }
}

export function ThemeProvider(props: ThemeProviderProps) {
  const [value, setValue] = createSignal(getInitialTheme());
  const root = document.documentElement;

  createEffect(() => {
    root.classList.remove("light", "dark");
    root.classList.add(value());
    console.log("theme", value());
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

    setValue(t);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(t);
    localStorage.setItem("theme", theme);
  };

  const context: ThemeContextType = {
    theme: value,
    setTheme,
  };

  return <ThemeContext.Provider value={context}>{props.children}</ThemeContext.Provider>;
}
