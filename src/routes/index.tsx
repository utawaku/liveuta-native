import { createFileRoute } from "@tanstack/solid-router";
import { useContext } from "solid-js";
import { Temporal } from "temporal-polyfill";
import { CopyButton } from "~/components/common/copy-button";
import { OpenInBrowser } from "~/components/common/open-in-new";
import { YoutubePipContext } from "~/components/contexts/youtube-pip-provider";
import { ScheduleItem } from "~/types/mongodb";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const pip = useContext(YoutubePipContext);
  const item = {
    broadcastStatus: true,
    channelId: "UCB8BWYU7BwVkVd9gfi05olg",
    channelName: "코다마 에토",
    concurrentViewers: 1,
    hide: false,
    isVideo: false,
    scheduledTime: Temporal.Now.plainDateTimeISO(),
    title: "【歌】深夜２６時くらいの歌枠　#vsinger",
  } as ScheduleItem;
  const item2 = {
    broadcastStatus: true,
    channelId: "UCyLGcqYs7RsBb3L0SJfzGYA",
    channelName: "카가 스미레",
    concurrentViewers: 1,
    hide: false,
    isVideo: false,
    scheduledTime: Temporal.Now.plainDateTimeISO(),
    title: "test",
    videoId: "6qMdw0U7GI0",
  } as ScheduleItem;

  return (
    <div>
      {/* <YoutubePlayer
        title="【歌枠┆#karaoke 】あなたはだんだん眠くな～る。いや、な～れ！真夜中の弾き語り // 睡眠導入【MEDA / RK Music】"
        videoId="NadXTfxOC8E"
        thumbnailSize="hqdefault"
      /> */}
      <div>
        {/* <ScheduleItemCard item={item} /> */}
        <button
          onClick={() => {
            pip?.setVideoData({
              title: item.title,
              videoId: item.videoId,
              channelName: item.channelName,
              scheduledTime: item.scheduledTime,
              channelId: item.channelId,
              autoLoad: true,
            });
            pip?.setPipState("on");
          }}
        >
          Click
        </button>
        <button
          onClick={() => {
            pip?.setVideoData({
              title: item2.title,
              videoId: item2.videoId,
              channelName: item.channelName,
              scheduledTime: item.scheduledTime,
              channelId: item.channelId,
              autoLoad: true,
            });
            pip?.setPipState("on");
          }}
        >
          Click2
        </button>
      </div>
      <CopyButton text="hello" />
      <OpenInBrowser href="https://www.youtube.com/watch?v=6qMdw0U7GI0" />
    </div>
  );
}
