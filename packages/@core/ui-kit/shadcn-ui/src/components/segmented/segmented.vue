<script setup lang="ts">
import type { SegmentedItem } from './types';

import { computed } from 'vue';

import { cn } from '@vben-core/shared/utils';

import { TabsTrigger } from 'reka-ui';

import { Tabs, TabsContent, TabsList } from '../../ui';

interface Props {
  defaultValue?: string;
  tabs?: SegmentedItem[];
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: '',
  tabs: () => [],
});

const activeTab = defineModel<string>();

const getDefaultValue = computed(() => {
  return props.defaultValue || props.tabs[0]?.value;
});

const tabsStyle = computed(() => {
  return {
    'grid-template-columns': `repeat(${props.tabs.length}, minmax(0, 1fr))`,
  };
});

const activeIndex = computed(() => {
  const val = activeTab.value || getDefaultValue.value;
  const idx = props.tabs.findIndex((t) => t.value === val);
  return Math.max(idx, 0);
});

const indicatorStyle = computed(() => {
  const count = props.tabs.length;
  if (count === 0) {
    return {};
  }
  return {
    width: `${(100 / count).toFixed(4)}%`,
    transform: `translateX(${activeIndex.value * 100}%)`,
  };
});

const indicatorClass = cn(
  'absolute inset-y-0 left-0 z-10',
  'px-0 py-1 pr-0.5',
  'transition-transform duration-300 ease-in-out',
);

const triggerClass = cn(
  'z-20 inline-flex items-center justify-center',
  'rounded-md px-3 py-1',
  'text-sm font-medium whitespace-nowrap',
  'hover:text-primary',
  'disabled:pointer-events-none disabled:opacity-50',
);

function activeClass(tab: string): string[] {
  return tab === activeTab.value ? ['font-bold!', 'text-primary'] : [];
}
</script>

<template>
  <Tabs v-model="activeTab" :default-value="getDefaultValue">
    <TabsList
      :style="tabsStyle"
      class="bg-accent outline-heavy! relative grid w-full outline-2!"
    >
      <div :style="indicatorStyle" :class="indicatorClass">
        <div class="bg-background h-full w-full rounded-md shadow-sm"></div>
      </div>
      <template v-for="tab in tabs" :key="tab.value">
        <TabsTrigger
          :value="tab.value"
          :class="[triggerClass, ...activeClass(tab.value)]"
        >
          {{ tab.label }}
        </TabsTrigger>
      </template>
    </TabsList>
    <template v-for="tab in tabs" :key="tab.value">
      <TabsContent :value="tab.value">
        <slot :name="tab.value"></slot>
      </TabsContent>
    </template>
  </Tabs>
</template>
