import type { Guid } from './api';

export interface Team {
  id: Guid;
  name: string;
  memberIds: Guid[];
  sprintIds: Guid[];
}

export interface CreateTeamRequest {
  name: string;
}

export interface UpdateTeamRequest {
  name: string;
}
