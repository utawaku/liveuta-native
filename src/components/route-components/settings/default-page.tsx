import { createEffect, createSignal } from "solid-js";

import { useSettings } from "~/components/providers/settings.provider";
import { Field, FieldLabel } from "~/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getTopRouteName, topRoutes } from "~/constants/top-routes.constant";
import { Route } from "~/types/route-info.type";

export function DefaultPageSetting() {
  const { settings, setDefaultPage } = useSettings();
  const [path, setPath] = createSignal(settings.defaultPage);

  createEffect(() => {
    const r = path();
    if (r) {
      setDefaultPage(r);
    }
  });

  return (
    <Field>
      <FieldLabel for="default-page">기본 페이지</FieldLabel>
      <Select
        value={path()}
        onChange={setPath}
        options={topRoutes.map((route) => route.path).filter((path) => path !== "/settings")}
        itemComponent={(props) => (
          <SelectItem item={props.item}>{getTopRouteName(props.item.rawValue)}</SelectItem>
        )}
      >
        <SelectTrigger id="default-page">
          <SelectValue<Route>>{(state) => getTopRouteName(state.selectedOption())}</SelectValue>
        </SelectTrigger>
        <SelectContent />
      </Select>
    </Field>
  );
}
