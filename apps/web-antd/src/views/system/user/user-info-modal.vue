<script setup lang="tsx">
import type { DescriptionsProps } from 'antdv-next';

import type { User } from '#/api/system/user/model';

import { computed, shallowRef } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { DictEnum } from '@vben/constants';

import { Descriptions, Tag } from 'antdv-next';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import { findUserInfo } from '#/api/system/user';
import { DictTag } from '#/components/dict';
import { getDictOptions } from '#/utils/dict';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const [BasicModal, modalApi] = useVbenModal({
  onOpenChange: handleOpenChange,
  onClosed() {
    currentUser.value = null;
  },
});

interface UserWithNames extends User {
  postNames: string[];
  roleNames: string[];
}
const currentUser = shallowRef<null | UserWithNames>(null);

async function handleOpenChange(open: boolean) {
  if (!open) {
    return null;
  }
  modalApi.modalLoading(true);

  const { userId } = modalApi.getData() as { userId: number | string };
  const response = await findUserInfo(userId);
  // 外部的roleIds postIds才是真正对应的  新增时为空
  // posts有为Null的情况 需要给默认值
  const { postIds = [], posts = [], roleIds = [], roles = [], user } = response;

  const postNames = posts
    .filter((item) => postIds.includes(item.postId))
    .map((item) => item.postName);

  const roleNames = roles
    .filter((item) => roleIds.includes(item.roleId))
    .map((item) => item.roleName);

  (user as UserWithNames).postNames = postNames;
  (user as UserWithNames).roleNames = roleNames;
  // 赋值
  currentUser.value = user as UserWithNames;

  modalApi.modalLoading(false);
}

const mixInfo = computed(() => {
  if (!currentUser.value) {
    return '-';
  }
  const { deptName, nickName, userName } = currentUser.value;
  return `${userName} / ${nickName} / ${deptName ?? '-'}`;
});

const diffLoginTime = computed(() => {
  if (!currentUser.value) {
    return '-';
  }
  const { loginDate } = currentUser.value;
  // 默认en显示
  dayjs.locale('zh-cn');
  // 计算相差秒数
  const diffSeconds = dayjs().diff(dayjs(loginDate), 'second');
  /**
   * 转为时间显示(x月 x天)
   * https://dayjs.fenxianglu.cn/category/duration.html#%E4%BA%BA%E6%80%A7%E5%8C%96
   *
   */
  const diffText = dayjs.duration(diffSeconds, 'seconds').humanize();
  return diffText;
});

const statusOptions = getDictOptions(DictEnum.SYS_NORMAL_DISABLE);
const items = computed<DescriptionsProps['items']>(() => {
  if (!currentUser.value) {
    return [];
  }
  const { userId, status } = currentUser.value;
  return [
    { label: 'userId', content: userId },
    {
      label: '用户状态',
      content: <DictTag dicts={statusOptions} value={status} />,
    },
    { label: '用户信息', content: mixInfo.value },
    { label: '手机号', content: currentUser.value.phonenumber || '-' },
    { label: '邮箱', content: currentUser.value.email || '-' },
    {
      label: '岗位',
      content: (
        <div class="flex flex-wrap gap-0.5">
          {currentUser.value.postNames.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      ),
    },
    {
      label: '权限',
      content: (
        <div class="flex flex-wrap gap-0.5">
          {currentUser.value.roleNames.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      ),
    },
    { label: '创建时间', content: currentUser.value.createTime },
    { label: '上次登录IP', content: currentUser.value.loginIp || '-' },
    { label: '上次登录时间', content: currentUser.value.loginDate || '-' },
    {
      label: '上次登录时间',
      content: (
        <>
          <span>{currentUser.value.loginDate ?? '-'}</span>
          <Tag
            bordered={false}
            class="ml-2"
            color="processing"
            v-if="diffLoginTime"
          >
            {diffLoginTime}前
          </Tag>
        </>
      ),
    },
    { label: '备注', content: currentUser.value.remark || '-' },
  ];
});
</script>

<template>
  <BasicModal :footer="false" :fullscreen-button="false" title="用户信息">
    <Descriptions
      v-if="currentUser"
      size="small"
      :column="1"
      bordered
      :items="items"
    />
  </BasicModal>
</template>
