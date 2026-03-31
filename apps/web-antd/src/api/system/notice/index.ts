import type { Notice } from './model';

import type { ID, IDS, PageQuery } from '#/api/common';

import { alovaInstance } from '#/utils/http';

enum Api {
  noticeList = '/system/notice/list',
  root = '/system/notice',
}

/**
 * 通知公告分页
 * @param params 分页参数
 * @returns 分页结果
 */
export function noticeList(params?: PageQuery) {
  return alovaInstance.get<Notice[]>(Api.noticeList, { params });
}

/**
 * 通知公告详情
 * @param noticeId id
 * @returns 详情
 */
export function noticeInfo(noticeId: ID) {
  return alovaInstance.get<Notice>(`${Api.root}/${noticeId}`);
}

/**
 * 通知公告新增
 * @param data 参数
 */
export function noticeAdd(data: Partial<Notice>) {
  return alovaInstance.postWithMsg<void>(Api.root, data);
}

/**
 * 通知公告更新
 * @param data 参数
 */
export function noticeUpdate(data: any) {
  return alovaInstance.putWithMsg<void>(Api.root, data);
}

/**
 * 通知公告删除
 * @param noticeIds ids
 */
export function noticeRemove(noticeIds: IDS) {
  return alovaInstance.deleteWithMsg<void>(`${Api.root}/${noticeIds}`);
}
