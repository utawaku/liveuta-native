import { ParentProps } from "solid-js";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

import { m_to_ms, s_to_ms } from "~/lib/time";

export function QueryProvider(props: ParentProps) {
  const client = () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: m_to_ms(3),
          gcTime: m_to_ms(5),
          refetchOnWindowFocus: false,
          refetchOnReconnect: true,
          refetchOnMount: false,
          retry: 2,
          retryDelay: s_to_ms(30),
        },
        mutations: {
          retry: 0,
        },
      },
    });

  return <QueryClientProvider client={client()}>{props.children}</QueryClientProvider>;
}
