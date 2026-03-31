<script setup lang="tsx">
import type { VxeGridProps } from '#/adapter/vxe-table';

import { nextTick, onMounted } from 'vue';

import { JsonPreview } from '@vben/common-ui';

import { Button, Input, InputNumber, Select, Space } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

/**
 * 与antdv集成 可以参考这里使用自定义插槽
 * https://vxetable.cn/other4/#/table/other/antd
 */

const options = ['前端佬', '后端佬', '组长'].map((item) => ({
  label: item,
  value: item,
}));

const gridOptions: VxeGridProps = {
  editConfig: {
    // 触发编辑的方式
    trigger: 'click',
    // 触发编辑的模式
    mode: 'row',
    showStatus: true,
  },
  border: true,
  rowConfig: {
    drag: true,
  },
  checkboxConfig: {},
  editRules: {
    name: [{ required: true, message: '请输入姓名' }],
    age: [
      { required: true, message: '请输入年龄' },
      { type: 'number', min: 0, max: 200, message: '年龄必须为1-200' },
    ],
    job: [{ required: true, message: '请选择工作' }],
    phone: [
      {
        required: true,
        message: '请输入正确的手机号',
        pattern: /^1[3-9]\d{9}$/,
      },
    ],
  },
  columns: [
    {
      type: 'checkbox',
      width: 60,
    },
    {
      dragSort: true,
      title: '排序',
      width: 60,
    },
    {
      field: 'name',
      title: '姓名',
      align: 'left',
      editRender: {},
      slots: {
        default: ({ row }) => {
          if (!row.name) {
            return <span class="text-red-500">未填写</span>;
          }
          return <span>{row.name}</span>;
        },
        edit: (props) => {
          const { row, $grid } = props;

          return (
            <Input
              onChange={() => $grid?.updateStatus(props)}
              placeholder={'请输入'}
              v-model:value={row.name}
            />
          );
        },
      },
    },
    {
      field: 'age',
      title: '年龄',
      align: 'left',
      editRender: {},
      slots: {
        default: ({ row }) => {
          if (!row.age) {
            return <span class="text-red-500">未填写</span>;
          }
          return <span>{row.age}</span>;
        },
        edit: (props) => {
          const { row, $grid } = props;
          return (
            <InputNumber
              class="w-full"
              onChange={() => $grid?.updateStatus(props)}
              placeholder={'请输入'}
              v-model:value={row.age}
            />
          );
        },
      },
    },
    {
      field: 'job',
      title: '工作',
      align: 'left',
      editRender: {},
      slots: {
        default: ({ row }) => {
          if (!row.job) {
            return <span class="text-red-500">未选择</span>;
          }
          return <span>{row.job}</span>;
        },
        edit: (props) => {
          const { row, $grid } = props;

          return (
            <Select
              allowClear={true}
              class="w-full"
              onChange={() => $grid?.updateStatus(props)}
              options={options}
              placeholder={'请选择'}
              v-model:value={row.job}
            />
          );
        },
      },
    },
    {
      field: 'phone',
      title: '手机号',
      align: 'left',
      editRender: {},
      slots: {
        default: ({ row }) => {
          if (!row.phone) {
            return <span class="text-red-500">未填写</span>;
          }
          return <span>{row.phone}</span>;
        },
        edit: (props) => {
          const { row, $grid } = props;
          // 需要手动调用$grid?.updateStatus来更新校验状态
          return (
            <Input
              onChange={() => $grid?.updateStatus(props)}
              placeholder={'请输入'}
              v-model:value={row.phone}
            />
          );
        },
      },
    },
    {
      field: 'action',
      title: '操作',
      width: 100,
      slots: {
        default: ({ $table, row }) => {
          function handleDelete() {
            $table.remove(row);
          }
          return (
            <Button danger={true} onClick={handleDelete} size={'small'}>
              删除
            </Button>
          );
        },
      },
    },
  ],
  // height: 500,
  keepSource: true,
  pagerConfig: {
    enabled: false,
  },
  proxyConfig: {
    enabled: true,
  },
  toolbarConfig: {
    enabled: false,
  },
  showOverflow: false,
  cellConfig: {
    // 保持高度 防止进入编辑模式会有一个撑开的效果
    height: 50,
  },
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  gridOptions,
});

onMounted(async () => {
  const data = [
    {
      name: '张三',
      age: 18,
      job: '前端佬',
      phone: '',
    },
    {
      name: '李四',
      age: 19,
      job: '后端佬',
      phone: '',
    },
    {
      name: '王五',
      age: 20,
      job: '组长',
      phone: '',
    },
  ];
  await nextTick();
  await tableApi.grid.loadData(data);
});
async function handleAdd() {
  const record = { name: '', age: undefined, job: undefined };
  const { row: newRow } = await tableApi.grid.insert(record);
  await tableApi.grid.setEditCell(newRow, 'name');
}

async function handleRemove() {
  await tableApi.grid.removeCheckboxRow();
}

async function handleValidate() {
  const result = await tableApi.grid.validate(true);
  console.log(result);
  if (result) {
    window.message.error('校验失败');
  } else {
    window.message.success('校验成功');
  }
}

function getData() {
  const data = tableApi.grid.getTableData();
  const { fullData } = data;
  console.log(fullData);
  window.modal.info({
    title: '提示',
    content: (
      <div class="max-h-[350px] overflow-y-auto">
        <JsonPreview data={fullData} />
      </div>
    ),
  });
}
</script>

<template>
  <div>
    <div class="mb-4">
      <!--
      https://github.com/x-extends/vxe-table/issues/1752#issuecomment-1623165630
      因为编辑表格判断点击单元格之外的元素会取消编辑状态，此时需要事件拦截，
      vxe-table 提供了更加简单的方法，
      只需要在弹出框（不属于单元格之内的元素）添加class=vxe-table--ignore-clear 即可，
      以 element-plus el-select 为例，设置 popper-class 为 "vxe-table--ignore-clear" 可以解决。
      需要更高级拦截方法可以参考 https://vxetable.cn/#/table/interceptor/api。
      -->
      <Space class="vxe-table--ignore-clear">
        <a-button @click="getData">获取表格数据</a-button>
        <a-button @click="handleValidate">校验</a-button>
        <a-button danger @click="handleRemove"> 删除勾选 </a-button>
        <a-button type="primary" @click="handleAdd"> 新增一行 </a-button>
      </Space>
    </div>
    <BasicTable />
  </div>
</template>
