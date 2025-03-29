import { Card } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export function ScheduleItemSkeleton() {
  return (
    <Card>
      <Skeleton />
    </Card>
  );
}
