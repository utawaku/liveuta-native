import { useStore } from "@tanstack/solid-store";
import { createSignal } from "solid-js";
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationItems,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { pageStore, setPage } from "./store";

type ChannelsFooterProps = {
  pages: number;
};

export function ChannelsFooter(props: ChannelsFooterProps) {
  const page = useStore(pageStore);

  return (
    <div class="mt-4 flex items-center justify-center">
      <Pagination
        page={page()}
        onPageChange={setPage}
        count={props.pages}
        itemComponent={(props) => <PaginationItem page={props.page}>{props.page}</PaginationItem>}
        ellipsisComponent={() => <PaginationEllipsis />}
      >
        <PaginationPrevious />
        <PaginationItems />
        <PaginationNext />
      </Pagination>
    </div>
  );
}
