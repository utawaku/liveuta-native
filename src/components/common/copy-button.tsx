import type { ButtonProps } from "~/components/ui/button";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import { createSignal, mergeProps, Show } from "solid-js";
import { toast } from "solid-sonner";
import { Button } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { TablerCopy } from "~/icons/tabler/copy";
import { TablerCopyCheck } from "~/icons/tabler/copy-check";
import { cn } from "~/lib/utils";

type CopyButtonProps = {
  text: string;
  variant?: ButtonProps["variant"];
  tooltip?: string;
  tooltipCopied?: string;
  class?: string;
  iconClass?: string;
  timeout?: number;
};

export function CopyButton(props: CopyButtonProps) {
  const merged = mergeProps(
    {
      tooltip: "복사하기",
      tooltipCopied: "복사됨",
      variant: "ghost" as ButtonProps["variant"],
      timeout: 2000,
    },
    props,
  );
  const [copied, setCopied] = createSignal(false);
  const [copyTimeout, setCopyTimeout] = createSignal<number | null>(null);

  const handleCopyResult = (value: boolean) => {
    window.clearTimeout(copyTimeout()!);
    setCopyTimeout(window.setTimeout(() => setCopied(false), merged.timeout));
    setCopied(value);
  };

  const copy = async () => {
    try {
      await writeText(merged.text);
      toast("클립보드에 복사하였습니다");
      handleCopyResult(true);
    } catch {
      toast.error("복사하지 못하였습니다");
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button onClick={copy} size="icon" variant={merged.variant} class={merged.class}>
          <Show when={copied()} fallback={<TablerCopy class={merged.iconClass} />}>
            <TablerCopyCheck class={cn("text-shadcn-green", merged.iconClass)} />
          </Show>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <Show when={copied()} fallback={<span>{merged.tooltip}</span>}>
          <span>{merged.tooltipCopied}</span>
        </Show>
      </TooltipContent>
    </Tooltip>
  );
}
