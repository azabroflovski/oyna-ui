# Avatar

A person, as a round picture or as initials when there is no picture. For a member in a list, the author of a deploy, the account in a header.

<Demo>
  <OAvatar name="Ada Lovelace" size="sm" />
  <OAvatar name="Ada Lovelace" />
  <OAvatar name="Ada Lovelace" size="lg" />
  <OAvatar name="grace" size="lg" />
</Demo>

```vue
<OAvatar name="Ada Lovelace" size="sm" />
<OAvatar name="Ada Lovelace" />
<OAvatar name="Ada Lovelace" size="lg" />
<OAvatar name="grace" size="lg" />
```

The initials are the first letters of the first two words of `name`. The name is also what a screen reader says, so give the full one even when a picture is shown.

## With a picture

Pass `src`. The initials show until the picture has loaded, and stay if it fails to load, so a broken address never leaves an empty circle.

<Demo>
  <OAvatar name="Oyna UI" src="/favicon.svg" size="lg" />
  <OAvatar name="Missing Picture" src="/no-such-picture.png" size="lg" />
</Demo>

```vue
<OAvatar name="Oyna UI" src="/favicon.svg" size="lg" />
<OAvatar name="Missing Picture" src="/no-such-picture.png" size="lg" />
```

## Next to a name

An avatar sits in a row with text; the row is yours to lay out.

<Demo>
  <div style="display: flex; align-items: center; gap: 10px">
    <OAvatar name="Ada Lovelace" />
    <div style="display: flex; flex-direction: column; line-height: 1.3">
      <b>Ada Lovelace</b>
      <span style="font-size: 13px; color: var(--o-text-3)">ada@example.com</span>
    </div>
  </div>
</Demo>

```vue
<div style="display: flex; align-items: center; gap: 10px">
  <OAvatar name="Ada Lovelace" />
  <div>
    <b>Ada Lovelace</b>
    <span>ada@example.com</span>
  </div>
</div>
```

## Props

| Prop   | Type                   | Default  | Description                                    |
| ------ | ---------------------- | -------- | ---------------------------------------------- |
| `name` | `string`               | required | Read out by screen readers; gives the initials |
| `src`  | `string`               | —        | Address of the picture                         |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'`   | 24, 32 or 48 px                                |

Built on [Reka UI](https://reka-ui.com) Avatar.
