import { Store } from "@tanstack/store";

import { ChannelSort } from "~/types/mongodb";

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
