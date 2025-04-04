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
import { TablerBoxAlignBottomLeftFilled } from "~/icons/tabler/box-align-bottom-left-filled";
import { TablerBoxAlignBottomRightFilled } from "~/icons/tabler/box-align-bottom-right-filled";
import { TablerBoxAlignTopLeftFilled } from "~/icons/tabler/box-align-top-left-filled";
import { TablerBoxAlignTopRightFilled } from "~/icons/tabler/box-align-top-right-filled";
import { TablerX } from "~/icons/tabler/x";
import { cn } from "~/lib/utils";

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

  const { setIframeState } = useYoutubePlayerControllerContext();
  const { videoData, pipState, setPipState } = useContext(YoutubePipContext)!;

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
  const pipStateClass = () => {
    switch (pipState()) {
      case "off":
        return "";
      case "on":
        return "";
      case "minimize":
        return "hidden";
      case "fullscreen":
        return "";
    }
  };

  createEffect(() => {
    if (pipState() === "off") {
      setIframeState("off");
    }
  });

  return (
    <Show when={pipState() !== "off"}>
      <Portal>
        <div class={cn("z-9999 group fixed", locationClass(), pipStateClass())} ref={pipWrapperRef}>
          <div class="ease-expo-in-out-custom absolute -top-[35px] right-0 flex w-[320px] translate-y-4 justify-between transition-transform hover:translate-y-0">
            <div class="">
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
          <div class="h-[180px] w-[320px]">
            <YoutubePlayer {...videoData()} autoLoad={true} />
          </div>
        </div>
      </Portal>
    </Show>
  );
}

export function useYoutubePipContext() {
  const context = useContext(YoutubePipContext);

  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
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
  });
  const [pipState, setPipState] = createSignal<PipState>("off");

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
