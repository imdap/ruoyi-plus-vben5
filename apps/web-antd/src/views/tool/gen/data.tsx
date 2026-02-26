import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Select',
    fieldName: 'dataName',
    label: '数据源',
    defaultValue: '',
    componentProps: {
      allowClear: false,
    },
  },
  {
    component: 'Input',
    fieldName: 'tableName',
    label: '表名称',
  },
  {
    component: 'Input',
    fieldName: 'tableComment',
    label: '表描述',
  },
  {
    component: 'RangePicker',
    fieldName: 'createTime',
    label: '创建时间',
  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    field: 'tableName',
    title: '表名称',
  },
  {
    field: 'tableComment',
    title: '表描述',
  },
  {
    field: 'className',
    title: '实体类',
  },
  {
    field: 'createTime',
    title: '创建时间',
  },
  {
    field: 'updateTime',
    title: '更新时间',
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    width: 300,
  },
];

export const iconMap = [
  { key: 'java', value: <span class="icon-[skill-icons--java-light]"></span> },
  { key: 'xml', value: <span class="icon-[tabler--file-type-xml]"></span> },
  { key: 'sql', value: <span class="icon-[carbon--sql]"></span> },
  { key: 'ts', value: <span class="icon-[skill-icons--typescript]"></span> },
  { key: 'vue', value: <span class="icon-[logos--vue]"></span> },
  {
    key: 'folder',
    value: <span class="icon-[flat-color-icons--folder]"></span>,
  },
];

export const defaultFileIcon = (
  <span class="icon-[flat-color-icons--folder]"></span>
);
export const defaultFolderIcon = (
  <span class="icon-[flat-color-icons--folder]"></span>
);
