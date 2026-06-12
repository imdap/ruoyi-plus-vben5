export interface Client {
  id: number | string;
  clientId: string;
  clientKey: string;
  clientSecret: string;
  grantTypeList: string[];
  grantType: string;
  deviceType: string;
  activeTimeout: number;
  timeout: number;
  status: string;
  /** 允许访问路径(字符串, 多个规则按换行/逗号/分号分隔) */
  accessPath: string;
  /** 允许访问路径(列表, 后端展示用) */
  accessPathList: string[];
  /** IP白名单(字符串, 多个规则按换行/逗号/分号分隔) */
  ipWhitelist: string;
  /** IP白名单(列表, 后端展示用) */
  ipWhitelistList: string[];
}
