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

export type AlovaMeta = {
  /**
   * 是否需要对请求体进行加密
   */
  encrypt?: boolean;
  /**
   * 是否返回原生axios响应
   */
  isReturnNativeResponse?: boolean;
  /**
   * 是否需要转换响应 即只获取{code, msg, data}中的data
   */
  isTransformResponse?: boolean;
  /**
   * 接口请求失败时的提示方式
   */
  showErrorMessage?: MessageType;
  /**
   * 接口请求成功时的提示方式
   */
  showSuccessMessage?: MessageType;
  /**
   * 是否需要在请求头中添加 token
   */
  withToken?: boolean;
};

declare module 'alova' {
  export interface AlovaCustomTypes {
    meta: AlovaMeta;
  }

  /**
   * 添加withMessage方法 用于success弹窗
   */
  interface Alova {
    GetWithMessage: GetType;
    PostWithMessage: PostType;
    PutWithMessage: PutType;
    DeleteWithMessage: DeleteType;
  }
}

export {};
