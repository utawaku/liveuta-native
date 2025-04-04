import { useNavigate } from "@tanstack/solid-router";
import { Accessor, createContext, createSignal, JSX, Show, useContext } from "solid-js";
import { Portal } from "solid-js/web";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
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
          <CommandItem onSelect={() => props.setIsCmdOpen(false)}>
            <span>커맨드 팔레트 토글</span>
            <span class="hidden">Toggle Command Palette</span>
            <CommandShortcut>Ctrl-K</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => onSelect(() => toggleSidebar())}>
            <span>사이드바 토글</span>
            <span class="hidden">Toggle Sidebar</span>
            <CommandShortcut>Ctrl-T</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="이동">
          <CommandItem onSelect={() => onSelect(() => navigate({ to: "/" }))}>
            <span>홈</span>
            <span class="hidden">Home</span>
            <CommandShortcut>Ctrl-Shift-H</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              onSelect(() =>
                navigate({
                  to: "/schedule",
                }),
              )
            }
          >
            <span>스케줄</span>
            <span class="hidden">Schedule</span>
            <CommandShortcut>Ctrl-Shift-A</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              onSelect(() =>
                navigate({
                  to: "/channels",
                }),
              )
            }
          >
            <span>채널</span>
            <span class="hidden">Channel</span>
            <CommandShortcut>Ctrl-Shift-C</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="설정">
          <CommandItem onSelect={() => onSelect(() => setTheme("light"))}>
            <span>라이트 테마</span>
            <span class="hidden">Light Theme</span>
            <CommandShortcut>Ctrl-T-1</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => onSelect(() => setTheme("dark"))}>
            <span>다크 테마</span>
            <span class="hidden">Dark Theme</span>
            <CommandShortcut>Ctrl-T-2</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => onSelect(() => setTheme("system"))}>
            <span>시스템 테마 사용</span>
            <span class="hidden">Use System Theme</span>
            <CommandShortcut>Ctrl-T-3</CommandShortcut>
          </CommandItem>
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
