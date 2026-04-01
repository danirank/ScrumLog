import type { Guid } from './api';
import type { MeetingType } from './meeting';

export interface MeetingMarkdownDailyEntryRequest {
  personName: string;
  yesterday: string;
  today: string;
  blockers?: string | null;
}

export interface MeetingMarkdownExportRequest {
  title: string;
  meetingType: MeetingType;
  date: string;
  teamName: string;
  sprintName?: string | null;
  participants: string[];
  agenda?: string | null;
  notes?: string | null;
  decisions?: string | null;
  actions?: string | null;
  dailyEntries: MeetingMarkdownDailyEntryRequest[];
  demonstrated?: string | null;
  completed?: string | null;
  feedback?: string | null;
  followUpItems?: string | null;
  wentWell?: string | null;
  wentLessWell?: string | null;
  improvements?: string | null;
}

export interface MeetingMarkdownExportResult {
  fileName: string;
  filePath: string;
}

export interface MeetingMarkdownExportContext {
  meetingId: Guid;
  title: string;
  meetingType: MeetingType;
  date: string;
  sprintId: Guid | null;
  participants: Guid[];
  notes?: string | null;
  decisions?: string | null;
  actions?: string | null;
}
