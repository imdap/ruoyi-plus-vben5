import type { DictType } from './dict-type-model';

import type { ID, IDS, PageQuery, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

enum Api {
  dictOptionSelectList = '/system/dict/type/optionselect',
  dictTypeExport = '/system/dict/type/export',
  dictTypeList = '/system/dict/type/list',
  dictTypeRefreshCache = '/system/dict/type/refreshCache',
  root = '/system/dict/type',
}

/**
 * 获取字典类型列表
 * @param params 请求参数
 * @returns list
 */
export function dictTypeList(params?: PageQuery) {
  return alovaInstance.get<PageResult<DictType>>(Api.dictTypeList, { params });
}

/**
 * 导出字典类型列表
 * @param data 表单参数
 * @returns blob
 */
export function dictTypeExport(data: Partial<DictType>) {
  return commonExport(Api.dictTypeExport, data);
}

/**
 * 删除字典类型
 * @param dictIds 字典类型id数组
 * @returns void
 */
export function dictTypeRemove(dictIds: IDS) {
  return alovaInstance.deleteWithMsg<void>(`${Api.root}/${dictIds}`);
}

/**
 * 刷新字典缓存
 * @returns void
 */
export function refreshDictTypeCache() {
  return alovaInstance.deleteWithMsg<void>(Api.dictTypeRefreshCache);
}

/**
 * 新增
 * @param data 表单参数
 * @returns void
 */
export function dictTypeAdd(data: Partial<DictType>) {
  return alovaInstance.postWithMsg<void>(Api.root, data);
}

/**
 * 修改
 * @param data 表单参数
 * @returns void
 */
export function dictTypeUpdate(data: Partial<DictType>) {
  return alovaInstance.putWithMsg<void>(Api.root, data);
}

/**
 * 查询详情
 * @param dictId 字典类型id
 * @returns 信息
 */
export function dictTypeInfo(dictId: ID) {
  return alovaInstance.get<DictType>(`${Api.root}/${dictId}`);
}

/**
 * 这个在ele用到 v5用不上
 * 下拉框  返回值和list一样
 * @returns options
 */
export function dictOptionSelectList() {
  return alovaInstance.get<DictType[]>(Api.dictOptionSelectList);
}
