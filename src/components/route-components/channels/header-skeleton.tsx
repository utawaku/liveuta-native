import { useStore } from "@tanstack/solid-store";

import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TextField, TextFieldInput, TextFieldLabel } from "~/components/ui/text-field";
import { ChannelSort } from "~/types/mongodb.type";
import { cn } from "../../../lib/utils";
import css from "./header.module.css";
import { channelsDirectionStore, channelsSortStore, pageStore } from "./store";

export function ChannelsHeaderSkeleton() {
  const page = useStore(pageStore);
  const channelsSort = useStore(channelsSortStore);
  const direction = useStore(channelsDirectionStore);

  return (
    <div class="fixed z-50 flex w-full justify-between px-4 transition-[width] duration-200 ease-expo-in-out-custom md:w-[calc(100%-var(--sidebar-width-icon))] md:group-has-data-[state=expanded]/sidebar-wrapper:w-[calc(100%-var(--sidebar-width))]">
      <div class="flex items-end gap-1 rounded-lg border bg-background p-2">
        <TextField class="relative" value={page().toString()}>
          <TextFieldLabel>
            <span>페이지 이동</span>
          </TextFieldLabel>
          <TextFieldInput type="number" disabled class={cn(css.input, "w-24")} />
          <span class="pointer-events-none absolute bottom-2.5 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
            /
          </span>
          <span class="pointer-events-none absolute right-3 bottom-2.5 text-sm text-muted-foreground">
            ...
          </span>
        </TextField>
        <Button type="submit">이동</Button>
      </div>
      <div class="flex gap-4">
        <div class="rounded-lg border bg-background p-2">
          <Label>정렬</Label>
          <Tabs disabled value={direction()}>
            <TabsList class="grid w-full grid-cols-2">
              <TabsTrigger value="1">오름차순</TabsTrigger>
              <TabsTrigger value="-1">내림차순</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div class="rounded-lg border bg-background p-2">
          <Label class="text-center">영상 타입</Label>
          <Tabs disabled value={channelsSort()}>
            <TabsList class="grid w-full grid-cols-2">
              <TabsTrigger value={"name_kor" as ChannelSort}>이름순</TabsTrigger>
              <TabsTrigger value={"createdAt" as ChannelSort}>생성일자순</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
