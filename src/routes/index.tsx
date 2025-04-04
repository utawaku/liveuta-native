import { createFileRoute } from "@tanstack/solid-router";
import { useContext } from "solid-js";
import { YoutubePipContext } from "~/components/contexts/youtube-pip-provider";
import { YoutubePlayer } from "~/components/player/youtube-player";
import { ScheduleItemCard } from "~/components/route-components/schedule/item-card";
import Dayjs from "~/lib/dayjs";
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
    scheduledTime: Dayjs(),
    tag: "",
    title: "【歌】深夜２６時くらいの歌枠　#vsinger",
    type: "stream",
    videoId: "0qGxHEbSve0",
  } as ScheduleItem;
  const item2 = {
    broadcastStatus: true,
    channelId: "UCyLGcqYs7RsBb3L0SJfzGYA",
    channelName: "카가 스미레",
    concurrentViewers: 1,
    hide: false,
    isVideo: false,
    scheduledTime: Dayjs(),
    tag: "",
    title: "test",
    type: "stream",
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
              autoLoad: true,
            });
            pip?.setPipState("on");
          }}
        >
          Click2
        </button>
      </div>
    </div>
  );
}
