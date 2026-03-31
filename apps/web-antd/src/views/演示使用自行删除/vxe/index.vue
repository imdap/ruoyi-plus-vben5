<script setup lang="ts">
import { Page } from '@vben/common-ui';

import { Card } from 'antdv-next';

import EditTable from './edit-table.vue';
</script>

<template>
  <Page>
    <div class="flex flex-col gap-4">
      <Card title="可编辑表格" size="small">
        <EditTable class="h-[500px]" />
      </Card>
    </div>
  </Page>
</template>
