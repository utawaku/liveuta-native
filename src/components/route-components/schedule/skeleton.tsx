import { For } from "solid-js";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Avatar } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export function ScheduleSkeleton() {
  return (
    <div class="@6xl:grid-cols-3 @3xl:grid-cols-2 @9xl:grid-cols-4 @12xl:grid-cols-5 @15xl:grid-cols-6 grid grid-cols-1 gap-4">
      <For each={Array.from({ length: 20 })}>
        {() => (
          <Card class="p-4">
            <CardHeader class="p-0">
              <AspectRatio ratio={16 / 9}>
                <Avatar class="h-full w-full rounded-md">
                  <Skeleton />
                </Avatar>
              </AspectRatio>
            </CardHeader>
            <CardContent class="p-0 pt-2">
              <div class="flex flex-col">
                <div class="h-6">
                  <Skeleton width={256} height={16} />
                </div>
                <div class="h-6">
                  <Skeleton width={128} height={16} />
                </div>
              </div>
              <div class="h-7">
                <Skeleton width={128} height={18} />
              </div>
            </CardContent>
          </Card>
        )}
      </For>
    </div>
  );
}
