import type { ScheduleItem } from "~/types/mongodb";

import { createMemo, Show, useContext } from "solid-js";

import { CopyButton } from "~/components/common/copy-button";
import { OpenInBrowser } from "~/components/common/open-in-new";
import { ScheduleSpecialCopyButton } from "~/components/common/schedule-special-copy";
import { YoutubePipContext } from "~/components/contexts/youtube-pip-provider";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { cn, youtubeChannelUrl, youtubeThumbnailUrl, youtubeVideoUrl } from "~/lib/utils";

type ScheduleItemCardProps = {
  item: ScheduleItem;
  translateX: number;
  translateY: number;
  width: number;
  height: number;
  usePersonal: boolean;
};

export function ScheduleItemCard(props: ScheduleItemCardProps) {
  const pip = useContext(YoutubePipContext);
  const url = createMemo(() => youtubeVideoUrl(props.item.videoId));
  const backgroundColor = () => {
    switch (props.item.type) {
      case "video":
      case "stream-ended":
        return "bg-shadcn-blue/20 dark:bg-shadcn-blue/30";
      case "stream-live":
        return "bg-shadcn-yellow/20 dark:bg-shadcn-yellow/30";
      case "video-live":
        return "bg-shadcn-violet/20 dark:bg-shadcn-violet/30";
      case "stream-scheduled":
      case "video-scheduled":
        return "";
    }
  };

  return (
    <Card
      class={cn(
        "absolute top-0 left-0 p-4 transition-all duration-100 hover:ring-2 hover:ring-ring dark:bg-sidebar",
        backgroundColor(),
      )}
      style={{
        transform: `translateX(${props.translateX}px) translateY(${props.translateY}px)`,
        width: `${props.width}px`,
        height: `${props.height}px`,
      }}
    >
      <CardHeader class="p-0">
        <div class="w-full">
          <AspectRatio ratio={16 / 9}>
            <img
              src={youtubeThumbnailUrl(props.item.videoId)}
              loading="lazy"
              class="aspect-video w-full rounded-md object-cover hover:cursor-pointer"
              onClick={() => {
                pip?.setVideoData({
                  title: props.item.title,
                  videoId: props.item.videoId,
                  channelName: props.item.channelName,
                  scheduledTime: props.item.scheduledTime,
                  channelId: props.item.channelId,
                  autoLoad: true,
                });
                pip?.setPipState("on");
              }}
            />
          </AspectRatio>
        </div>
      </CardHeader>
      <CardContent class="p-0 pt-2">
        <div class="flex flex-col gap-1">
          <p class="line-clamp-2 h-12">{props.item.title}</p>
          <div class="flex items-center justify-between">
            <a
              href={youtubeChannelUrl(props.item.channelId)}
              target="_blank"
              rel="noreferrer"
              class="block"
            >
              <h3 class="text-lg font-semibold">{props.item.channelName}</h3>
            </a>
            <div>
              {props.item.scheduledTime.hour.toString().padStart(2, "0")}:
              {props.item.scheduledTime.minute.toString().padStart(2, "0")}
            </div>
          </div>
          <div class="flex w-full justify-end">
            <Show
              when={
                props.usePersonal &&
                (props.item.type === "video" ||
                  props.item.type === "video-scheduled" ||
                  "video-live")
              }
            >
              <ScheduleSpecialCopyButton
                text={`${props.item.scheduledTime.hour.toString().padStart(2, "0")}:${props.item.scheduledTime.minute.toString().padStart(2, "0")} ${props.item.channelName}【】\n${url()}`}
                class="size-8 border-foreground hover:border hover:bg-transparent"
              />
            </Show>
            <CopyButton
              text={url()}
              tooltip="링크 복사하기"
              tooltipCopied="링크 복사됨"
              class="size-8 border-foreground hover:border hover:bg-transparent"
            />
            <OpenInBrowser
              href={url()}
              class="size-8 border-foreground hover:border hover:bg-transparent"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
