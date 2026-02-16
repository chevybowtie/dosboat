# Testing

This project uses Vitest for the frontend (Vue 3 + TypeScript) and Go's builtin `go test` for the backend `guest_server`.

This document explains how to run tests locally, common fixes, and where to add new tests.

## Frontend (Vue) — quick start

- Install the testing dev dependencies (using Bun):

```bash
bun add -d @testing-library/vue @testing-library/jest-dom jsdom ts-node
```

- Run the test suite (preferred command):

```bash
bun run test:bun
```

This runs `vitest run` via the `test:bun` npm script. Do not use `bun test` (Bun's test runner) — it doesn't load `vitest.config.ts` and will run in a non-jsdom environment.

### Useful commands

- Run tests once (same as above):

```bash
bun run test:bun
```

- Run tests in watch mode:

```bash
bun run test:bun -- --watch
```

- Run a single test file:

```bash
bun run test:bun -- src/renderer/components/ConfigCard.spec.ts
```

## Config and gotchas

- `vitest.config.ts` is present at repository root; it sets `environment: 'jsdom'` and includes `tests/setup.ts` (which registers `@testing-library/jest-dom`).
- If Vitest errors about loading `postcss.config.ts` ("'ts-node' is required"), install `ts-node` as shown above, or convert `postcss.config.ts` → `postcss.config.cjs` (JavaScript/CJS) to avoid TypeScript runtime config.
- If you see a deprecation about `deps.inline`, it has been moved to `server.deps.inline` in `vitest.config.ts`.

## Writing frontend tests

- Place unit tests near the target module using either `.spec.ts` or `.test.ts` (examples live in `src/renderer/components/ConfigCard.spec.ts`).
- Prefer `@testing-library/vue` for user-focused tests; `@vue/test-utils` can be used for lower-level mounts.
- Use `tests/setup.ts` to register global matchers and mocks (e.g. `@testing-library/jest-dom`).
- Stub or mock global UI primitives (the project uses `x-*` components and `Icon`): in tests, use the `global.stubs` option when calling `render()`.

Example (already added): `src/renderer/components/ConfigCard.spec.ts` — a small smoke test that verifies title and description rendering.

## Backend (Go)

- Run all Go tests in the backend module:

```bash
cd guest_server
go test ./...
```

- `github.com/stretchr/testify` is already present in `go.mod` (indirect); use `assert`/`require` for clearer assertions in tests.

## Continuous Integration

- Recommended minimal GitHub Actions step:

```yaml
- name: Run tests
  run: |
    bun install
    bun run test:bun
```

Or for Go tests:

```yaml
- name: Run Go tests
  run: |
    cd guest_server
    go test ./...
```

## Troubleshooting

- `ReferenceError: document is not defined` — you executed `bun test` (Bun runner). Use `bun run test:bun` instead so Vitest loads `jsdom`.
- `ts-node` missing — Vitest/Vite tried to load a TypeScript config file (e.g., `postcss.config.ts`). Install `ts-node` or convert the config to JS/CJS.

## Adding tests checklist

- Add `.spec.ts` or `.test.ts` next to the component or module.
- Use `tests/setup.ts` for global initialization.
- Stub UI primitives under `global.stubs` in the render/mount call.
- Run the new test with `bun run test:bun` and commit when green.

