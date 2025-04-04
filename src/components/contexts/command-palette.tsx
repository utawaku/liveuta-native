import { useNavigate } from "@tanstack/solid-router";
import { Accessor, createContext, createSignal, JSX, Show, useContext } from "solid-js";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem as CommandItemPrimitive,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "~/components/ui/command";
import { useSidebar } from "../ui/sidebar";
import { useTheme } from "./theme-provider";

type CommandPaletteContextType = {
  openCmd: () => void;
  closeCmd: () => void;
  toggleCmd: () => void;
  isCmdOpen: Accessor<boolean>;
  setIsCmdOpen: (value: boolean) => void;
};

export const CommandPaletteContext = createContext<CommandPaletteContextType>();

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);

  if (!context) {
    throw new Error("useCommandPalette must be used within a CommandPaletteProvider");
  }

  return context;
}

type CommandItemProps = {
  onSelect: () => void;
  label: string;
  labelEnglish: string;
  shortcut?: string;
};

function CommandItem(props: CommandItemProps) {
  return (
    <CommandItemPrimitive onSelect={props.onSelect}>
      <span>{props.label}</span>
      <span class="hidden">{props.labelEnglish}</span>
      <Show when={props.shortcut}>
        <CommandShortcut>{props.shortcut}</CommandShortcut>
      </Show>
    </CommandItemPrimitive>
  );
}

function CommandPalette(props: { isCmdOpen: boolean; setIsCmdOpen: (value: boolean) => void }) {
  const { setTheme } = useTheme();
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  const onSelect = (f: () => void) => {
    props.setIsCmdOpen(false);
    f();
  };

  return (
    <CommandDialog open={props.isCmdOpen} onOpenChange={props.setIsCmdOpen}>
      <CommandInput placeholder="커맨드를 입력하세요" />
      <CommandList>
        <CommandEmpty>검색 결과가 없습니다</CommandEmpty>
        <CommandGroup heading="커맨드">
          <CommandItem
            onSelect={() => props.setIsCmdOpen(false)}
            label="커맨드 팔레트 토글"
            labelEnglish="Close Command Palette"
            shortcut="Ctrl-P"
          />
          <CommandItem
            onSelect={() => onSelect(() => toggleSidebar())}
            label="사이드바 토글"
            labelEnglish="Toggle Sidebar"
            shortcut="Ctrl-S"
          />
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="이동">
          <CommandItem
            onSelect={() => onSelect(() => navigate({ to: "/" }))}
            label="홈"
            labelEnglish="Home"
            shortcut="Ctrl-Shift-H"
          />
          <CommandItem
            onSelect={() => onSelect(() => navigate({ to: "/schedule" }))}
            label="스케줄"
            labelEnglish="Schedule"
            shortcut="Ctrl-Shift-A"
          />
          <CommandItem
            onSelect={() => onSelect(() => navigate({ to: "/channels" }))}
            label="채널"
            labelEnglish="Channels"
            shortcut="Ctrl-Shift-C"
          />
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="설정">
          <CommandItem
            onSelect={() => onSelect(() => setTheme("light"))}
            label="라이트 테마"
            labelEnglish="Light Theme"
            shortcut="Ctrl-T-1"
          />
          <CommandItem
            onSelect={() => onSelect(() => setTheme("dark"))}
            label="다크 테마"
            labelEnglish="Dark Theme"
            shortcut="Ctrl-T-2"
          />
          <CommandItem
            onSelect={() => onSelect(() => setTheme("system"))}
            label="시스템 테마 사용"
            labelEnglish="Use System Theme"
            shortcut="Ctrl-T-3"
          />
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function CommandPaletteProvider(props: { children: JSX.Element }) {
  const [isCmdOpen, setIsCmdOpen] = createSignal(false);

  const openCmd = () => setIsCmdOpen(true);

  const closeCmd = () => setIsCmdOpen(false);

  const toggleCmd = () => setIsCmdOpen((prev) => !prev);

  return (
    <CommandPaletteContext.Provider
      value={{ openCmd, closeCmd, toggleCmd, isCmdOpen, setIsCmdOpen }}
    >
      {props.children}
      <CommandPalette isCmdOpen={isCmdOpen()} setIsCmdOpen={setIsCmdOpen} />
    </CommandPaletteContext.Provider>
  );
}
