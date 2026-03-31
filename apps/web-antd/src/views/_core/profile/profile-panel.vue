<script setup lang="tsx">
import type { DescriptionsProps } from 'antdv-next';

import type { UserProfile } from '#/api/system/profile/model';

import { computed } from 'vue';

import { preferences, usePreferences } from '@vben/preferences';

import { Card, Descriptions, Tag, Tooltip } from 'antdv-next';

import { userUpdateAvatar } from '#/api/system/profile';
import { CropperAvatar } from '#/components/cropper';

const props = defineProps<{ profile?: UserProfile }>();

defineEmits<{
  // 头像上传完毕
  uploadFinish: [];
}>();

const avatar = computed(
  () => props.profile?.user.avatar || preferences.app.defaultAvatar,
);

const { isDark } = usePreferences();
const poetrySrc = computed(() => {
  const color = isDark.value ? 'white' : 'gray';
  return `https://v2.jinrishici.com/one.svg?font-size=12&color=${color}`;
});

const items = computed<DescriptionsProps['items']>(() => {
  if (!props.profile) {
    return [];
  }
  const { profile } = props;
  return [
    {
      content: profile.user.userName,
      label: '账号',
    },
    {
      content: profile.user.phonenumber || '未绑定手机号',
      label: '手机号码',
    },
    {
      content: profile.user.email || '未绑定邮箱',
      label: '邮箱',
    },
    {
      content: (
        <>
          <Tag color="processing">{profile.user.deptName ?? '未分配部门'}</Tag>
          {profile.postGroup && (
            <Tag color="processing">{profile.postGroup}</Tag>
          )}
        </>
      ),
      label: '部门',
    },
    {
      content: profile.user.loginDate,
      label: '上次登录',
    },
  ];
});
</script>

<template>
  <Card :loading="!profile" class="h-full lg:w-1/3">
    <div v-if="profile" class="flex flex-col items-center gap-[24px]">
      <div class="flex flex-col items-center gap-[20px]">
        <Tooltip title="点击上传头像">
          <CropperAvatar
            :show-btn="false"
            :upload-api="userUpdateAvatar"
            :value="avatar"
            width="120"
            @change="$emit('uploadFinish')"
          />
        </Tooltip>
        <div class="flex flex-col items-center gap-[8px]">
          <span class="text-xl font-bold text-foreground">
            {{ profile.user.nickName ?? '未知' }}
          </span>
          <!-- https://www.jinrishici.com/doc/#image -->
          <img :src="poetrySrc" />
        </div>
      </div>
      <div class="px-[24px]">
        <Descriptions :column="1" :items="items" />
      </div>
    </div>
  </Card>
</template>
