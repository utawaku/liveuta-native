import { createMemo, Show } from "solid-js";
import { CopyButton } from "~/components/common/copy-button";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import { numberFormatter, youtubeChannelUrl } from "~/lib/utils";
import { YoutubeChannelData } from "~/types/youtube";

type ChannelItemCardProps = {
  item: YoutubeChannelData;
};

export function ChannelItemCard(props: ChannelItemCardProps) {
  const url = createMemo(() =>
    typeof props.item.snippet?.customUrl === "string"
      ? youtubeChannelUrl(props.item.snippet?.customUrl)
      : props.item.url,
  );

  return (
    <Card>
      <CardContent class="p-4">
        <div class="flex items-center gap-2">
          <a href={url()}>
            <Avatar class="size-24 rounded-md">
              <AvatarImage
                src={props.item.snippet?.thumbnails?.default?.url ?? "/"}
                loading="lazy"
              />
            </Avatar>
          </a>
          <div class="overflow-hidden">
            <h2 class="line-clamp-1 overflow-ellipsis text-xl font-semibold">
              <a href={url()}>{props.item.nameKor}</a>
            </h2>
            <Show when={props.item.snippet?.customUrl !== undefined}>
              <div>
                <span>{props.item.snippet?.customUrl}</span>
              </div>
            </Show>
            <div class="text-muted-foreground mt-1 flex gap-3 text-sm">
              <Show when={props.item.statistics?.subscriberCount !== undefined}>
                <span>
                  구독자 {numberFormatter.format(Number(props.item.statistics?.subscriberCount!))}명
                </span>
              </Show>
              <Show when={props.item.statistics?.videoCount !== undefined}>
                <span>동영상 {props.item.statistics?.videoCount}개</span>
              </Show>
            </div>
            <div class="mt-1">
              <CopyButton
                text={url()}
                tooltip="링크 복사하기"
                tooltipCopied="링크 복사됨"
                class="size-8"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
