import type { Spel } from './model';

import type { ID, PageQuery, PageResult } from '#/api/common';

import { alovaInstance } from '#/utils/http';

export function spelList(params?: PageQuery) {
  return alovaInstance.get<PageResult<Spel>>('/workflow/spel/list', { params });
}

export function spelInfo(id: ID) {
  return alovaInstance.get<Spel>(`/workflow/spel/${id}`);
}

export function spelAdd(data: Partial<Spel>) {
  return alovaInstance.postWithMsg<Spel>('/workflow/spel', data);
}

export function spelUpdate(data: Partial<Spel>) {
  return alovaInstance.putWithMsg<Spel>('/workflow/spel', data);
}

export function spelDelete(ids: ID[]) {
  return alovaInstance.deleteWithMsg<Spel>(`/workflow/spel/${ids}`);
}
