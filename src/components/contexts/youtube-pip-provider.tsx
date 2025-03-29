import { Accessor, createContext, createSignal, JSX, Show, useContext } from "solid-js";
import { Portal } from "solid-js/web";
import { MingcuteExpandPlayerLine } from "~/icons/mingcute/expand-player-line";
import { TablerX } from "~/icons/tabler/x";
import { YoutubePlayer, YoutubePlayerProps } from "../player/youtube-player";
import { Button } from "../ui/button";

type PipState = "off" | "on" | "fullscreen";

type YoutubePipContextType = {
  videoState: Accessor<YoutubePlayerProps>;
  setVideoState: (value: YoutubePlayerProps) => void;
  pipState: Accessor<PipState>;
  setPipState: (value: PipState) => void;
};

export const YoutubePipContext = createContext<YoutubePipContextType>();

export function useYoutubePip() {
  const context = useContext(YoutubePipContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

type YoutubePipProviderProps = {
  children: JSX.Element;
};

export function YoutubePipProvider(props: YoutubePipProviderProps) {
  const [videoState, setVideoState] = createSignal<YoutubePlayerProps>({
    title: "",
    videoId: "",
  });
  const [pipState, setPipState] = createSignal<PipState>("off");

  return (
    <YoutubePipContext.Provider
      value={{
        videoState,
        setVideoState,
        pipState,
        setPipState,
      }}
    >
      {props.children}
      <Show when={pipState() !== "off"}>
        <Portal>
          <div class="bottom-15 right-15 z-9999 group fixed">
            <div class="absolute -top-[35px] right-0 flex justify-end">
              {/* <Button size="icon" variant="default">
                <MingcuteExpandPlayerLine class="text-background" />
              </Button> */}
              <Button size="icon" variant="destructive" onClick={() => setPipState("off")}>
                <TablerX class="text-background size-6" />
              </Button>
            </div>
            <div class="h-[180px] w-[320px]">
              <YoutubePlayer {...videoState()} />
            </div>
          </div>
        </Portal>
      </Show>
    </YoutubePipContext.Provider>
  );
}
