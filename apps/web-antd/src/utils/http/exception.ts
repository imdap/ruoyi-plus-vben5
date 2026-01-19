/**
 * 业务异常抛出 即业务状态码不为200时抛出
 */
export class BusinessException extends Error {
  code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

/**
 * 定义一个401专用异常 用于可能会用到的区分场景?
 */
export class UnauthorizedException extends Error {}

/**
 * logout这种接口都返回401 抛出这个异常
 */
export class ImpossibleReturn401Exception extends Error {}
