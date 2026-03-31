import type { Guid } from '../Types/api';
import { apiClient } from '../Api/apiClient';

export interface CrudService<TModel, TCreateRequest, TUpdateRequest> {
  getAll: () => Promise<TModel[]>;
  getById: (id: Guid) => Promise<TModel>;
  create: (payload: TCreateRequest) => Promise<TModel>;
  update: (id: Guid, payload: TUpdateRequest) => Promise<TModel>;
  delete: (id: Guid) => Promise<void>;
}

export function createCrudService<TModel, TCreateRequest, TUpdateRequest>(
  resource: string,
): CrudService<TModel, TCreateRequest, TUpdateRequest> {
  return {
    getAll: () => apiClient.getAll<TModel>(resource),
    getById: (id) => apiClient.getById<TModel>(resource, id),
    create: (payload) => apiClient.create<TModel, TCreateRequest>(resource, payload),
    update: (id, payload) => apiClient.update<TModel, TUpdateRequest>(resource, id, payload),
    delete: (id) => apiClient.delete(resource, id),
  };
}
