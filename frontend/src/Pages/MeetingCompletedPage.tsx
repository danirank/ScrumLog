import { RecordList, RecordListItem } from '../Components/RecordList/RecordList';
import { RecordPanel } from '../Components/RecordPanel/RecordPanel';
import { meetingService } from '../Services/meetingService';
import type { Meeting } from '../Types/meeting';
import { useMeetingWorkspaceData } from './hooks/useMeetingWorkspaceData';

function getMeetingTypeLabel(type: Meeting['type']) {
  if (type === 0) return 'General';
  if (type === 1) return 'Daily';
  if (type === 2) return 'Review';
  if (type === 3) return 'Retrospective';
  return 'Sprint planning';
}

export function MeetingCompletedPage() {
  const { meetings, refresh } = useMeetingWorkspaceData();
  const completedMeetings = meetings.filter((meeting) => meeting.status === 2);

  async function handleDeleteMeeting(meetingId: string) {
    await meetingService.delete(meetingId);
    await refresh();
  }

  return (
    <RecordPanel
      title="Completed meetings"
      description="Meetings that have been finished and are available for review."
    >
      {completedMeetings.length === 0 ? (
        <p>No meetings have been completed yet.</p>
      ) : (
        <RecordList>
          {completedMeetings.map((meeting) => (
            <RecordListItem
              key={meeting.id}
              title={meeting.title}
              subtitle={`${getMeetingTypeLabel(meeting.type)} • ${new Date(meeting.date).toLocaleString()}`}
              actions={
                <button type="button" onClick={() => void handleDeleteMeeting(meeting.id)}>Delete</button>
              }
            >
              <span>Status: Completed</span>
              <span>Participants: {meeting.participantIds.length}</span>
            </RecordListItem>
          ))}
        </RecordList>
      )}
    </RecordPanel>
  );
}
