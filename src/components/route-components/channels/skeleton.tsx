import { For } from "solid-js";
import { Avatar } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export function ChannelsSkeleton() {
  return (
    <div class="@6xl:grid-cols-3 @3xl:grid-cols-2 @9xl:grid-cols-4 @12xl:grid-cols-5 @15xl:grid-cols-6 grid grid-cols-1 gap-4">
      <For each={Array.from({ length: 10 })}>
        {() => (
          <Card>
            <CardContent class="p-4">
              <div class="flex items-center gap-2">
                <Avatar class="size-24 rounded-md">
                  <Skeleton />
                </Avatar>
                <div>
                  <div class="h-7">
                    <Skeleton width={128} height={20} />
                  </div>
                  <div class="flex h-5 gap-3">
                    <Skeleton width={64} height={14} />
                    <Skeleton width={64} height={14} />
                  </div>
                  <div class="h-5">
                    <Skeleton width={256} height={14} />
                  </div>
                  <div class="h-5">
                    <Skeleton width={128} height={14} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </For>
    </div>
  );
}
