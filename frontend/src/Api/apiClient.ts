import type { ApiClientOptions } from '../Types/api';

const defaultBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7036/api';

export class ApiClient {
  private readonly baseUrl: string;

  public constructor(options?: ApiClientOptions) {
    this.baseUrl = options?.baseUrl ?? defaultBaseUrl;
  }

  public async getAll<T>(resource: string): Promise<T[]> {
    return this.request<T[]>(resource, { method: 'GET' });
  }

  public async getById<T>(resource: string, id: string): Promise<T> {
    return this.request<T>(`${resource}/${id}`, { method: 'GET' });
  }

  public async create<TResponse, TRequest>(resource: string, payload: TRequest): Promise<TResponse> {
    return this.request<TResponse>(resource, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  public async update<TResponse, TRequest>(resource: string, id: string, payload: TRequest): Promise<TResponse> {
    return this.request<TResponse>(`${resource}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  }

  public async delete(resource: string, id: string): Promise<void> {
    await this.request<void>(`${resource}/${id}`, { method: 'DELETE' });
  }

  private async request<T>(path: string, init: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers,
      },
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `Request failed with status ${response.status}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  }
}

export const apiClient = new ApiClient();
