# Contributing

Thanks for looking. Oyna UI is one look, done on purpose, and its author decides what goes in. Some
changes are welcome straight away; others need a word in an issue first.

## Send a pull request straight away

- A bug fix. Open an issue with a way to reproduce it, or put the reproduction in the pull request.
- A fix to the docs: a wrong example, a typo, a missing prop in a table.
- A site for the showcase: use the [Add a site](https://github.com/azabroflovski/oyna-ui/issues/new?template=showcase.yml)
  form, not a pull request.

## Open an issue first

- A new component, a new prop, or a change to how something looks or behaves.

Say what you are building and what is missing. The component set is kept small on purpose; a
request may be answered with a recipe from the docs instead of a new component. Not planned: a light
theme, a data grid, a date picker, a tree view.

## The look

Every component follows the same rules: translucent dark surfaces with no neutral borders, a ring
only when it means something, one accent colour, fades instead of movement, hotkeys by physical key.
They are on [Why Oyna UI](https://oyna-ui.org/guide/why); the full list, with the conventions of the
code, is in [AGENTS.md](./AGENTS.md).

## Working on it

```bash
bun install
bun run dev          # playground
bun run docs:dev     # docs site
```

Before you open the pull request:

```bash
bun run fmt
bun run lint && bun run typecheck && bun run test && bun run build && bun run pack:check
```

`typecheck` needs Node on your `PATH`. If you changed a dialog, a menu, a popover or the docs layout,
run `bun scripts/check.ts <folder>` with the docs running and look at the screenshots: unit tests do
not show how things look.

A component is done when it has a test, a docs page with a live example, and a place in an example
screen.

## Commits

[Conventional commits](https://www.conventionalcommits.org): `feat:`, `fix:`, `docs:`, `refactor:`,
`test:`, `chore:`. Code, commits and docs are in English.

By contributing you agree that your work is released under the [MIT license](./LICENSE). Everyone
here follows the [code of conduct](./CODE_OF_CONDUCT.md).
