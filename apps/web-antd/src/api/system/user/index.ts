import type {
  DeptTree,
  ResetPwdParam,
  User,
  UserImportParam,
  UserInfoResponse,
} from './model';

import type { ID, IDS, PageQuery, PageResult } from '#/api/common';

import { commonExport, ContentTypeEnum } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

enum Api {
  deptTree = '/system/user/deptTree',
  listDeptUsers = '/system/user/list/dept',
  root = '/system/user',
  userAuthRole = '/system/user/authRole',
  userExport = '/system/user/export',
  userImport = '/system/user/importData',
  userImportTemplate = '/system/user/importTemplate',
  userList = '/system/user/list',
  userResetPassword = '/system/user/resetPwd',
  userStatusChange = '/system/user/changeStatus',
}

/**
 *  获取用户列表
 * @param params
 * @returns User
 */
export function userList(params?: PageQuery) {
  return alovaInstance.get<PageResult<User>>(Api.userList, { params });
}

/**
 * 导出excel
 * @param data data
 * @returns blob
 */
export function userExport(data: Partial<User>) {
  return commonExport(Api.userExport, data);
}

/**
 * 从excel导入用户
 * @param data
 * @returns void
 */
export function userImportData(data: UserImportParam) {
  return alovaInstance.post<{ code: number; msg: string }>(
    Api.userImport,
    data,
    {
      headers: {
        'Content-Type': ContentTypeEnum.FORM_DATA,
      },
      isTransformResponse: false,
    },
  );
}

/**
 * 下载用户导入模板
 * @returns blob
 */
export function downloadImportTemplate() {
  return alovaInstance.post<Blob>(
    Api.userImportTemplate,
    {},
    {
      isTransformResponse: false,
      responseType: 'blob',
    },
  );
}

/**
 * 可以不传ID  返回部门和角色options 需要获得原始数据
 * 不传ID时一定要带最后的/
 * @param userId 用户ID
 * @returns 用户信息
 */
export function findUserInfo(userId?: ID) {
  const url = userId ? `${Api.root}/${userId}` : `${Api.root}/`;
  return alovaInstance.get<UserInfoResponse>(url);
}

/**
 * 新增用户
 * @param data data
 * @returns void
 */
export function userAdd(data: Partial<User>) {
  return alovaInstance.postWithMsg<void>(Api.root, data);
}

/**
 * 更新用户
 * @param data data
 * @returns void
 */
export function userUpdate(data: Partial<User>) {
  return alovaInstance.putWithMsg<void>(Api.root, data);
}

/**
 * 更新用户状态
 * @param data data
 * @returns void
 */
export function userStatusChange(data: Partial<User>) {
  const requestData = {
    userId: data.userId,
    status: data.status,
  };
  return alovaInstance.putWithMsg<void>(Api.userStatusChange, requestData);
}

/**
 * 删除用户
 * @param userIds 用户ID数组
 * @returns void
 */
export function userRemove(userIds: IDS) {
  return alovaInstance.deleteWithMsg<void>(`${Api.root}/${userIds}`);
}

/**
 * 重置用户密码 需要加密
 * @param data
 * @returns void
 */
export function userResetPassword(data: ResetPwdParam) {
  return alovaInstance.putWithMsg<void>(Api.userResetPassword, data, {
    encrypt: true,
  });
}

/**
 * 这个方法未调用过
 * @param userId
 * @returns void
 */
export function getUserAuthRole(userId: ID) {
  return alovaInstance.get(`${Api.userAuthRole}/${userId}`);
}

/**
 * 这个方法未调用过
 * @param userId
 * @returns void
 */
export function userAuthRoleUpdate(userId: ID, roleIds: number[]) {
  return alovaInstance.putWithMsg(Api.userAuthRole, { roleIds, userId });
}

/**
 * 获取部门树
 * @returns 部门树数组
 */
export function getDeptTree() {
  return alovaInstance.get<DeptTree[]>(Api.deptTree);
}

/**
 * 获取部门下的所有用户信息
 */
export function listUserByDeptId(deptId: ID) {
  return alovaInstance.get<User[]>(`${Api.listDeptUsers}/${deptId}`);
}
