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
  createContext,
  createEffect,
  createSignal,
  JSX,
  mergeProps,
  onMount,
  Show,
  useContext,
} from "solid-js";
import { cn, YoutubeThumbnailQuality } from "~/lib/utils";
import "./youtube-player.css";
import YouTubeIFrameCtrl from "./youtube-iframe-controller";

type Rel = "prefetch" | "preload";

export type iframeStatus = "off" | "on";

type YoutubePlayerContextType = {
  iframeState: Accessor<iframeStatus>;
  setIframeState: (status: iframeStatus) => void;
  controller: Accessor<YouTubeIFrameCtrl | null>;
  setController: (controller: YouTubeIFrameCtrl | null) => void;
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

  return (
    <YoutubePlayerControllerContext.Provider
      value={{
        controller,
        setController,
        iframeState,
        setIframeState,
      }}
    >
      {props.children}
    </YoutubePlayerControllerContext.Provider>
  );
}

export type YoutubePlayerProps = {
  videoId: string;
  title: string;
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

  let iframeRef: HTMLIFrameElement | undefined;

  const { setController, iframeState, setIframeState } = useYoutubePlayerControllerContext();
  const [preConnected, setPreConnected] = createSignal(false);
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
    if (iframeState() === "on") return;
    setIframeState("on");
  };

  const onPlayerScroll = (e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(1);
  };

  onMount(() => {
    if (merged.autoLoad) {
      setIframeState("on");
    }
  });

  createEffect(() => {
    if (iframeState() === "on") {
      setController(new YouTubeIFrameCtrl(iframeRef!));
    } else if (iframeState() === "off") {
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
      >
        <button
          type="button"
          class={merged.playerClass}
          aria-label={`${merged.announce} ${merged.title}`}
        />
        <iframe
          id="youtube-player"
          ref={iframeRef}
          title={merged.title}
          width="560"
          height="315"
          // @ts-expect-error youtube-embed
          frameBorder="0"
          allow={`accelerometer; ${merged.autoLoad ? "autoplay;" : ""} encrypted-media; gyroscope; picture-in-picture`}
          allowFullScreen
          src={iframeSource()}
          class={cn(iframeState() === "on" ? "" : "invisible hidden", merged.iframeClass)}
          onWheel={(e) => onPlayerScroll(e)}
        />
      </div>
    </>
  );
}
