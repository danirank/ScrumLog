import type { Guid } from './api';

export interface Person {
  id: Guid;
  name: string;
  role: string;
  teamId: Guid;
}

export interface CreatePersonRequest {
  name: string;
  role: string;
  teamId: Guid;
}

export interface UpdatePersonRequest {
  name: string;
  role: string;
  teamId: Guid;
}
