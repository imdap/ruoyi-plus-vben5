import { alovaInstance } from '#/utils/http';

enum Api {
  list = '/system/sse/list',
  send = '/system/sse/send',
  sendAll = '/system/sse/sendAll',
  status = '/system/sse/status',
}

export function sseStatus() {
  return alovaInstance.get<boolean>(Api.status);
}

export function sseSendAll(message: string) {
  return alovaInstance.postWithMsg<void>(`${Api.sendAll}?message=${message}`);
}

export function sseSendByUserId(userId: string, message: string) {
  return alovaInstance.postWithMsg<void>(
    `${Api.send}/${userId}?message=${message}`,
  );
}

export function sseList() {
  return alovaInstance.get<any>(Api.list);
}
