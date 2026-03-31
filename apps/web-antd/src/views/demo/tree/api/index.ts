import type { TreeForm, TreeQuery, TreeVO } from './model';

import type { ID, IDS } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/**
 * 查询测试树列表
 * @param params
 * @returns 测试树列表
 */
export function treeList(params?: TreeQuery) {
  return alovaInstance.get<TreeVO[]>('/demo/tree/list', { params });
}

/**
 * 查询测试树详情
 * @param id id
 * @returns 测试树详情
 */
export function treeInfo(id: ID) {
  return alovaInstance.get<TreeVO>(`/demo/tree/${id}`);
}

/**
 * 新增测试树
 * @param data
 * @returns void
 */
export function treeAdd(data: TreeForm) {
  return alovaInstance.postWithMsg<void>('/demo/tree', data);
}

/**
 * 更新测试树
 * @param data
 * @returns void
 */
export function treeUpdate(data: TreeForm) {
  return alovaInstance.putWithMsg<void>('/demo/tree', data);
}

/**
 * 删除测试树
 * @param id id
 * @returns void
 */
export function treeRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/demo/tree/${id}`);
}
