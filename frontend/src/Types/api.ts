export type Guid = string;

export interface ApiErrorResponse {
  message: string;
  status: number;
}

export interface ApiClientOptions {
  baseUrl?: string;
}
