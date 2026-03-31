/**
 * @zh_CN 登录页面 url 地址
 */
export const LOGIN_PATH = '/auth/login';

export interface LanguageOption {
  label: string;
  value: 'en-US' | 'zh-CN';
}

/**
 * Supported languages
 */
export const SUPPORT_LANGUAGES: LanguageOption[] = [
  {
    label: '简体中文',
    value: 'zh-CN',
  },
  {
    label: 'English',
    value: 'en-US',
  },
];

/**
 * 默认租户ID
 */
export const DEFAULT_TENANT_ID = '000000';

/**
 * 业务成功 状态码
 */
export const BUSINESS_SUCCESS_CODE = 200;

/**
 * 未授权 状态码(登录超时)
 */
export const UNAUTHORIZED_CODE = 401;

/**
 * 超管用户ID
 */
export const SUPERADMIN_USER_ID = 1;
export const SUPERADMIN_ROLE_ID = 1;

/**
 * 超管角色key
 */
export const SUPERADMIN_ROLE_KEY = 'superadmin';
/**
 * 管理员(非超管) 角色key
 */
export const ADMIN_ROLE_KEY = 'admin';

/**
 * 默认客户端ID
 */
export const DEFAULT_CLIENT_ID = 1;

/**
 * 对应 字典-S系统开关的状态
 */
export const EnableStatus = {
  Enable: '0',
  Disable: '1',
} as const;

export const YesNo = {
  Yes: 'Y',
  No: 'N',
} as const;
