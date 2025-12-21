import { Store } from "@tanstack/store";

import { ChannelSort, type ChannelsDirection } from "~/types/mongodb.type";

export const CHANNELS_MAX_ITEMS = 50;

export const pageStore = new Store(1);

export function setPage(page: number) {
  pageStore.setState(() => page);
}

export const channelsSortStore = new Store<ChannelSort>("name_kor");
export function setChannelsSort(sort: ChannelSort) {
  channelsSortStore.setState(() => sort);
  window.localStorage.setItem("channel-sort", sort);
}


export const channelsDirectionStore = new Store<ChannelsDirection>("1")
export function setChannelsDirection(direction: ChannelsDirection) {
  channelsDirectionStore.setState(() => direction);
  window.localStorage.setItem("channels-direction", direction)
}

