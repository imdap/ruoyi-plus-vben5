/* eslint-disable unicorn/require-module-specifiers */
import type { AlovaInstanceType } from '#/utils/http';

import 'alova';

/**
 * 接口请求message提示方式
 */
export type MessageType = 'message' | 'modal' | 'none' | 'notification';

type GetType = AlovaInstanceType['Get'];
type PostType = AlovaInstanceType['Post'];
type PutType = AlovaInstanceType['Put'];
type DeleteType = AlovaInstanceType['Delete'];

/**
 * 拓展自己的Meta
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type AlovaMeta = {};

declare module 'alova' {
  export interface AlovaCustomTypes {
    meta: AlovaMeta;
  }

  /**
   * 添加withMessage方法 用于success弹窗
   */
  interface Alova {
    get: GetType;
    post: PostType;
    put: PutType;
    delete: DeleteType;
    // 添加withMessage方法 用于弹出message提示
    getWithMsg: GetType;
    postWithMsg: PostType;
    putWithMsg: PutType;
    deleteWithMsg: DeleteType;
  }
}

/**
 * 拓展axios的请求配置
 */
declare module 'axios' {
  interface AxiosRequestConfig {
    /**
     * 是否需要对请求体进行加密
     */
    encrypt?: boolean;
    /**
     * 错误弹窗类型
     */
    errorMessageMode?: MessageType;
    /**
     * 是否返回原生axios响应
     */
    isReturnNativeResponse?: boolean;
    /**
     * 是否需要转换响应 即只获取{code, msg, data}中的data
     */
    isTransformResponse?: boolean;
    /**
     * 接口请求成功时的提示方式
     */
    successMessageMode?: MessageType;
    /**
     * 是否需要在请求头中添加 token
     */
    withToken?: boolean;
  }
}

export {};
