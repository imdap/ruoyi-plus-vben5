# @antdv-next/happy-work-theme

Happy Work theme for antdv-next with joyful dot animations.

## Features

- 🎉 Joyful dot animations on component interactions
- 🎨 Customizable colors based on theme
- ⚡ Performance optimized with automatic cleanup
- 🎯 Works with Button, Switch, Radio, Checkbox and more

## Installation

```bash
pnpm add @antdv-next/happy-work-theme
```

## Usage

### Basic Usage with HappyProvider

```vue
<script setup lang="ts">
import { ConfigProvider } from "antdv-next";
import { HappyProvider } from "@antdv-next/happy-work-theme";
import { ref } from "vue";

const happyMode = ref(false);
</script>

<template>
  <HappyProvider :enabled="happyMode" v-slot="{ wave }">
    <ConfigProvider :wave="wave">
      <YourApp />
    </ConfigProvider>
  </HappyProvider>
</template>
```

> **Note**: `HappyProvider` automatically handles the wave configuration. When `enabled` is `false`, it passes `undefined` to preserve the default wave effect.

### Advanced Usage with DotEffect

If you need more control, you can use the `DotEffect` component directly:

```vue
<script setup lang="ts">
import { ConfigProvider } from "antdv-next";
import { DotEffect } from "@antdv-next/happy-work-theme";
import { ref, createApp, h } from "vue";

const happyMode = ref(false);

function showEffect(target, info) {
  if (!happyMode.value) return;

  const { token, hashId } = info;

  const holder = document.createElement("div");
  holder.style.position = "absolute";
  holder.style.left = "0px";
  holder.style.top = "0px";
  document.body.appendChild(holder);

  const app = createApp({
    render() {
      return h(DotEffect, {
        target,
        token,
        hashId,
        onFinish: () => {
          app.unmount();
          holder.remove();
        },
      });
    },
  });

  app.mount(holder);
}
</script>

<template>
  <ConfigProvider :wave="{ showEffect }">
    <YourApp />
  </ConfigProvider>
</template>
```

## API

### HappyProvider

A wrapper component that simplifies happy mode integration.

Props:

- `enabled: boolean` - Enable/disable happy mode (default: `false`)

Slot Props:

- `wave: { showEffect: Function } | undefined` - Wave configuration object to pass directly to ConfigProvider's `:wave` prop. Returns `undefined` when disabled to preserve default wave effect.

Example:

```vue
<HappyProvider :enabled="happyMode" v-slot="{ wave }">
  <ConfigProvider :wave="wave">
    <YourApp />
  </ConfigProvider>
</HappyProvider>
```

### useHappyMode

A composable to access happy mode state from child components.

Returns:

- `() => boolean` - A function that returns the current happy mode state

Example:

```vue
<script setup lang="ts">
import { useHappyMode } from "@antdv-next/happy-work-theme";

const getHappyMode = useHappyMode();
const isHappy = getHappyMode(); // true or false
</script>
```

### DotEffect

The core animation component (usually used internally by HappyProvider).

Props:

- `target: HTMLElement` - The target element that was clicked
- `token: GlobalToken` - Ant Design theme token
- `hashId: string` - Hash ID for styling
- `onFinish: () => void` - Callback when animation completes

## License

MIT
