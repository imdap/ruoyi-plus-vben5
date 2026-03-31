import type { OssFile } from './model';

import type { ID, IDS, PageQuery, PageResult } from '#/api/common';

import { ContentTypeEnum } from '#/api/helper';
import { alovaInstance } from '#/utils/http';

enum Api {
  ossDownload = '/resource/oss/download',
  ossInfo = '/resource/oss/listByIds',
  ossList = '/resource/oss/list',
  ossUpload = '/resource/oss/upload',
  root = '/resource/oss',
}

/**
 * 文件list
 * @param params 参数
 * @returns 分页
 */
export function ossList(params?: PageQuery) {
  return alovaInstance.get<PageResult<OssFile>>(Api.ossList, { params });
}

/**
 * 查询文件信息 返回为数组
 * @param ossIds id数组
 * @returns 信息数组
 */
export function ossInfo(ossIds: ID | IDS) {
  return alovaInstance.get<OssFile[]>(`${Api.ossInfo}/${ossIds}`);
}

/**
 * @deprecated 使用apps/web-antd/src/api/core/upload.ts uploadApi方法
 * @param file 文件
 * @returns void
 */
export function ossUpload(file: Blob | File) {
  const formData = new FormData();
  formData.append('file', file);
  return alovaInstance.postWithMsg(Api.ossUpload, formData, {
    headers: { 'Content-Type': ContentTypeEnum.FORM_DATA },
    timeout: 30 * 1000,
  });
}

/**
 * 下载文件  返回为二进制
 * @param ossId ossId
 * @returns blob
 */
export function ossDownload(ossId: ID) {
  return alovaInstance.get<Blob>(`${Api.ossDownload}/${ossId}`, {
    responseType: 'blob',
    timeout: 30 * 1000,
    isTransformResponse: false,
  });
}

/**
 * 在使用浏览器原生下载前检测是否登录
 * 这里的方案为请求一次接口 如果登录超时会走到response的401逻辑
 * 如果没有listByIds的权限 也不会弹出无权限提示
 * 仅仅是为了检测token是否有效使用
 *
 * @returns void
 */
export function checkLoginBeforeDownload() {
  return alovaInstance.get<OssFile[]>(`${Api.ossInfo}/1`, {
    errorMessageMode: 'none',
  });
}

/**
 * 删除文件
 * @param ossIds id数组
 * @returns void
 */
export function ossRemove(ossIds: IDS) {
  return alovaInstance.deleteWithMsg<void>(`${Api.root}/${ossIds}`);
}
