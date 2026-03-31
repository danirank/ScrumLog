import type { Guid } from './api';

export type MeetingType = 0 | 1 | 2 | 3 | 4;
export type MeetingStatus = 0 | 1 | 2;

export interface Meeting {
  id: Guid;
  title: string;
  date: string;
  type: MeetingType;
  status: MeetingStatus;
  sprintId: Guid | null;
  notes: string | null;
  decisions: string | null;
  actions: string | null;
  participantIds: Guid[];
  dailyMeetingEntryIds: Guid[];
}

export interface CreateMeetingRequest {
  title: string;
  date: string;
  type: MeetingType;
  sprintId?: Guid | null;
  notes?: string | null;
  decisions?: string | null;
  actions?: string | null;
}

export interface UpdateMeetingRequest {
  title: string;
  date: string;
  type: MeetingType;
  status: MeetingStatus;
  sprintId?: Guid | null;
  notes?: string | null;
  decisions?: string | null;
  actions?: string | null;
}
