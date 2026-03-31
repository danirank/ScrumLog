import type { Guid } from './api';

export interface DailyMeetingEntry {
  id: Guid;
  meetingId: Guid;
  personId: Guid;
  yesterday: string;
  today: string;
  blockers: string | null;
}

export interface CreateDailyMeetingEntryRequest {
  meetingId: Guid;
  personId: Guid;
  yesterday: string;
  today: string;
  blockers?: string | null;
}

export interface UpdateDailyMeetingEntryRequest {
  meetingId: Guid;
  personId: Guid;
  yesterday: string;
  today: string;
  blockers?: string | null;
}
