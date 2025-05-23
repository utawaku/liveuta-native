/*
MIT License

Copyright (c) 2021 Ibrahim Cesar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/*
Copyright 2019 Paul Irish

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import "lite-youtube-embed/src/lite-yt-embed.css";
import {
  Accessor,
  batch,
  createContext,
  createEffect,
  createSignal,
  JSX,
  mergeProps,
  onMount,
  Show,
  useContext,
} from "solid-js";
import { YoutubeThumbnailQuality } from "~/lib/utils";
import "./youtube-player.css";
import { Temporal } from "temporal-polyfill";
import YouTubeIFrameCtrl from "./youtube-iframe-controller";

type Rel = "prefetch" | "preload";

export type iframeStatus = "off" | "on";

type VolumeState = {
  muted: boolean;
  volume: number;
};

type YoutubePlayerContextType = {
  iframeState: Accessor<iframeStatus>;
  setIframeState: (status: iframeStatus) => void;
  controller: Accessor<YouTubeIFrameCtrl | null>;
  setController: (controller: YouTubeIFrameCtrl | null) => void;
  volumeState: Accessor<VolumeState>;
  setVolumeState: (state: VolumeState) => void;
  setVolume: (volume: number) => void;
  incrementVolume: () => void;
  decrementVolume: () => void;
  setMuted: (muted: boolean) => void;
  toggleMuted: () => void;
};

const YoutubePlayerControllerContext = createContext<YoutubePlayerContextType | null>(null);

export function useYoutubePlayerControllerContext() {
  const context = useContext(YoutubePlayerControllerContext);

  if (!context) {
    throw new Error(
      "useYoutubePlayerControllerContext must be used within a PlayerControllerProvider",
    );
  }

  return context;
}

export function YoutubePlayerControllerProvider(props: { children: JSX.Element }) {
  const [controller, setController] = createSignal<YouTubeIFrameCtrl | null>(null);
  const [iframeState, setIframeState] = createSignal<iframeStatus>("off");
  const [volumeState, setVolumeState] = createSignal<VolumeState>({
    muted: false,
    volume: -1,
  });

  const setVolume = (volume: number) => {
    if (!controller()) return;
    controller()
      ?.setVolume(volume)
      .then(() => {
        setVolumeState((prev) => ({ ...prev, volume }));
      });
  };

  const incrementVolume = () => {
    const targetVolume = volumeState().volume + 5 > 100 ? 100 : volumeState().volume + 5;
    setVolume(targetVolume);
  };

  const decrementVolume = () => {
    const targetVolume = volumeState().volume - 5 < 0 ? 0 : volumeState().volume - 5;
    setVolume(targetVolume);
  };

  const setMuted = (muted: boolean) => {
    if (!controller()) return;
    if (muted) {
      controller()
        ?.mute()
        .then(() => {
          setVolumeState((prev) => ({ ...prev, muted }));
        });
    } else {
      controller()
        ?.unMute()
        .then(() => {
          setVolumeState((prev) => ({ ...prev, muted }));
        });
    }
  };

  const toggleMuted = () => setMuted(!volumeState().muted);

  return (
    <YoutubePlayerControllerContext.Provider
      value={{
        controller,
        setController,
        iframeState,
        setIframeState,
        volumeState,
        setVolumeState,
        setVolume,
        incrementVolume,
        decrementVolume,
        setMuted,
        toggleMuted,
      }}
    >
      {props.children}
    </YoutubePlayerControllerContext.Provider>
  );
}

export type YoutubePlayerProps = {
  videoId: string;
  title: string;
  channelName: string;
  scheduledTime: Temporal.PlainDateTime;
  channelId: string;
  // channelName: Schema.String,
  // scheduledTime: Schema.String,
  // broadcastStatus: Schema.UndefinedOr(Schema.Boolean),
  // hide: Schema.Boolean,
  // isVideo: Schema.Boolean,
  // concurrentViewers: Schema.Number,
  // channelId: Schema.String,
  // tag: Schema.UndefinedOr(Schema.String),
  activatedClass?: string;
  announce?: string;
  aspectWidth?: number;
  aspectHeight?: number;
  autoLoad?: boolean;
  fullPage?: boolean;
  iframeClass?: string;
  isPlaylist?: boolean;
  muted?: boolean;
  params?: string;
  playerClass?: string;
  playlistCoverId?: string;
  rel?: Rel;
  thumbnailSize?: YoutubeThumbnailQuality;
  thumbnailWebp?: boolean;
  wrapperClass?: string;
  onIframeAdded?: () => void;
};

export function YoutubePlayer(props: YoutubePlayerProps) {
  const merged = mergeProps(
    {
      activatedClass: "lyt-activated",
      announce: "Watch",
      aspectWidth: 16,
      aspectHeight: 9,
      autoPlay: false,
      fullPage: false,
      isPlaylist: false,
      muted: false,
      playerClass: "lty-playbtn",
      rel: "prefetch" as Rel,
      thumbnailSize: "maxresdefault" as YoutubeThumbnailQuality,
      thumbnailWebp: false,
      wrapperClass: "lite-youtube",
      onIframeAdded: () => {},
    },
    props,
  );

  const youtubeUrl = "https://www.youtube-nocookie.com";

  let iframeWrapperRef: HTMLDivElement | undefined;
  let iframeRef: HTMLIFrameElement | undefined;

  const { setController, iframeState, setIframeState, setVolumeState } =
    useYoutubePlayerControllerContext();
  const [preConnected, setPreConnected] = createSignal(false);
  const [iframeAdded, setIframeAdded] = createSignal(false);
  const vi = () => (merged.thumbnailWebp ? "vi_webp" : "vi");
  const videoPlaylistCoverId = () =>
    merged.playlistCoverId ? encodeURIComponent(merged.playlistCoverId) : null;
  const thumbnailFormat = () => (merged.thumbnailWebp ? "webp" : "jpg");
  const videoId = () => encodeURIComponent(merged.videoId);
  const thumbnailUrl = () =>
    merged.isPlaylist
      ? `https://i.ytimg.com/${vi()}/${videoPlaylistCoverId()}/${merged.thumbnailSize}.${thumbnailFormat()}`
      : `https://i.ytimg.com/${vi()}/${videoId()}/${merged.thumbnailSize}.${thumbnailFormat()}`;
  const muted = () => (merged.muted ? "&mute=1" : "");
  const params = () => (merged.params ? `&${merged.params}` : "");
  const iframeSource = () =>
    merged.isPlaylist
      ? `${youtubeUrl}/embed/videoseries?enablejsapi=1&autoplay=1${muted()}&list=${videoId()}${params()}`
      : `${youtubeUrl}/embed/${videoId()}?enablejsapi=1&autoplay=1&state=1${muted()}${params()}`;

  const warmConnections = () => {
    if (preConnected()) return;
    setPreConnected(true);
  };

  const addIframe = () => {
    if (iframeAdded()) return;
    batch(() => {
      setIframeAdded(true);
      setIframeState("on");
    });
    merged.onIframeAdded();
  };

  const volumeListener = async (event: MessageEvent) => {
    const data = (await JSON.parse(event.data)) as {
      event: string;
      info: Record<string, unknown>;
      channel: string;
    };

    if (data.event === "infoDelivery") {
      if (data.info.volume !== undefined) {
        setVolumeState({
          volume: data.info.volume as number,
          muted: data.info.muted as boolean,
        });
        window.removeEventListener("message", volumeListener);
      }
    }
  };

  onMount(() => {
    if (merged.autoLoad) {
      addIframe();
    }
  });

  createEffect(() => {
    if (!iframeAdded()) {
      window.removeEventListener("message", volumeListener);
      setVolumeState({ muted: false, volume: -1 });
      setController(null);
    }
  });

  return (
    <>
      <link rel={merged.rel} href={thumbnailUrl()} as="image" />
      <Show when={preConnected()}>
        <link rel="preconnect" href={youtubeUrl} />
        <link rel="preconnect" href="https://www.google.com" />
      </Show>
      <div
        class={`${merged.wrapperClass} ${iframeState() === "on" ? merged.activatedClass : ""}`}
        data-title={merged.title}
        onPointerOver={warmConnections}
        onClick={addIframe}
        style={{
          "background-image": `url(${thumbnailUrl()})`,
          "--aspect-ratio": `${(merged.aspectHeight / merged.aspectWidth) * 100}%`,
        }}
        ref={iframeWrapperRef}
      >
        <button
          type="button"
          class={merged.playerClass}
          aria-label={`${merged.announce} ${merged.title}`}
        />
        <Show when={iframeAdded()}>
          <iframe
            id="youtube-player"
            ref={iframeRef}
            title={merged.title}
            width="560"
            height="315"
            // @ts-expect-error youtube-embed
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            src={iframeSource()}
            class={merged.iframeClass}
            onLoad={async (e) => {
              setController(new YouTubeIFrameCtrl(iframeRef!));
              e.currentTarget.contentWindow?.postMessage(
                '{"event":"command","func":"getVolume"}',
                "*",
              );
              window.addEventListener("message", volumeListener);
            }}
            credentialless
          />
        </Show>
      </div>
    </>
  );
}
