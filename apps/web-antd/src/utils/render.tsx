import type { Component as ComponentType } from 'vue';

import type { DictData } from '#/api/system/dict/dict-data-model';
import type { DictFallback } from '#/components/dict/src/type';

import { h } from 'vue';

import { JsonPreview } from '@vben/common-ui';
import { IconifyIcon, VbenIcon } from '@vben/icons';
import { cn } from '@vben/utils';

import { Tag } from 'antdv-next';

import { DictTag } from '#/components/dict';

import { getDictOptions } from './dict';

/**
 * 渲染标签
 * @param text 文字
 * @param color 颜色
 * @returns render
 */
function renderTag(text: string, color?: string) {
  return <Tag color={color}>{text}</Tag>;
}

/**
 *
 * @param tags 标签list
 * @param wrap 是否换行显示
 * @param [gap] 间隔
 * @returns render
 */
export function renderTags(tags: string[], wrap = false, gap = 1) {
  return (
    <div
      class={['flex', wrap ? 'flex-col' : 'flex-row']}
      style={{ gap: `${gap}px` }}
    >
      {tags.map((tag, index) => {
        return <div key={index}>{renderTag(tag)}</div>;
      })}
    </div>
  );
}

/**
 *
 * @param json json对象 接受object/string类型
 * @returns json预览
 */
export function renderJsonPreview(json: any) {
  if (typeof json !== 'object' && typeof json !== 'string') {
    return <span>{json}</span>;
  }
  if (typeof json === 'object') {
    return <JsonPreview class="break-normal" data={json} />;
  }
  try {
    const obj = JSON.parse(json);
    // 基本数据类型可以被转为json
    if (typeof obj !== 'object') {
      return <span>{obj}</span>;
    }
    return <JsonPreview class="break-normal" data={obj} />;
  } catch {
    return <span>{json}</span>;
  }
}

/**
 * iconify图标
 * @param icon icon名称
 * @returns render
 */
export function renderIcon(icon: string) {
  return <IconifyIcon icon={icon}></IconifyIcon>;
}

/**
 * httpMethod标签
 * @param type method类型
 * @returns render
 */
export function renderHttpMethodTag(type: string) {
  const method = type.toUpperCase();
  const colors: { [key: string]: string } = {
    DELETE: 'red',
    GET: 'green',
    POST: 'blue',
    PUT: 'orange',
  };

  const color = colors[method] ?? 'default';
  const title = `${method}请求`;

  return <Tag color={color}>{title}</Tag>;
}

export function renderDictTag(value: number | string, dicts: DictData[]) {
  return <DictTag dicts={dicts} value={value}></DictTag>;
}

/**
 * render多个dictTag
 * @param value key数组 string[]类型
 * @param dicts 字典数组
 * @param wrap 是否需要换行显示
 * @param [gap] 间隔
 * @returns render
 */
export function renderDictTags(
  value: string[],
  dicts: DictData[],
  wrap = true,
  gap = 1,
) {
  if (!Array.isArray(value)) {
    return <div>{value}</div>;
  }
  return (
    <div
      class={['flex', wrap ? 'flex-col' : 'flex-row']}
      style={{ gap: `${gap}px` }}
    >
      {value.map((item, index) => {
        return <div key={index}>{renderDictTag(item, dicts)}</div>;
      })}
    </div>
  );
}

export interface RenderDictOptions {
  fallback?: DictFallback;
}

/**
 * 显示字典标签 一般是table使用
 * @param value 值
 * @param dictName dictName
 * @returns tag
 */
export function renderDict(
  value: number | string,
  dictName: string,
  options?: RenderDictOptions,
) {
  const { fallback } = options ?? {};
  const dictInfo = getDictOptions(dictName);
  return <DictTag dicts={dictInfo} fallback={fallback} value={value}></DictTag>;
}

export function renderIconSpan(
  icon: ComponentType,
  value: string,
  center = false,
  marginLeft = '2px',
) {
  const justifyCenter = center ? 'justify-center' : '';

  return (
    <span class={['flex', 'items-center', justifyCenter]}>
      {h(icon)}
      <span style={{ marginLeft }}>{value}</span>
    </span>
  );
}

const osOptions = [
  { icon: 'icon-[devicon--windows8]', value: 'windows' },
  { icon: 'icon-[wpf--macos]', value: 'osx' },
  { icon: 'icon-[devicon--linux]', value: 'linux' },
  { icon: 'icon-[flat-color-icons--android-os]', value: 'android' },
  { icon: 'icon-[majesticons--iphone-x-apps-line]', value: 'ios' },
];

const DefaultOsIcon = 'icon-[ic--outline-computer]';

/**
 * 浏览器图标
 * cn.hutool.http.useragent -> browers
 */
const browserOptions = [
  { icon: 'icon-[logos--chrome]', value: 'chrome' },
  { icon: 'icon-[logos--microsoft-edge]', value: 'edge' },
  { icon: 'icon-[logos--firefox]', value: 'firefox' },
  { icon: 'icon-[logos--opera]', value: 'opera' },
  { icon: 'icon-[logos--safari]', value: 'safari' },
  { icon: 'icon-[mdi--wechat]', value: 'micromessenger' },
  { icon: 'icon-[mdi--wechat]', value: 'windowswechat' },
  { icon: 'icon-[logos--quarkus-icon]', value: 'quark' },
  { icon: 'icon-[mdi--wechat]', value: 'wxwork' },
  { icon: 'svg:qq', value: 'qq', type: 'offline' },
  { icon: 'icon-[ri--dingding-line]', value: 'dingtalk' },
  { icon: 'icon-[arcticons--uc-browser]', value: 'uc' },
  { icon: 'icon-[ri--baidu-fill]', value: 'baidu' },
];

const DefaultBrowserIcon = 'icon-[ph--browser-duotone]';

export function renderOsIcon(os: string, className?: string) {
  if (!os) {
    return;
  }
  let current = osOptions.find((item) =>
    os.toLocaleLowerCase().includes(item.value),
  );
  // windows要特殊处理
  if (os.toLocaleLowerCase().includes('windows')) {
    current = osOptions[0];
  }
  const icon = current ? current.icon : DefaultOsIcon;
  return <span class={cn(icon, className)} />;
}

export function renderBrowserIcon(browser: string, className?: string) {
  if (!browser) {
    return;
  }
  const current = browserOptions.find((item) =>
    browser.toLocaleLowerCase().includes(item.value),
  );
  // TODO: 需要优化
  if (!current) {
    return <span class={cn(DefaultBrowserIcon, className)} />;
  }
  // support offline icon
  const icon = current.icon;
  if (current.type === 'offline') {
    return <VbenIcon icon={icon} />;
  }
  return <span class={cn(icon, className)} />;
}
