import { Accessor, createContext, createSignal, ParentProps, useContext } from "solid-js";

import { RouteInfo } from "~/types/route-info.type";

type BreadcrumbsContextType = {
  breadcrumbs: Accessor<RouteInfo[]>;
  setBreadcrumbs: (breadcrumbs: RouteInfo[]) => void;
};

const BreadcrumbsContext = createContext<BreadcrumbsContextType>();

export function useBreadcrumbs() {
  const context = useContext(BreadcrumbsContext);

  if (!context) {
    throw new Error("useBreadcrumb must be used within an BreadcrumbProvider");
  }

  return context;
}

export function BreadcrumbsProvider(props: ParentProps) {
  const [breadcrumbs, setBreadcrumbsInner] = createSignal<RouteInfo[]>([]);

  const setBreadcrumbs = (breadcrumbs: RouteInfo[]) => {
    setBreadcrumbsInner([{ name: "홈", path: "/" }, ...breadcrumbs]);
  };

  return (
    <BreadcrumbsContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {props.children}
    </BreadcrumbsContext.Provider>
  );
}
