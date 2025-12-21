import { createContext, JSX, useContext } from "solid-js";
import { ManagedRuntime } from "effect";

const effectRuntime = ManagedRuntime;

// type EffectRuntime = ManagedRuntime.ManagedRuntime<SQLite, SQLiteError>;
type EffectRuntime = typeof effectRuntime;

export const EffectContext = createContext<EffectRuntime>();

export function useEffect() {
  const context = useContext(EffectContext);

  if (context === undefined) {
    throw new Error("useEffect must be used within an EffectProvider");
  }

  return context;
}

type EffectProviderProps = {
  children: JSX.Element;
};

export function EffectProvider(props: EffectProviderProps) {
  return <EffectContext.Provider value={effectRuntime}>{props.children}</EffectContext.Provider>;
}
