import { JSX } from "solid-js";

export function LucideChevronsUpDown(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m7 15l5 5l5-5M7 9l5-5l5 5"
      />
    </svg>
  );
}
