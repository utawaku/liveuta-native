import { useStore } from "@tanstack/solid-store";
import { createEffect, createSignal, Show } from "solid-js";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TextField, TextFieldInput, TextFieldLabel } from "~/components/ui/text-field";
import { ChannelSort } from "~/types/mongodb";
import { cn } from "../../../lib/utils";
import css from "./header.module.css";
import { channelsSortStore, pageStore, setChannelsSort, setPage } from "./store";

type ChannelsHeaderProps = {
  channelsPages: number | undefined;
};

export function ChannelsHeader(props: ChannelsHeaderProps) {
  const page = useStore(pageStore);
  const [pageInput, setPageInput] = createSignal<number>(1);
  const channelsSort = useStore(channelsSortStore);

  const onPageChangeSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    setPage(pageInput());
  };

  createEffect(() => {
    setPageInput(page());
  });

  return (
    <div class="mb-4 flex justify-between">
      <form onSubmit={onPageChangeSubmit} class="flex items-end gap-1">
        <TextField
          class="relative"
          value={pageInput().toString()}
          onChange={(value) => setPageInput(Number(value))}
        >
          <TextFieldLabel>
            <span>페이지 이동</span>
          </TextFieldLabel>
          <TextFieldInput
            type="number"
            disabled={props.channelsPages === undefined}
            class={cn(css.input, "w-24")}
            min={1}
            max={props.channelsPages || 1}
          />
          <Show when={props.channelsPages !== undefined}>
            <span class="text-muted-foreground pointer-events-none absolute bottom-2.5 left-1/2 -translate-x-1/2 text-sm">
              /
            </span>
            <span class="text-muted-foreground pointer-events-none absolute bottom-2.5 right-3 text-sm">
              {props.channelsPages!}
            </span>
          </Show>
        </TextField>
        <Button type="submit">이동</Button>
      </form>
      <div>
        <Label class="text-center">영상 타입</Label>
        <Tabs value={channelsSort()} onChange={(v) => setChannelsSort(v as ChannelSort)}>
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value={"name_kor" as ChannelSort}>이름순</TabsTrigger>
            <TabsTrigger value={"createdAt" as ChannelSort}>생성일자순</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
