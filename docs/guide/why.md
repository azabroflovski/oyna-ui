# Why Oyna UI

I was building [invoke.wtf](https://invoke.wtf), a trainer for Invoker from Dota 2, and wanted a UI kit that looked the way I had in mind: dark glass over a rich background, no grey borders, light instead of lines, big condensed numbers, everything reachable from the keyboard.

I did not find one. Most Vue UI kits look like admin panels: white cards, grey borders, the same blue button. So I drew the interface by hand.

Oyna UI is that look taken out of the project and made into a library: the same surfaces, rings, type and hotkeys, without anything about the game. I made it for myself. If it suits your project, use it too.

## What is inside

Plain CSS and Vue. There is no Tailwind, no UnoCSS and no CSS-in-JS: you import one stylesheet and use the components, with nothing to configure. I did not want a library that makes you adopt a styling tool to get a button.

The one dependency is [Reka UI](https://reka-ui.com). Focus traps, keyboard navigation and screen reader support are hard to get right, and Reka UI already gets them right, so the dialogs, menus, selects and tooltips here are built on it. Everything you see is Oyna UI; the behaviour under it is Reka UI's.

## The rules of the look

Every component follows them. If you change a component or build your own, keep them:

- **Surfaces.** A card is a translucent dark fill over the background, with no neutral borders.
- **Rings.** A 2px ring appears only when it means something: accent for the main thing on a screen, danger for something at stake. Fields and key caps have a thin edge; nothing else does.
- **Colour.** One accent and one danger colour. Everything else is white at different opacities.
- **Type.** A condensed display face for numbers and headings, a plain sans for text.
- **Motion.** A change is instant or a single fade under 300 ms; nothing scales or slides. Reduced motion turns fades off.
- **Keyboard.** A button can show its hotkey and react to it. Keys are read by their position, so they work on any layout.

## What it is for

Interfaces that want character: dashboards, tools, landing pages, side projects. It is one look, done on purpose, not a neutral base to build any design on. You can change the accent, the radius and the fonts; you cannot make it look like a white admin panel, and it has no light theme.

## Where to see it

- [invoke.wtf](https://invoke.wtf) is where the look was born. The site itself is written by hand: the library came out of it, not the other way round.
- The [dashboard](/examples/dashboard) and [settings](/examples/settings) examples are built only from the library's components.

## The name

_Oyna_ is Uzbek for "glass", and also for "window" and "mirror".
