import type { LeaveForm, LeaveQuery, LeaveVO } from './model';

import type { ID, IDS, PageResult } from '#/api/common';

import { commonExport } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

/**
 * 查询请假申请列表
 * @param params
 * @returns 请假申请列表
 */
export function leaveList(params?: LeaveQuery) {
  return alovaInstance.get<PageResult<LeaveVO>>('/workflow/leave/list', {
    params,
  });
}

/**
 * 导出请假申请列表
 * @param params
 * @returns 请假申请列表
 */
export function leaveExport(params?: LeaveQuery) {
  return commonExport('/workflow/leave/export', params ?? {});
}

/**
 * 查询请假申请详情
 * @param id id
 * @returns 请假申请详情
 */
export function leaveInfo(id: ID) {
  return alovaInstance.get<LeaveVO>(`/workflow/leave/${id}`);
}

/**
 * 新增请假申请
 * @param data
 * @returns void
 */
export function leaveAdd(data: LeaveForm) {
  return alovaInstance.postWithMsg<LeaveVO>('/workflow/leave', data);
}

/**
 * 更新请假申请
 * @param data
 * @returns void
 */
export function leaveUpdate(data: LeaveForm) {
  return alovaInstance.putWithMsg<LeaveVO>('/workflow/leave', data);
}

/**
 * 删除请假申请
 * @param id id
 * @returns void
 */
export function leaveRemove(id: ID | IDS) {
  return alovaInstance.deleteWithMsg<void>(`/workflow/leave/${id}`);
}

/**
 * 提交 & 发起流程(后端发起)
 * @param data data
 * @returns void
 */
export function submitAndStartWorkflow(data: LeaveForm) {
  return alovaInstance.postWithMsg<void>(
    '/workflow/leave/submitAndFlowStart',
    data,
  );
}
