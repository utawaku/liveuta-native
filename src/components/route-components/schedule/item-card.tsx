import type { ScheduleItem } from "~/types/mongodb";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

type ScheduleItemCardProps = {
  item: ScheduleItem;
};

export function ScheduleItemCard(props: ScheduleItemCardProps) {
  return (
    <Card>
      <CardHeader>
        <div>Hello</div>
      </CardHeader>
      <CardContent>
        <div>{props.item.title}</div>
        <span>{props.item.channelName}</span>
        <span>
          {props.item.scheduledTime.hour()}:{props.item.scheduledTime.minute()}
        </span>
      </CardContent>
    </Card>
  );
}
