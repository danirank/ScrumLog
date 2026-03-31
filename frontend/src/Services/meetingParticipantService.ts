import { createCrudService } from './crudService';
import type {
  CreateMeetingParticipantRequest,
  MeetingParticipant,
  UpdateMeetingParticipantRequest,
} from '../Types/meetingParticipant';

export const meetingParticipantService = createCrudService<
  MeetingParticipant,
  CreateMeetingParticipantRequest,
  UpdateMeetingParticipantRequest
>('meetingparticipants');
