import { useStore } from "@tanstack/solid-store";
import { createSignal, onCleanup, onMount, Show } from "solid-js";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "~/components/ui/drawer";
import { Label } from "~/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  ScheduleAllType,
  scheduleFilterStore,
  ScheduleStreamType,
  ScheduleType,
  ScheduleVideoType,
  setScheduleAllType,
  setScheduleStreamType,
  setScheduleType,
  setScheduleVideoType,
} from "./store";

function FilterContents() {
  const filter = useStore(scheduleFilterStore);

  return (
    <div class="flex flex-col gap-4">
      <div>
        <Label>스케줄 필터</Label>
        <Tabs value={filter().type} onChange={(v) => setScheduleType(v as ScheduleType)}>
          <TabsList class="grid w-full grid-cols-3">
            <TabsTrigger value={"all" as ScheduleType}>전체</TabsTrigger>
            <TabsTrigger value={"stream" as ScheduleType}>방송</TabsTrigger>
            <TabsTrigger value={"video" as ScheduleType}>영상</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Show when={filter().type === "all"}>
        <div>
          <Label>전체 필터</Label>
          <Tabs value={filter().allType} onChange={(v) => setScheduleAllType(v as ScheduleAllType)}>
            <TabsList class="grid w-full grid-cols-4">
              <TabsTrigger value={"24h" as ScheduleAllType}>24시간</TabsTrigger>
              <TabsTrigger value={"isLive" as ScheduleAllType}>라이브</TabsTrigger>
              <TabsTrigger value={"scheduled" as ScheduleAllType}>예정됨</TabsTrigger>
              <TabsTrigger value={"all" as ScheduleAllType}>전체</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </Show>
      <Show when={filter().type === "stream"}>
        <div>
          <Label>방송 필터</Label>
          <Tabs
            value={filter().streamType}
            onChange={(v) => setScheduleStreamType(v as ScheduleStreamType)}
          >
            <TabsList class="grid w-full grid-cols-4">
              <TabsTrigger value={"24h" as ScheduleStreamType}>24시간</TabsTrigger>
              <TabsTrigger value={"live" as ScheduleStreamType}>실시간</TabsTrigger>
              <TabsTrigger value={"scheduled" as ScheduleStreamType}>예정됨</TabsTrigger>
              <TabsTrigger value={"all" as ScheduleStreamType}>전체</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </Show>
      <Show when={filter().type === "video"}>
        <div>
          <Label>영상 필터</Label>
          <Tabs
            value={filter().videoType}
            onChange={(v) => setScheduleVideoType(v as ScheduleVideoType)}
          >
            <TabsList class="grid w-full grid-cols-4">
              <TabsTrigger value={"24h" as ScheduleVideoType}>24시간</TabsTrigger>
              <TabsTrigger value={"video" as ScheduleVideoType}>영상</TabsTrigger>
              <TabsTrigger value={"scheduled" as ScheduleVideoType}>예정됨</TabsTrigger>
              <TabsTrigger value={"all" as ScheduleVideoType}>전체</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </Show>
    </div>
  );
}

function MobileDialog() {
  const filter = useStore(scheduleFilterStore);

  return (
    <Drawer>
      <DrawerTrigger as={Button<"button">}>필터</DrawerTrigger>
      <DrawerContent>Content</DrawerContent>
    </Drawer>
  );
}

function DesktopDialog() {
  const filter = useStore(scheduleFilterStore);

  return (
    <Dialog>
      <DialogTrigger as={Button<"button">}>필터</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>스케줄 필터</DialogTitle>
        </DialogHeader>
        <div>
          <FilterContents />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ScheduleFilter() {
  const [windowWidth, setWindowWidth] = createSignal(window.innerWidth);
  const isMobile = () => windowWidth() < 768;
  const filter = useStore(scheduleFilterStore);

  const onResize = () => {
    setWindowWidth(window.innerWidth);
  };

  onMount(() => {
    window.addEventListener("resize", onResize);
  });

  onCleanup(() => {
    window.removeEventListener("resize", onResize);
  });

  return (
    <div>
      <div class="flex gap-2">
        <span>Type: {filter().type}</span>
        <span>StreamType: {filter().streamType}</span>
        <span>VideoType: {filter().videoType}</span>
      </div>
      <Show when={isMobile()} fallback={<DesktopDialog />}>
        <MobileDialog />
      </Show>
    </div>
  );
}
