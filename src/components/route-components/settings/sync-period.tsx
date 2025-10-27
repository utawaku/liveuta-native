import { For, Show } from "solid-js";

import { useSettings } from "~/components/providers/settings.provider";
import { Field, FieldLabel } from "~/components/ui/field";
import { RadioGroup, RadioGroupItem, RadioGroupItemLabel } from "~/components/ui/radio-group";

export function SyncPeriodSetting() {
  const { settings, setSyncPeriod } = useSettings();

  return (
    <Show when={settings.autoSync}>
      <Field>
        <FieldLabel for="sync-period">동기화 간격</FieldLabel>
        <RadioGroup
          value={settings.syncPeriod.toString()}
          onChange={(value) => setSyncPeriod(Number.parseInt(value))}
          orientation="horizontal"
        >
          <For each={[3, 5, 10, 30, 60, 120]}>
            {(period) => (
              <RadioGroupItem value={period.toString()}>
                <RadioGroupItemLabel>{period}분</RadioGroupItemLabel>
              </RadioGroupItem>
            )}
          </For>
        </RadioGroup>
      </Field>
    </Show>
  );
}
