<script setup lang="ts">
import type { ThemePreferences } from '@vben/preferences';

import { ToggleGroup, ToggleGroupItem } from '@vben-core/shadcn-ui';

defineOptions({
  name: 'PreferenceButtonWaveMode',
});

const modelValue = defineModel<string>('themeButtonWaveMode', {
  default: 'default',
});

type ButtonWaveModeItem = {
  label: ThemePreferences['buttonWaveMode'];
  value: ThemePreferences['buttonWaveMode'];
};
const items: ButtonWaveModeItem[] = (
  ['Default', 'Disabled', 'Happy', 'Inset', 'Shake'] as const
).map((item) => ({
  label: item,
  value: item,
}));
</script>

<template>
  <ToggleGroup
    v-model="modelValue"
    class="gap-2"
    size="sm"
    type="single"
    variant="outline"
  >
    <template v-for="item in items" :key="item.value">
      <ToggleGroupItem
        :value="item.value"
        class="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground h-7 rounded-sm px-2"
      >
        {{ item.label }}
      </ToggleGroupItem>
    </template>
  </ToggleGroup>
</template>
