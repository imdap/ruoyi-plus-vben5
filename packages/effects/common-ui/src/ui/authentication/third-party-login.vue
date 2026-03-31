<script setup lang="ts">
import { GiteeIcon, MdiGithub, MdiQqchat, MdiWechat } from '@vben/icons';
import { $t } from '@vben/locales';

import { VbenIconButton } from '@vben-core/shadcn-ui';

defineOptions({
  name: 'ThirdPartyLogin',
});

defineEmits<{
  /**
   * 第三方登录 platfrom 对应平台的string
   */
  oauthLogin: [plateform: string];
}>();
</script>

<template>
  <div class="w-full sm:mx-auto md:max-w-md">
    <div class="mt-4 flex items-center justify-between">
      <span class="w-[35%] border-b border-input dark:border-gray-600"></span>
      <span class="text-center text-xs text-muted-foreground uppercase">
        {{ $t('authentication.thirdPartyLogin') }}
      </span>
      <span class="w-[35%] border-b border-input dark:border-gray-600"></span>
    </div>

    <div class="mt-4 flex flex-wrap justify-around">
      <VbenIconButton class="mb-3" @click="$emit('oauthLogin', 'wechat')">
        <MdiWechat class="size-[24px] text-green-600" />
      </VbenIconButton>
      <VbenIconButton class="mb-3" @click="$emit('oauthLogin', 'qq')">
        <MdiQqchat class="size-[24px]" />
      </VbenIconButton>
      <VbenIconButton class="mb-3" @click="$emit('oauthLogin', 'github')">
        <MdiGithub class="size-[24px]" />
      </VbenIconButton>
      <VbenIconButton class="mb-3" @click="$emit('oauthLogin', 'gitee')">
        <GiteeIcon class="size-[24px] text-red-700" />
      </VbenIconButton>
    </div>
  </div>
</template>
