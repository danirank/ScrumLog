import { createCrudService } from './crudService';
import type {
  CreateDailyMeetingEntryRequest,
  DailyMeetingEntry,
  UpdateDailyMeetingEntryRequest,
} from '../Types/dailyMeetingEntry';

export const dailyMeetingEntryService = createCrudService<
  DailyMeetingEntry,
  CreateDailyMeetingEntryRequest,
  UpdateDailyMeetingEntryRequest
>('dailymeetingentries');
