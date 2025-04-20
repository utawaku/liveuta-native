import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import {
  Accessor,
  createContext,
  createEffect,
  createSignal,
  JSX,
  Show,
  useContext,
} from "solid-js";
import { Portal } from "solid-js/web";
import createPreventScroll from "solid-prevent-scroll";
import { toast } from "solid-sonner";
import { Temporal } from "temporal-polyfill";
import {
  useYoutubePlayerControllerContext,
  YoutubePlayer,
  YoutubePlayerControllerProvider,
  YoutubePlayerProps,
} from "~/components/player/youtube-player";
import { Button } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { FluentMaximize24Filled } from "~/icons/fluent/maximize-24-filled";
import { FluentMinimize24Regular } from "~/icons/fluent/minimize-24-regular";
import { MingcuteMiniplayerLine } from "~/icons/mingcute/miniplayer-line";
import { RiVolumeMuteFill } from "~/icons/ri/volume-mute-fill";
import { RiVolumeUpFill } from "~/icons/ri/volume-up-fill";
import { TablerBoxAlignBottomLeftFilled } from "~/icons/tabler/box-align-bottom-left-filled";
import { TablerBoxAlignBottomRightFilled } from "~/icons/tabler/box-align-bottom-right-filled";
import { TablerBoxAlignTopLeftFilled } from "~/icons/tabler/box-align-top-left-filled";
import { TablerBoxAlignTopRightFilled } from "~/icons/tabler/box-align-top-right-filled";
import { TablerX } from "~/icons/tabler/x";
import { cn, youtubeChannelUrl, youtubeLivestreamUrl } from "~/lib/utils";
import { useSidebar } from "../ui/sidebar";

type PipState = "off" | "on" | "minimize" | "fullscreen";

type YoutubePipContextType = {
  videoData: Accessor<YoutubePlayerProps>;
  setVideoData: (value: YoutubePlayerProps) => void;
  pipState: Accessor<PipState>;
  setPipState: (value: PipState) => void;
};

export const YoutubePipContext = createContext<YoutubePipContextType | null>(null);

