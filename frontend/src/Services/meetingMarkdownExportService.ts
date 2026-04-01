import { apiClient } from '../Api/apiClient';
import type { MeetingMarkdownExportRequest, MeetingMarkdownExportResult } from '../Types/meetingMarkdownExport';

export const meetingMarkdownExportService = {
  export: (payload: MeetingMarkdownExportRequest) =>
    apiClient.create<MeetingMarkdownExportResult, MeetingMarkdownExportRequest>('meetings/export-markdown', payload),
};
