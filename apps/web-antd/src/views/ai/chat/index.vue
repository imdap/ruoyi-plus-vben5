<script setup lang="ts">
import { Page } from '@vben/common-ui';

import { Card, Result } from 'antdv-next';
</script>

<template>
  <Page :auto-content-height="true">
    <Card size="small">
      <Result title="占位使用" sub-title="这个功能后期会被iframe替代" />
    </Card>
  </Page>
</template>
