import { mergeProps, Show } from "solid-js";

import { Button, ButtonProps } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { MaterialSymbolsOpenInNew } from "~/icons/material-symbols/open-in-new";

type OpenInBrowserProps = {
  href: string;
  hrefTooltip?: boolean;
  variant?: ButtonProps["variant"];
  class?: string;
  iconClass?: string;
  tooltipClass?: string;
};

export function OpenInBrowser(props: OpenInBrowserProps) {
  const merged = mergeProps(
    {
      variant: "ghost" as ButtonProps["variant"],
    },
    props,
  );

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          as="a"
          href={merged.href}
          target="_blank"
          rel="noopener noreferrer"
          size="icon"
          variant={merged.variant}
          class={merged.class}
        >
          <MaterialSymbolsOpenInNew class={merged.iconClass} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>
          <Show when={props.hrefTooltip !== true} fallback={props.href}>
            브라우저에서 열기
          </Show>
        </span>
      </TooltipContent>
    </Tooltip>
  );
}