function PipPlayer() {
  let pipWrapperRef: HTMLDivElement | undefined;

  const { setIframeState, incrementVolume, decrementVolume, toggleMuted, volumeState } =
    useYoutubePlayerControllerContext();
  const { videoData, pipState, setPipState } = useContext(YoutubePipContext)!;
  const [currentScroll, setCurrentScroll] = createSignal(0);
  const [scrolled, setScrolled] = createSignal(true);
  const { state: sidebarState } = useSidebar();

  // 1: top-left, 2: top-right, 3: bottom-left, 4: bottom-right
  const [location, setLocation] = createSignal<1 | 2 | 3 | 4>(4);
  const locationClass = () => {
    switch (location()) {
      case 1:
        return "top-15 left-15";
      case 2:
        return "top-15 right-15";
      case 3:
        return "bottom-15 left-15";
      case 4:
        return "bottom-15 right-15";
    }
  };

  createEffect(() => {
    switch (pipState()) {
      case "off": {
        setIframeState("off");
        document.body.classList.remove("h-svh", "overflow-hidden");
        if (!scrolled()) {
          window.scrollTo(0, currentScroll());
          setScrolled(true);
        }
        break;
      }
      case "fullscreen": {
        setScrolled(false);
        setCurrentScroll(window.scrollY);
        document.body.classList.add("h-svh", "overflow-hidden");
        break;
      }
      default: {
        document.body.classList.remove("h-svh", "overflow-hidden");
        if (!scrolled()) {
          window.scrollTo(0, currentScroll());
          setScrolled(true);
        }
      }
    }
  });

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.deltaY < 0) {
      incrementVolume();
    } else {
      decrementVolume();
    }
  };

  createPreventScroll({
    element: () => pipWrapperRef ?? null,
    enabled: () => pipState() === "fullscreen",
  });

  return (
    <Show when={pipState() !== "off"}>
      <Portal>
        <div
          class={cn(
            "group fixed z-50",
            pipState() === "minimize" && "hidden",
            locationClass(),
            pipState() === "fullscreen" &&
              "ease-expo-in-out-custom fixed inset-0 top-16 flex w-full justify-end transition-[width,left,top] duration-200 md:left-12 md:top-12 md:w-[calc(100%-3rem)] md:data-[sidebar-expanded=expanded]:left-64 md:data-[sidebar-expanded=expanded]:top-16 md:data-[sidebar-expanded=expanded]:w-[calc(100%-16rem)]",
          )}
          ref={pipWrapperRef}
          data-sidebar-expanded={sidebarState()}
        >
          <Show when={pipState() !== "fullscreen"}>
            <div class="ease-expo-in-out-custom absolute -top-[35px] right-0 flex w-[320px] translate-y-4 justify-between transition-transform hover:translate-y-0">
              <div>
                <Tooltip placement="top">
                  <TooltipTrigger>
                    <Button
                      size="icon"
                      variant={location() === 1 ? "default" : "outline"}
                      onClick={() => setLocation(1)}
                    >
                      <TablerBoxAlignTopLeftFilled />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>좌상단</span>
                  </TooltipContent>
                </Tooltip>
                <Tooltip placement="top">
                  <TooltipTrigger>
                    <Button
                      size="icon"
                      variant={location() === 2 ? "default" : "outline"}
                      onClick={() => setLocation(2)}
                    >
                      <TablerBoxAlignTopRightFilled />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>우상단</span>
                  </TooltipContent>
                </Tooltip>
                <Tooltip placement="top">
                  <TooltipTrigger>
                    <Button
                      size="icon"
                      variant={location() === 3 ? "default" : "outline"}
                      onClick={() => setLocation(3)}
                    >
                      <TablerBoxAlignBottomLeftFilled />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>좌하단</span>
                  </TooltipContent>
                </Tooltip>
                <Tooltip placement="top">
                  <TooltipTrigger>
                    <Button
                      size="icon"
                      variant={location() === 4 ? "default" : "outline"}
                      onClick={() => setLocation(4)}
                    >
                      <TablerBoxAlignBottomRightFilled />
                    </Button>
                    <TooltipContent>
                      <span>우하단</span>
                    </TooltipContent>
                  </TooltipTrigger>
                </Tooltip>
              </div>
              <div>
                <Tooltip placement="top">
                  <TooltipTrigger>
                    <Button size="icon" variant="outline" onClick={() => setPipState("minimize")}>
                      <FluentMinimize24Regular />
                    </Button>
                    <TooltipContent>
                      <span>최소화</span>
                    </TooltipContent>
                  </TooltipTrigger>
                </Tooltip>
                <Tooltip placement="top">
                  <TooltipTrigger>
                    <Button size="icon" variant="outline" onClick={() => setPipState("fullscreen")}>
                      <FluentMaximize24Filled />
                    </Button>
                    <TooltipContent>
                      <span>최대화</span>
                    </TooltipContent>
                  </TooltipTrigger>
                </Tooltip>
                <Tooltip placement="top">
                  <TooltipTrigger>
                    <Button size="icon" variant="destructive" onClick={() => setPipState("off")}>
                      <TablerX class="text-background" />
                    </Button>
                    <TooltipContent>
                      <span>종료</span>
                    </TooltipContent>
                  </TooltipTrigger>
                </Tooltip>
              </div>
            </div>
          </Show>
          <div
            class={cn(
              "ease-expo-in-out-custom absolute flex h-[180px] flex-col transition-transform hover:translate-x-0",
              location() === 1 || location() === 3
                ? "right-[-35px] -translate-x-4"
                : "left-[-35px] translate-x-4",
              pipState() === "fullscreen" && "hidden",
            )}
          >
            <Tooltip placement={location() === 1 || location() === 3 ? "right" : "left"}>
              <TooltipTrigger>
                <Button size="icon" variant="outline" onClick={incrementVolume} onWheel={onWheel}>
                  <span>+</span>
                </Button>
                <TooltipContent>
                  <span>볼륨 증가</span>
                </TooltipContent>
              </TooltipTrigger>
            </Tooltip>
            <div
              class="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex size-10 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
              onWheel={onWheel}
            >
              <span>{volumeState().volume}</span>
            </div>
            <Tooltip placement={location() === 1 || location() === 3 ? "right" : "left"}>
              <TooltipTrigger>
                <Button size="icon" variant="outline" onClick={decrementVolume} onWheel={onWheel}>
                  <span>-</span>
                </Button>
                <TooltipContent>
                  <span>볼륨 감소</span>
                </TooltipContent>
              </TooltipTrigger>
            </Tooltip>
            <Tooltip placement={location() === 1 || location() === 3 ? "right" : "left"}>
              <TooltipTrigger>
                <Button size="icon" variant="outline" onClick={toggleMuted}>
                  <Show when={volumeState().muted} fallback={<RiVolumeUpFill />}>
                    <RiVolumeMuteFill />
                  </Show>
                </Button>
                <TooltipContent>
                  <span>{volumeState().muted ? "음소거 해제" : "음소거하기"}</span>
                </TooltipContent>
              </TooltipTrigger>
            </Tooltip>
          </div>
          <div
            class={cn("h-[180px] w-[320px]", pipState() === "fullscreen" && "h-full w-full")}
            data-sidebar-expanded={sidebarState()}
          >
            <YoutubePlayer {...videoData()} autoLoad={true} />
            <Show when={pipState() === "fullscreen"}>
              <div class="mt-2 flex justify-center gap-2">
                <div class="flex flex-col items-center gap-0.5 rounded-md border p-2">
                  <div class="text-muted-foreground text-xs">공유</div>
                  <div class="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={async () => {
                        await writeText(youtubeLivestreamUrl(videoData().videoId));
                        toast("URL이 복사되었습니다");
                      }}
                    >
                      영상 공유
                    </Button>
                    <Button
                      variant="outline"
                      onClick={async () => {
                        await writeText(youtubeChannelUrl(videoData().channelId));
                        toast("URL이 복사되었습니다");
                      }}
                    >
                      채널 공유
                    </Button>
                  </div>
                </div>
                <div class="flex flex-col items-center gap-0.5 rounded-md border p-2">
                  <div class="text-muted-foreground text-xs">볼륨 조절</div>
                  <div class="flex items-center">
                    <Tooltip placement="bottom">
                      <TooltipTrigger>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={decrementVolume}
                          onWheel={onWheel}
                        >
                          <span>-</span>
                        </Button>
                        <TooltipContent>
                          <span>볼륨 감소</span>
                        </TooltipContent>
                      </TooltipTrigger>
                    </Tooltip>
                    <div
                      class="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex size-10 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                      onWheel={onWheel}
                    >
                      <span>{volumeState().volume}</span>
                    </div>
                    <Tooltip placement="bottom">
                      <TooltipTrigger>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={incrementVolume}
                          onWheel={onWheel}
                        >
                          <span>+</span>
                        </Button>
                        <TooltipContent>
                          <span>볼륨 증가</span>
                        </TooltipContent>
                      </TooltipTrigger>
                    </Tooltip>
                    <Tooltip placement="bottom">
                      <TooltipTrigger>
                        <Button size="icon" variant="outline" onClick={toggleMuted}>
                          <Show when={volumeState().muted} fallback={<RiVolumeUpFill />}>
                            <RiVolumeMuteFill />
                          </Show>
                        </Button>
                        <TooltipContent>
                          <span>{volumeState().muted ? "음소거 해제" : "음소거하기"}</span>
                        </TooltipContent>
                      </TooltipTrigger>
                    </Tooltip>
                  </div>
                </div>
                <div class="flex flex-col items-center gap-0.5 rounded-md border p-2">
                  <div class="text-muted-foreground text-xs">플레이어</div>
                  <div class="flex items-center">
                    <Tooltip placement="bottom">
                      <TooltipTrigger>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => setPipState("minimize")}
                        >
                          <FluentMinimize24Regular />
                        </Button>
                        <TooltipContent>
                          <span>최소화</span>
                        </TooltipContent>
                      </TooltipTrigger>
                    </Tooltip>
                    <Tooltip placement="bottom">
                      <TooltipTrigger>
                        <Button size="icon" variant="outline" onClick={() => setPipState("on")}>
                          <MingcuteMiniplayerLine />
                        </Button>
                        <TooltipContent>
                          <span>PIP</span>
                        </TooltipContent>
                      </TooltipTrigger>
                    </Tooltip>
                    <Tooltip placement="bottom">
                      <TooltipTrigger>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => setPipState("off")}
                        >
                          <TablerX class="text-background" />
                        </Button>
                        <TooltipContent>
                          <span>종료</span>
                        </TooltipContent>
                      </TooltipTrigger>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div class="bg-background flex h-full flex-col gap-4 p-4">
                <h2 class="text-2xl">{videoData().title}</h2>
                <div>
                  <p>{videoData().channelName}</p>
                </div>
              </div>
            </Show>
          </div>
        </div>
      </Portal>
    </Show>
  );
}

export function useYoutubePip() {
  const context = useContext(YoutubePipContext);

  if (context === null) {
    throw new Error("useYoutubePip must be used within a YoutubePipProvider");
  }

  return context;
}

type YoutubePipProviderProps = {
  children: JSX.Element;
};

export function YoutubePipProvider(props: YoutubePipProviderProps) {
  const [videoData, setVideoData] = createSignal<YoutubePlayerProps>({
    title: "",
    videoId: "",
    channelName: "",
    scheduledTime: Temporal.Now.plainDateTimeISO(),
    channelId: "",
  });
  const [pipState, setPipState] = createSignal<PipState>("fullscreen");

  return (
    <YoutubePipContext.Provider
      value={{
        videoData,
        setVideoData,
        pipState,
        setPipState,
      }}
    >
      <YoutubePlayerControllerProvider>
        {props.children}
        <PipPlayer />
      </YoutubePlayerControllerProvider>
    </YoutubePipContext.Provider>
  );
}
