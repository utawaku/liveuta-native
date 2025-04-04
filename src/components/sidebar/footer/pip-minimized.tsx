import { Show } from "solid-js";
import { useYoutubePipContext } from "~/components/contexts/youtube-pip-provider";
import { useYoutubePlayerControllerContext } from "~/components/player/youtube-player";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import { FluentMaximize24Filled } from "~/icons/fluent/maximize-24-filled";
import { IcRoundPause } from "~/icons/ic/round-pause";
import { IcRoundPlayArrow } from "~/icons/ic/round-play-arrow";
import { LogosYoutubeIcon } from "~/icons/logos/youtube-icon";
import { MingcuteMiniplayerLine } from "~/icons/mingcute/miniplayer-line";

export function PipMinimized() {
  const { pipState, setPipState } = useYoutubePipContext();
  const { controller } = useYoutubePlayerControllerContext();

  return (
    <Show when={pipState() === "minimize"}>
      <SidebarMenuItem>
        <DropdownMenu preventScroll={false} placement="right-end">
          <DropdownMenuTrigger as={SidebarMenuButton} tooltip="PIP">
            <LogosYoutubeIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={async () => controller()?.play()}>
              <IcRoundPlayArrow class="mr-2 size-4" />
              <span>재생</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={async () => controller()?.pause()}>
              <IcRoundPause class="mr-2 size-4" />
              <span>일시정지</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setPipState("on")}>
              <MingcuteMiniplayerLine class="mr-2 size-4" />
              <span>PIP</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setPipState("fullscreen")}>
              <FluentMaximize24Filled class="mr-2 size-4" />
              <span>최대화</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </Show>
  );
}
