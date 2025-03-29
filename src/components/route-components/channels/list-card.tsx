import type { RawChannelItem, ScheduleItem } from "~/types/mongodb";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { YoutubeChannelData } from "~/types/youtube";

type ChannelItemCardProps = {
  item: YoutubeChannelData;
};

export function ChannelItemCard(props: ChannelItemCardProps) {
  return (
    <Card>
      <CardHeader>
        <div>Hello</div>
      </CardHeader>
      <CardContent>
        <div>{props.item.nameKor}</div>
        <span>https://www.youtube.com/{props.item.uid}</span>
      </CardContent>
    </Card>
  );
}
