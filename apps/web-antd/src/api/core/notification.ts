import { alovaInstance } from '#/utils/http';

/**
 * 持久化通知提醒
 * @returns
 */
export function getNotificationList() {
  return alovaInstance.get<NotificationResp>('/resource/message/box');
}

export interface NoticeData {
  noticeContent: string;
  noticeTypeLabel: string;
  noticeType: string;
  noticeTitle: string;
  noticeId: string;
  status: string;
}

export interface NoticeList {
  category: 'notice';
  content: string;
  createTime: string;
  data: NoticeData;
  message: string;
  messageId: string;
  path: string;
  source: string;
  title: string;
  type: string;
}

export interface SystemList {
  category: 'system';
  content?: any;
  createTime: string;
  data?: any;
  message: string;
  messageId: string;
  path?: any;
  source: string;
  title: string;
  type: string;
}

export interface WorkflowList {
  category: 'workflow';
  content?: any;
  createTime: string;
  data?: any;
  message: string;
  messageId: string;
  path: string;
  source: string;
  title: string;
  type: string;
}

export interface NotificationResp {
  noticeList: NoticeList[];
  systemList: SystemList[];
  workflowList: WorkflowList[];
}
