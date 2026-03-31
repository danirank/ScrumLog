import type { Guid } from './api';

export interface Sprint {
  id: Guid;
  name: string;
  startDate: string;
  endDate: string;
  teamId: Guid;
  meetingIds: Guid[];
}

export interface CreateSprintRequest {
  name: string;
  startDate: string;
  endDate: string;
  teamId: Guid;
}

export interface UpdateSprintRequest {
  name: string;
  startDate: string;
  endDate: string;
  teamId: Guid;
}
