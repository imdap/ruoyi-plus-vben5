<script setup lang="ts">
import type { Key } from 'antdv-next/dist/table/interface';

import type { PropType } from 'vue';

import type { DeptTree } from '#/api/system/user/model';

import { computed, onMounted, ref } from 'vue';

import { cloneDeep, listToTree, treeToList } from '@vben/utils';

import { SyncOutlined } from '@antdv-next/icons';
import { Empty, Input, Skeleton, SpaceCompact, Tree } from 'antdv-next';

import { getDeptTree } from '#/api/system/user';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  showSearch: true,
  api: getDeptTree,
});

const emit = defineEmits<{
  /**
   * 点击刷新按钮的事件
   */
  reload: [];
  /**
   * 点击节点的事件
   */
  select: [keys: string[]];
}>();

interface Props {
  /**
   * 调用的接口
   */
  api?: () => Promise<DeptTree[]>;
  /**
   * 是否显示搜索框
   */
  showSearch?: boolean;
}

const selectDeptId = defineModel('selectDeptId', {
  required: true,
  type: Array as PropType<string[]>,
});

const searchValue = defineModel('searchValue', {
  type: String,
  default: '',
});

/** 部门数据源 */
type DeptTreeArray = DeptTree[];
const deptTreeArray = ref<DeptTreeArray>([]);
/** 骨架屏加载 */
const showTreeSkeleton = ref<boolean>(true);

async function loadTree() {
  showTreeSkeleton.value = true;
  searchValue.value = '';
  selectDeptId.value = [];

  const ret = await props.api();

  deptTreeArray.value = ret;
  showTreeSkeleton.value = false;
}

const deptTreeComputed = computed(() => {
  if (!searchValue.value) {
    return deptTreeArray.value;
  }
  const toTree: DeptTreeArray = treeToList(cloneDeep(deptTreeArray.value), {
    id: 'id',
    pid: 'parentId',
  });
  toTree.forEach((i) => (i.children = []));
  const filteredTree = toTree.filter((item: DeptTree) =>
    item.label.toUpperCase().includes(searchValue.value.toUpperCase()),
  );
  return listToTree(filteredTree, {
    id: 'id',
    pid: 'parentId',
  });
});

async function handleReload() {
  await loadTree();
  emit('reload');
}

onMounted(loadTree);

function handleSelect(keys: Key[]) {
  emit('select', keys as string[]);
}
</script>

<template>
  <div :class="$attrs.class">
    <Skeleton
      :loading="showTreeSkeleton"
      :paragraph="{ rows: 8 }"
      active
      class="p-[8px]"
    >
      <div
        class="flex h-full flex-col overflow-y-auto rounded-lg bg-background"
      >
        <!-- 固定在顶部 必须加上bg-background背景色 否则会产生'穿透'效果 -->
        <div
          v-if="showSearch"
          class="sticky left-0 top-0 z-100 bg-background p-[8px]"
        >
          <SpaceCompact class="w-full">
            <Input
              v-model:value="searchValue"
              :placeholder="$t('pages.common.search')"
              size="small"
              allow-clear
            />
            <a-button size="small" @click="handleReload">
              <SyncOutlined class="text-primary" />
            </a-button>
          </SpaceCompact>
        </div>
        <div class="h-full overflow-x-hidden px-[8px]">
          <Tree
            v-bind="$attrs"
            v-if="deptTreeComputed.length > 0"
            v-model:selected-keys="selectDeptId"
            :class="$attrs.class"
            :field-names="{ title: 'label', key: 'id' }"
            :show-line="{ showLeafIcon: false }"
            :tree-data="deptTreeComputed"
            :virtual="false"
            default-expand-all
            @select="handleSelect"
            :styles="{
              item: {
                '--ant-tree-node-selected-bg':
                  'var(--ant-color-primary-bg-hover)',
              },
            }"
          >
            <template #titleRender="{ label }">
              <span v-if="label.includes(searchValue)">
                {{ label.substring(0, label.indexOf(searchValue)) }}
                <span class="text-primary">{{ searchValue }}</span>
                {{
                  label.substring(
                    label.indexOf(searchValue) + searchValue.length,
                  )
                }}
              </span>
              <span v-else>{{ label }}</span>
            </template>
          </Tree>
          <!-- 仅本人数据权限 可以考虑直接不显示 -->
          <div v-else class="mt-5">
            <Empty
              :image="Empty.PRESENTED_IMAGE_SIMPLE"
              description="无部门数据"
            />
          </div>
        </div>
      </div>
    </Skeleton>
  </div>
</template>
