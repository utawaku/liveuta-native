import { useSettings } from "~/components/providers/settings.provider";
import { Field, FieldLabel } from "~/components/ui/field";
import { Switch, SwitchControl, SwitchThumb } from "~/components/ui/switch";

export function AutoSyncSetting() {
  const { settings, setAutoSync } = useSettings();

  return (
    <Field>
      <FieldLabel for="auto-sync">자동 동기화</FieldLabel>
      <Switch checked={settings.autoSync} onChange={(checked) => setAutoSync(checked)}>
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
      </Switch>
    </Field>
  );
}
