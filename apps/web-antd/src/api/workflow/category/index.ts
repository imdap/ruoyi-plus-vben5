import type {
  CategoryForm,
  CategoryQuery,
  CategoryTree,
  CategoryVO,
} from './model';

import type { ID, IDS } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/**
 * 获取流程分类树列表
 * @returns tree
 */
export function categoryTree() {
  return alovaInstance.get<CategoryTree[]>('/workflow/category/categoryTree');
}

/**
 * 查询流程分类列表
 * @param params
 * @returns 流程分类列表
 */
export function categoryList(params?: CategoryQuery) {
  return alovaInstance.get<CategoryVO[]>(`/workflow/category/list`, { params });
}

/**
 * 查询流程分类详情
 * @param id id
 * @returns 流程分类详情
 */
export function categoryInfo(id: ID) {
  return alovaInstance.get<CategoryVO>(`/workflow/category/${id}`);
}

/**
 * 新增流程分类
 * @param data
 * @returns void
 */
export function categoryAdd(data: CategoryForm) {
  return alovaInstance.postWithMsg<void>('/workflow/category', data);
}

/**
 * 更新流程分类
 * @param data
 * @returns void
 */
export function categoryUpdate(data: CategoryForm) {
  return alovaInstance.putWithMsg<void>('/workflow/category', data);
}

/**
 * 删除流程分类
 * @param id id
 * @returns void
 */
export function categoryRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/workflow/category/${id}`);
}
