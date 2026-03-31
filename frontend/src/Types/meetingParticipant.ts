import type { Guid } from './api';

export interface MeetingParticipant {
  id: Guid;
  meetingId: Guid;
  personId: Guid;
}

export interface CreateMeetingParticipantRequest {
  meetingId: Guid;
  personId: Guid;
}

export interface UpdateMeetingParticipantRequest {
  meetingId: Guid;
  personId: Guid;
}
