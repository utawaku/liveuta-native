import { useStore } from "@tanstack/solid-store";
import { createEffect, createSignal, onCleanup, onMount, Show } from "solid-js";
import { Temporal } from "temporal-polyfill";
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
import { TextField, TextFieldDescription, TextFieldInput } from "~/components/ui/text-field";
import {
  scheduleFilterStore,
  ScheduleStreamType,
  ScheduleTime,
  scheduleTimeStringStore,
  ScheduleType,
  ScheduleVideoType,
  setScheduleStreamType,
  setScheduleTime,
  setScheduleTimeEnd,
  setScheduleTimeStart,
  setScheduleType,
  setScheduleVideoType,
} from "./store";

function CustomTimePicker() {
  const timeString = useStore(scheduleTimeStringStore);

  return (
    <div class="grid grid-cols-2 gap-2">
      <TextField
        value={timeString().start}
        onChange={(v) => setScheduleTimeStart(Temporal.PlainDateTime.from(v).round("minute"))}
      >
        <TextFieldDescription>시작</TextFieldDescription>
        <TextFieldInput type="datetime-local" class="w-full" />
      </TextField>
      <TextField
        value={timeString().end}
        onChange={(v) => setScheduleTimeEnd(Temporal.PlainDateTime.from(v).round("minute"))}
      >
        <TextFieldDescription>종료</TextFieldDescription>
        <TextFieldInput type="datetime-local" />
      </TextField>
    </div>
  );
}

function FilterContents() {
  const filter = useStore(scheduleFilterStore);

  return (
    <div class="flex min-h-[230px] flex-col gap-4">
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
      <div class="flex flex-col gap-4">
        <Label>시간</Label>
        <Tabs value={filter().time} onChange={(v) => setScheduleTime(v as ScheduleTime)}>
          <TabsList class="grid w-full grid-cols-5">
            <TabsTrigger value={"all" as ScheduleTime}>전체</TabsTrigger>
            <TabsTrigger value={"today" as ScheduleTime}>오늘</TabsTrigger>
            <TabsTrigger value={"tomorrow" as ScheduleTime}>내일</TabsTrigger>
            <TabsTrigger value={"todayAndTomorrow" as ScheduleTime}>오늘+내일</TabsTrigger>
            <TabsTrigger value={"custom" as ScheduleTime}>지정</TabsTrigger>
          </TabsList>
        </Tabs>
        <Show when={filter().time === "custom"}>
          <CustomTimePicker />
        </Show>
      </div>
      <Show when={filter().type === "stream"}>
        <div>
          <Label>방송 필터</Label>
          <Tabs
            value={filter().streamType}
            onChange={(v) => setScheduleStreamType(v as ScheduleStreamType)}
          >
            <TabsList class="grid w-full grid-cols-3">
              <TabsTrigger value={"all" as ScheduleStreamType}>전체</TabsTrigger>
              <TabsTrigger value={"live" as ScheduleStreamType}>실시간</TabsTrigger>
              <TabsTrigger value={"scheduled" as ScheduleStreamType}>예정됨</TabsTrigger>
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
            <TabsList class="grid w-full grid-cols-3">
              <TabsTrigger value={"all" as ScheduleVideoType}>전체</TabsTrigger>
              <TabsTrigger value={"video" as ScheduleVideoType}>영상</TabsTrigger>
              <TabsTrigger value={"scheduled" as ScheduleVideoType}>예정됨</TabsTrigger>
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
  const [unmountScheduleTimeString, setUnmountScheduleTimeString] = createSignal<() => void>();

  const onResize = () => {
    setWindowWidth(window.innerWidth);
  };

  onMount(() => {
    window.addEventListener("resize", onResize);

    setUnmountScheduleTimeString(() => scheduleTimeStringStore.mount());
  });

  onCleanup(() => {
    window.removeEventListener("resize", onResize);

    unmountScheduleTimeString()?.();
  });

  return (
    <div>
      <div class="flex gap-2">
        <span>Time: {filter().time}</span>
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
