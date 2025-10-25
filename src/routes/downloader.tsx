import { createFileRoute } from "@tanstack/solid-router";

import { TextField, TextFieldInput } from "~/components/ui/text-field";

export const Route = createFileRoute("/downloader")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div>
        <TextField>
          <TextFieldInput />
        </TextField>
      </div>
    </div>
  );
}
