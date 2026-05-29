import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { DictEnum } from '@vben/constants';
import { getPopupContainer } from '@vben/utils';

import { Tag, Tooltip } from 'antdv-next';

import { getDictOptions } from '#/utils/dict';
import { renderDict, renderDictTags } from '#/utils/render';

function renderList(list: string[], allText: string) {
  const accessPathList = (list as string[]) ?? [];
  if (accessPathList.length === 0) {
    return <Tag color="success">{allText}</Tag>;
  }
  return (
    <Tooltip
      title={
        <div class="flex flex-col px-2">
          {accessPathList.map((i) => (
            <span key={i}>{i}</span>
          ))}
        </div>
      }
    >
      <Tag color="processing">
        {accessPathList[0]} {accessPathList.length > 1 ? '等' : ''}
      </Tag>
    </Tooltip>
  );
}

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'clientKey',
    label: '客户端key',
  },
  {
    component: 'Input',
    fieldName: 'clientSecret',
    label: '客户端密钥',
  },
  {
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.SYS_NORMAL_DISABLE),
    },
    fieldName: 'status',
    label: '状态',
  },
];

export const columns: VxeGridProps['columns'] = [
  { type: 'checkbox', width: 60 },
  {
    title: '客户端ID',
    field: 'clientId',
    showOverflow: true,
  },
  {
    title: '客户端key',
    field: 'clientKey',
  },
  {
    title: '客户端密钥',
    field: 'clientSecret',
  },
  {
    title: '授权类型',
    field: 'grantTypeList',
    slots: {
      default: ({ row }) => {
        if (!row.grantTypeList) {
          return '无';
        }
        return renderDictTags(row.grantTypeList, getDictOptions(DictEnum.SYS_GRANT_TYPE), true, 4);
      },
    },
  },
  {
    title: '设备类型',
    field: 'deviceType',
    slots: {
      default: ({ row }) => {
        return renderDict(row.deviceType, DictEnum.SYS_DEVICE_TYPE);
      },
    },
  },
  {
    title: 'token活跃时间',
    field: 'activeTimeout',
    formatter({ row }) {
      return `${row.activeTimeout}秒`;
    },
  },
  {
    title: 'token超时时间',
    field: 'timeout',
    formatter({ row }) {
      return `${row.timeout}秒`;
    },
  },
  {
    title: '允许访问路径',
    field: 'accessPath',
    showOverflow: true,
    slots: {
      default: ({ row }) => {
        const accessPathList = (row.accessPathList as string[]) ?? [];
        return renderList(accessPathList, '全部路径');
      },
    },
  },
  {
    title: 'IP白名单',
    field: 'ipWhitelist',
    showOverflow: true,
    slots: {
      default: ({ row }) => {
        const ipWhitelist = (row.ipWhitelistList as string[]) ?? [];
        return renderList(ipWhitelist, '全部IP');
      },
    },
  },
  {
    title: '状态',
    field: 'status',
    slots: {
      default: 'status',
    },
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    resizable: false,
    width: 'auto',
  },
];

export const drawerSchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
    fieldName: 'id',
    label: 'id',
  },
  {
    component: 'Input',
    componentProps: {
      disabled: true,
    },
    dependencies: {
      show: () => false,
      triggerFields: [''],
    },
    fieldName: 'clientId',
    label: '客户端ID',
  },
  {
    component: 'Input',
    fieldName: 'clientKey',
    label: '客户端key',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'clientSecret',
    label: '客户端密钥',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
      mode: 'multiple',
      optionFilterProp: 'label',
      options: getDictOptions(DictEnum.SYS_GRANT_TYPE),
    },
    fieldName: 'grantTypeList',
    label: '授权类型',
    rules: 'selectRequired',
  },
  {
    component: 'Select',
    componentProps: {
      allowClear: false,
      getPopupContainer,
      options: getDictOptions(DictEnum.SYS_DEVICE_TYPE),
    },
    fieldName: 'deviceType',
    label: '设备类型',
    rules: 'selectRequired',
  },
  {
    component: 'Select',
    help: '输入后回车确认，可粘贴多个自动拆分；为空表示允许访问所有接口路径',
    componentProps: {
      getPopupContainer,
      mode: 'tags',
      open: false,
      placeholder: '/app/**',
      tokenSeparators: [',', ';', ' ', '\n'],
    },
    fieldName: 'accessPath',
    label: '允许访问路径',
  },
  {
    component: 'Select',
    help: '支持精确IP、通配符和CIDR；输入后回车确认，可粘贴多个自动拆分；为空表示允许所有IP',
    componentProps: {
      getPopupContainer,
      mode: 'tags',
      open: false,
      placeholder: '127.0.0.1',
      tokenSeparators: [',', ';', ' ', '\n'],
    },
    fieldName: 'ipWhitelist',
    label: 'IP白名单',
  },
  {
    component: 'InputNumber',
    componentProps: {
      addonAfter: '秒',
      placeholder: '请输入',
      style: {
        '--ant-border-radius': 'var(--radius) 0 0 var(--radius)',
      },
    },
    defaultValue: 1800,
    fieldName: 'activeTimeout',
    formItemClass: 'col-span-2 lg:col-span-1',
    help: '指定时间无操作则过期(单位：秒), 默认30分钟(1800秒)',
    label: 'Token活跃超时时间',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      addonAfter: '秒',
      style: {
        '--ant-border-radius': 'var(--radius) 0 0 var(--radius)',
      },
    },
    defaultValue: 604_800,
    fieldName: 'timeout',
    formItemClass: 'col-span-2 lg:col-span-1 ',
    help: '指定时间必定过期(单位：秒)，默认七天(604800秒)',
    label: 'Token固定超时时间',
    rules: 'required',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      options: getDictOptions(DictEnum.SYS_NORMAL_DISABLE),
      optionType: 'button',
    },
    defaultValue: '0',
    fieldName: 'status',
    label: '状态',
  },
];
