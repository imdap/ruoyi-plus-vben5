import type { UpdatePasswordParam, UserProfile } from './model';

import { alovaInstance } from '#/utils/http';

enum Api {
  root = '/system/user/profile',
  updatePassword = '/system/user/profile/updatePwd',
}

/**
 * 用户个人主页信息
 * @returns userInformation
 */
export function userProfile() {
  return alovaInstance.get<UserProfile>(Api.root);
}

/**
 * 更新用户个人主页信息
 * @param data
 * @returns void
 */
export function userProfileUpdate(data: any) {
  return alovaInstance.putWithMsg<void>(Api.root, data);
}

/**
 * 用户修改密码 (需要加密)
 * @param data
 * @returns void
 */
export function userUpdatePassword(data: UpdatePasswordParam) {
  return alovaInstance.putWithMsg<void>(Api.updatePassword, data, {
    encrypt: true,
  });
}

