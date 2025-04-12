import { useNavigate } from "@tanstack/solid-router";
import { Accessor, createContext, createSignal, For, JSX, Show, useContext } from "solid-js";
import { createStore } from "solid-js/store";
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

export type CommandItem = {
  onSelect: () => void;
  label: string;
  keywords: string[];
  shortcut?: string;
};

export type CommandGroup = {
  heading: string;
  items: CommandItem[];
};

type CommandPaletteContextType = {
  openCmd: () => void;
  closeCmd: () => void;
  toggleCmd: () => void;
  isCmdOpen: Accessor<boolean>;
  setIsCmdOpen: (value: boolean) => void;
  addCmdGroup: (group: CommandGroup) => void;
  removeCmdGroup: (name: string) => void;
};

export const CommandPaletteContext = createContext<CommandPaletteContextType>();

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);

  if (!context) {
    throw new Error("useCommandPalette must be used within a CommandPaletteProvider");
  }

  return context;
}

function CommandItem(props: CommandItem) {
  return (
    <CommandItemPrimitive onSelect={props.onSelect} keywords={props.keywords}>
      <span>{props.label}</span>
      <Show when={props.shortcut}>
        <CommandShortcut>{props.shortcut}</CommandShortcut>
      </Show>
    </CommandItemPrimitive>
  );
}

type CommandPaletteProps = {
  isCmdOpen: boolean;
  setIsCmdOpen: (value: boolean) => void;
  groups: CommandGroup[];
};

function CommandPalette(props: CommandPaletteProps) {
  return (
    <CommandDialog open={props.isCmdOpen} onOpenChange={props.setIsCmdOpen}>
      <CommandInput placeholder="커맨드를 입력하세요" />
      <CommandList>
        <CommandEmpty>검색 결과가 없습니다</CommandEmpty>
        <For each={props.groups}>
          {(group, index) => (
            <>
              <CommandGroup heading={group.heading}>
                <For each={group.items}>
                  {(item) => (
                    <CommandItem
                      onSelect={item.onSelect}
                      label={item.label}
                      keywords={item.keywords}
                      shortcut={item.shortcut}
                    />
                  )}
                </For>
              </CommandGroup>
              <Show when={index() !== props.groups.length - 1}>
                <CommandSeparator />
              </Show>
            </>
          )}
        </For>
      </CommandList>
    </CommandDialog>
  );
}

export function CommandPaletteProvider(props: { children: JSX.Element }) {
  const { setTheme } = useTheme();
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const [isCmdOpen, setIsCmdOpen] = createSignal(false);

  const openCmd = () => setIsCmdOpen(true);
  const closeCmd = () => setIsCmdOpen(false);
  const toggleCmd = () => setIsCmdOpen((prev) => !prev);

  const onSelect = (f: () => void) => {
    setIsCmdOpen(false);
    f();
  };

  const [commandGroups, setCommandGroups] = createStore<{
    groups: CommandGroup[];
  }>({
    groups: [
      {
        heading: "커맨드",
        items: [
          {
            onSelect: () => setIsCmdOpen(false),
            label: "커맨드 팔레트 토글",
            keywords: ["Command", "Close Command Palette"],
            shortcut: "⌘-P",
          },
          {
            onSelect: () => onSelect(() => toggleSidebar()),
            label: "사이드바 토글",
            keywords: ["Command", "Toggle Sidebar"],
            shortcut: "⌘-S",
          },
        ],
      },
      {
        heading: "이동",
        items: [
          {
            onSelect: () => onSelect(() => navigate({ to: "/" })),
            label: "홈",
            keywords: ["Navigate", "Home"],
            shortcut: "⌘-Shift-H",
          },
          {
            onSelect: () => onSelect(() => navigate({ to: "/schedule" })),
            label: "스케줄",
            keywords: ["Navigate", "Schedule"],
            shortcut: "⌘-Shift-A",
          },
          {
            onSelect: () => onSelect(() => navigate({ to: "/channels" })),
            label: "채널",
            keywords: ["Navigate", "Channels"],
            shortcut: "⌘-Shift-C",
          },
        ],
      },
      {
        heading: "설정",
        items: [
          {
            onSelect: () => onSelect(() => setTheme("light")),
            label: "라이트 테마",
            keywords: ["Settings", "Light Theme"],
            shortcut: "⌘-T-1",
          },
          {
            onSelect: () => onSelect(() => setTheme("dark")),
            label: "다크 테마",
            keywords: ["Settings", "Dark Theme"],
            shortcut: "⌘-T-2",
          },
          {
            onSelect: () => onSelect(() => setTheme("system")),
            label: "시스템 테마 사용",
            keywords: ["Settings", "Use System Theme"],
            shortcut: "⌘-T-3",
          },
        ],
      },
    ],
  });

  const addCmdGroup = (group: CommandGroup) => {
    setCommandGroups("groups", 0, group);
  };

  const removeCmdGroup = (name: string) => {
    setCommandGroups("groups", (groups) => groups.filter((g) => g.heading !== name));
  };

  return (
    <CommandPaletteContext.Provider
      value={{ openCmd, closeCmd, toggleCmd, isCmdOpen, setIsCmdOpen, addCmdGroup, removeCmdGroup }}
    >
      {props.children}
      <CommandPalette
        isCmdOpen={isCmdOpen()}
        setIsCmdOpen={setIsCmdOpen}
        groups={commandGroups.groups}
      />
    </CommandPaletteContext.Provider>
  );
}
