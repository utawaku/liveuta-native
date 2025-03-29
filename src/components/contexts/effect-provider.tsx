import { Layer, ManagedRuntime } from "effect";
import { createContext, JSX, useContext } from "solid-js";
import { DB_NAME } from "~/constants/sqlite";
import { sqliteLayer } from "~/lib/db";

const effectRuntime = ManagedRuntime.make(Layer.mergeAll(sqliteLayer(DB_NAME)));

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
