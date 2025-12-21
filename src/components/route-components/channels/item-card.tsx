// oxlint-disable no-non-null-asserted-optional-chain
import type { Channel } from "~/types/channel.type";

import { createMemo, Show } from "solid-js";

import { CopyButton } from "~/components/common/copy-button";
import { OpenInBrowser } from "~/components/common/open-in-new";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import { youtubeChannelUrl } from "~/lib/youtube";

type ChannelItemCardProps = {
  item: Channel;
};

export function ChannelItemCard(props: ChannelItemCardProps) {
  const url = createMemo(() => youtubeChannelUrl(props.item.channelId));

  return (
    <Card>
      <CardContent class="p-4">
        <div class="flex items-center gap-4">
          <a href={url()}>
            <Avatar class="size-24 rounded-md">
              <AvatarImage src={props.item.profilePictureUrl ?? "/"} loading="lazy" />
            </Avatar>
          </a>
          <div class="overflow-hidden">
            <h2 class="line-clamp-1 text-xl font-semibold overflow-ellipsis">
              <a href={url()}>{props.item.nameKor}</a>
            </h2>
            <Show when={props.item.handleName !== ""}>
              <p class="line-clamp-2 h-10 text-sm break-all">{`https://www.youtube.com/${props.item.handleName}`}</p>
            </Show>
            {/* <Show when={props.item.snippet?.customUrl !== undefined}>
              <div>
                <span>{props.item.snippet?.customUrl}</span>
              </div>
            </Show> */}
            {/* <div class="mt-1 flex gap-3 text-sm text-muted-foreground">
              <Show when={props.item.statistics?.subscriberCount !== undefined}>
                <span>
                  구독자{" "}
                  {numberFormatter.format(Number.parseInt(props.item.statistics?.subscriberCount!))}
                  명
                </span>
              </Show>
              <Show when={props.item.statistics?.videoCount !== undefined}>
                <span>
                  동영상{" "}
                  {numberFormatter.format(Number.parseInt(props.item.statistics?.videoCount!))}개
                </span>
              </Show>
            </div> */}
            <div>
              <CopyButton
                text={url()}
                tooltip="링크 복사하기"
                tooltipCopied="링크 복사됨"
                class="size-8"
              />
              <OpenInBrowser href={url()} hrefTooltip={true} class="size-8" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
