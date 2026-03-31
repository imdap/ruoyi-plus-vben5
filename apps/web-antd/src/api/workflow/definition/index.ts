import type { ProcessDefinition } from './model';

import type { ID, IDS, PageQuery, PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

/**
 * 全部的流程定义
 * @param params 查询参数
 * @returns 分页
 */
export function workflowDefinitionList(params?: PageQuery) {
  return alovaInstance.get<PageResult<ProcessDefinition>>(
    '/workflow/definition/list',
    { params },
  );
}

/**
 * 未发布的流程定义
 * @param params 查询参数
 * @returns 分页
 */
export function unPublishList(params?: PageQuery) {
  return alovaInstance.get<PageResult<ProcessDefinition>>(
    '/workflow/definition/unPublishList',
    { params },
  );
}

/**
 * 获取历史流程定义列表
 * @param flowCode
 * @returns ProcessDefinition[]
 */
export function getHisListByKey(flowCode: string) {
  return alovaInstance.get<ProcessDefinition[]>(
    `/workflow/definition/getHisListByKey/${flowCode}`,
  );
}

/**
 * 获取流程定义详细信息
 * @param id id
 * @returns ProcessDefinition
 */
export function workflowDefinitionInfo(id: ID) {
  return alovaInstance.get<ProcessDefinition>(`/workflow/definition/${id}`);
}

/**
 * 新增流程定义
 * @param data
 */
export function workflowDefinitionAdd(data: any) {
  return alovaInstance.postWithMsg<void>('/workflow/definition', data);
}

/**
 * 更新流程定义
 * @param data
 */
export function workflowDefinitionUpdate(data: any) {
  return alovaInstance.putWithMsg<void>('/workflow/definition', data);
}

/**
 * 发布流程定义
 * @param id id
 * @returns boolean
 */
export function workflowDefinitionPublish(id: ID) {
  return alovaInstance.putWithMsg<boolean>(
    `/workflow/definition/publish/${id}`,
  );
}

/**
 * 取消发布流程定义
 * @param id id
 * @returns boolean
 */
export function workflowDefinitionUnPublish(id: ID) {
  return alovaInstance.putWithMsg<boolean>(
    `/workflow/definition/unPublish/${id}`,
  );
}

/**
 * 删除流程定义
 * @param ids idList
 */
export function workflowDefinitionDelete(ids: IDS) {
  return alovaInstance.deleteWithMsg<void>(`/workflow/definition/${ids}`);
}

/**
 * 复制流程定义
 * @param id id
 */
export function workflowDefinitionCopy(id: ID) {
  return alovaInstance.postWithMsg<void>(`/workflow/definition/copy/${id}`);
}

/**
 * 导入流程定义
 * @returns boolean
 */
export function workflowDefinitionImport(data: {
  category: ID;
  file: Blob | File;
}) {
  return alovaInstance.postWithMsg<boolean>(
    '/workflow/definition/importDef',
    data,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
}

/**
 * 导出流程定义
 * @param id id
 * @returns blob
 */
export function workflowDefinitionExport(id: ID) {
  return alovaInstance.postWithMsg<Blob>(
    `/workflow/definition/exportDef/${id}`,
    {},
    {
      responseType: 'blob',
      isTransformResponse: false,
    },
  );
}

/**
 * 获取流程定义xml字符串
 * @param id id
 * @returns xml
 */
export function workflowDefinitionXml(id: ID) {
  return alovaInstance.get<string>(`/workflow/definition/xmlString/${id}`);
}

/**
 * 激活/挂起流程定义
 * @param id 流程定义id
 * @param active 激活/挂起
 * @returns boolean
 */
export function workflowDefinitionActive(id: ID, active: boolean) {
  return alovaInstance.putWithMsg<boolean>(
    `/workflow/definition/active/${id}?active=${active}`,
  );
}
