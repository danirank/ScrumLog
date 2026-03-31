import { useNavigate } from 'react-router-dom';
import { UpcomingMeetingsList } from '../Components/UpcomingMeetingsList/UpcomingMeetingsList';
import { meetingService } from '../Services/meetingService';
import type { Meeting } from '../Types/meeting';
import { activeMeetingStorageKey, useMeetingWorkspaceData } from './hooks/useMeetingWorkspaceData';

export function MeetingUpcomingPage() {
  const { meetings, refresh } = useMeetingWorkspaceData();
  const navigate = useNavigate();
  const plannedMeetings = meetings.filter((meeting) => meeting.status === 0);

  async function handleStartMeeting(meeting: Meeting) {
    const updatedMeeting = await meetingService.update(meeting.id, {
      title: meeting.title,
      date: meeting.date,
      type: meeting.type,
      status: 1,
      sprintId: meeting.sprintId,
      notes: meeting.notes,
      decisions: meeting.decisions,
      actions: meeting.actions,
    });

    window.localStorage.setItem(activeMeetingStorageKey, updatedMeeting.id);
    await refresh();
    void navigate(`/meetings/in-progress?meetingId=${updatedMeeting.id}`);
  }

  async function handleDeleteMeeting(meetingId: string) {
    await meetingService.delete(meetingId);
    await refresh();
  }

  function handleEditMeeting(meeting: Meeting) {
    void navigate(`/meetings/plan?meetingId=${meeting.id}`);
  }

  function handleCreateAgenda(meeting: Meeting) {
    void navigate(`/meetings/plan?meetingId=${meeting.id}&mode=agenda`);
  }

  return (
    <UpcomingMeetingsList
      meetings={plannedMeetings}
      onStartMeeting={(meeting) => void handleStartMeeting(meeting)}
      onEditMeeting={handleEditMeeting}
      onDeleteMeeting={(meetingId) => void handleDeleteMeeting(meetingId)}
      onCreateAgenda={handleCreateAgenda}
    />
  );
}
