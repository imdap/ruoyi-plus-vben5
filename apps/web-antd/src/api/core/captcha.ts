import { alovaInstance } from '#/utils/http';

/**
 * 发送短信验证码
 * @param phonenumber 手机号
 * @returns void
 */
export function sendSmsCode(phonenumber: string) {
  return alovaInstance.get<void>('/resource/sms/code', {
    params: { phonenumber },
  });
}

/**
 * 发送邮件验证码
 * @param email 邮箱
 * @returns void
 */
export function sendEmailCode(email: string) {
  return alovaInstance.get<void>('/resource/email/code', {
    params: { email },
  });
}

/**
 * @param img 图片验证码 需要和base64拼接
 * @param captchaEnabled 是否开启
 * @param uuid 验证码ID
 */
export interface CaptchaResponse {
  captchaEnabled: boolean;
  img: string;
  uuid: string;
}

/**
 * 图片验证码
 * @returns resp
 */
export function captchaImage() {
  return alovaInstance.get<CaptchaResponse>('/auth/code');
}
