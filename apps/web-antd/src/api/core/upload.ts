import type { AxiosRequestConfig } from '@vben/request';

import { alovaInstance } from '#/utils/http';
import { ContentTypeEnum } from '#/utils/http/helper';

/**
 * Axios上传进度事件
 */
export type AxiosProgressEvent = AxiosRequestConfig['onUploadProgress'];

/**
 * 默认上传结果
 */
export interface UploadResult {
  url: string;
  fileName: string;
  ossId: string;
}

/**
 * 通过单文件上传接口
 * @param file 上传的文件
 * @param options 一些配置项
 * @param options.otherData 其他请求参数 后端拓展可能会用到
 * @returns 上传结果
 */
export function uploadApi(
  file: Blob | File,
  options?: {
    otherData?: Record<string, any>;
  },
) {
  const { otherData = {} } = options ?? {};
  return alovaInstance.post<UploadResult>(
    '/resource/oss/upload',
    { file, ...otherData },
    {
      timeout: 60_000,
      headers: {
        'Content-Type': ContentTypeEnum.FORM_DATA,
      },
    },
  );
}

/**
 * 上传api type
 */
export type UploadApi = typeof uploadApi;
