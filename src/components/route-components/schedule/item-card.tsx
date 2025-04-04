import type { ScheduleItem } from "~/types/mongodb";
import { useContext } from "solid-js";
import { YoutubePipContext } from "~/components/contexts/youtube-pip-provider";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { youtubeChannelUrl, youtubeThumbnailUrl } from "~/lib/utils";

type ScheduleItemCardProps = {
  item: ScheduleItem;
  translateX: number;
  translateY: number;
  width: number;
  height: number;
};

export function ScheduleItemCard(props: ScheduleItemCardProps) {
  const pip = useContext(YoutubePipContext);

  return (
    <Card
      class="hover:ring-ring h absolute left-0 top-0 p-4 transition-all duration-100 hover:cursor-pointer hover:ring-1"
      style={{
        transform: `translateX(${props.translateX}px) translateY(${props.translateY}px)`,
        width: `${props.width}px`,
        height: `${props.height}px`,
      }}
      onClick={() => {
        pip?.setVideoData({
          title: props.item.title,
          videoId: props.item.videoId,
          autoLoad: true,
        });
        pip?.setPipState("on");
      }}
    >
      <CardHeader class="p-0">
        <div class="w-full">
          <AspectRatio ratio={16 / 9}>
            <img
              src={youtubeThumbnailUrl(props.item.videoId)}
              loading="lazy"
              class="aspect-video w-full rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      </CardHeader>
      <CardContent class="p-0">
        <div class="w-80">
          <div>{props.item.title}</div>
          <div class="flex items-center justify-between">
            <a
              href={youtubeChannelUrl(props.item.channelId)}
              target="_blank"
              rel="noreferrer"
              class="mt-2"
            >
              <h3 class="text-lg font-semibold">{props.item.channelName}</h3>
            </a>
            <span>
              {props.item.scheduledTime.hour().toString().padStart(2, "0")}:
              {props.item.scheduledTime.minute().toString().padStart(2, "0")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
