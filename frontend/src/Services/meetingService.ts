import { createCrudService } from './crudService';
import type { CreateMeetingRequest, Meeting, UpdateMeetingRequest } from '../Types/meeting';

export const meetingService = createCrudService<Meeting, CreateMeetingRequest, UpdateMeetingRequest>('meetings');
