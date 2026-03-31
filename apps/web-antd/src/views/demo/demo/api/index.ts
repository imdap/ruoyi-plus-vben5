import type { DemoForm, DemoQuery, DemoVO } from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
 * 查询测试单表列表
 * @param params
 * @returns 测试单表列表
 */
export function demoList(params?: DemoQuery) {
  return alovaInstance.get<PageResult<DemoVO>>('/demo/demo/list', { params });
}

/**
 * 导出测试单表列表
 * @param params
 * @returns 测试单表列表
 */
export function demoExport(params?: DemoQuery) {
  return commonExport('/demo/demo/export', params ?? {});
}

/**
 * 查询测试单表详情
 * @param id id
 * @returns 测试单表详情
 */
export function demoInfo(id: ID) {
  return alovaInstance.get<DemoVO>(`/demo/demo/${id}`);
}

/**
 * 新增测试单表
 * @param data
 * @returns void
 */
export function demoAdd(data: DemoForm) {
  return alovaInstance.postWithMsg<void>('/demo/demo', data);
}

/**
 * 更新测试单表
 * @param data
 * @returns void
 */
export function demoUpdate(data: DemoForm) {
  return alovaInstance.putWithMsg<void>('/demo/demo', data);
}

/**
 * 删除测试单表
 * @param id id
 * @returns void
 */
export function demoRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/demo/demo/${id}`);
}
