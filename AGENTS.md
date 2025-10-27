# Repository Guidelines

## Project Structure & Module Organization
Liveuta Native combines a SolidJS front end with a Tauri shell. Web code lives in `src/`, with views organised under `src/routes` (TanStack file-router) and shared UI in `src/components`. Stateful helpers and API clients live in `src/stores`, `src/lib`, and `src/lib/client`, while database models and Drizzle schemas sit in `src/lib/db`. Static media and icon sets reside in `src/assets` and `src/icons`. Native Tauri code, Rust crates, and packaging assets are under `src-tauri/`; respect `tauri.conf.json` when altering bundle metadata.

## Build, Test, and Development Commands
Install once with `bun install`. Use `bun run dev` for a browser-only session and `bun run tauri dev` when you need the native shell (runs `cargo` and Vite together). `bun run build` produces the web bundle; `bun run tauri build` packages desktop binaries. Keep type safety with `bun run check`, lint the Solid codebase with `bun run lint`, and format it with `bun run format`. Regenerate Drizzle SQL and types via `bun run db:generate` after editing schema files.

## Coding Style & Naming Conventions
The project relies on Prettier (with Tailwind and import-sorting plugins) and `oxlint`; ensure edits stay formatted (2-space indent, trailing commas, semicolons). Solid components and route modules should remain PascalCase, while signals/stores use camelCase setters (e.g., `useScheduleStore`). Co-locate UI variants in `src/components/ui`, and keep Tailwind class strings sorted logically (Prettier handles plugin ordering). For Rust, run `cargo fmt` inside `src-tauri` before submitting.

## Testing Guidelines
An automated test suite is not yet wired in; add new coverage with Vitest + @solidjs/testing-library when contributing critical features. Place specs alongside source as `*.test.tsx` and mimic route structure. Exercise Tauri flows via `bun run tauri dev` on each target OS, and verify database changes by running migrations with `bun run db:generate` followed by manual smoke tests.

## Commit & Pull Request Guidelines
Follow the existing history: short, imperative subject lines without prefixes (e.g., “Fix schedule color”). Group related changes per commit and run format/lint checks beforehand. Pull requests should describe the change, list manual test platforms, attach UX screenshots when UI shifts, and link issues or linear tasks. Install Git hooks with `bunx lefthook install` if you want pre-commit automation.
