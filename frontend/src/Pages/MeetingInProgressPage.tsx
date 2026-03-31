import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RecordList, RecordListItem } from '../Components/RecordList/RecordList';
import { RecordPanel } from '../Components/RecordPanel/RecordPanel';
import { MeetingExecutionContainer } from '../Containers/MeetingExecutionContainer';
import { meetingService } from '../Services/meetingService';
import type { Meeting } from '../Types/meeting';
import { activeMeetingStorageKey, useMeetingWorkspaceData } from './hooks/useMeetingWorkspaceData';

function getMeetingTypeLabel(type: Meeting['type']) {
  if (type === 0) return 'General';
  if (type === 1) return 'Daily';
  if (type === 2) return 'Review';
  if (type === 3) return 'Retrospective';
  return 'Sprint planning';
}

export function MeetingInProgressPage() {
  const { meetings, refresh } = useMeetingWorkspaceData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeMeeting, setActiveMeeting] = useState<Meeting | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>();
  const inProgressMeetings = meetings.filter((meeting) => meeting.status === 1);

  useEffect(() => {
    const requestedMeetingId = searchParams.get('meetingId') ?? window.localStorage.getItem(activeMeetingStorageKey);
    if (!requestedMeetingId) {
      setActiveMeeting(null);
      return;
    }

    const matchingMeeting = inProgressMeetings.find((meeting) => meeting.id === requestedMeetingId);
    if (matchingMeeting) {
      setActiveMeeting(matchingMeeting);
      window.localStorage.setItem(activeMeetingStorageKey, matchingMeeting.id);
      return;
    }

    setActiveMeeting(null);
    window.localStorage.removeItem(activeMeetingStorageKey);
    setSearchParams({}, { replace: true });
  }, [inProgressMeetings, searchParams, setSearchParams]);

  async function handleDeleteMeeting(meetingId: string) {
    await meetingService.delete(meetingId);
    if (activeMeeting?.id === meetingId) {
      setActiveMeeting(null);
      window.localStorage.removeItem(activeMeetingStorageKey);
      setSearchParams({}, { replace: true });
    }
    await refresh();
  }

  function handleMeetingSaved(updatedMeeting: Meeting) {
    setActiveMeeting(updatedMeeting);
    window.localStorage.setItem(activeMeetingStorageKey, updatedMeeting.id);
    setSearchParams({ meetingId: updatedMeeting.id }, { replace: true });
    void refresh();
  }

  function handleMeetingCompleted(updatedMeeting: Meeting) {
    setActiveMeeting(null);
    window.localStorage.removeItem(activeMeetingStorageKey);
    setSearchParams({}, { replace: true });
    setStatusMessage(`Completed meeting ${updatedMeeting.title}.`);
    void refresh();
  }

  return (
    <>
      <RecordPanel
        title="Meetings in progress"
        description="Meetings that have started and can be edited or removed from the current flow."
      >
        {inProgressMeetings.length === 0 ? (
          <p>No meetings are currently in progress.</p>
        ) : (
          <RecordList>
            {inProgressMeetings.map((meeting) => (
              <RecordListItem
                key={meeting.id}
                title={meeting.title}
                subtitle={`${getMeetingTypeLabel(meeting.type)} • ${new Date(meeting.date).toLocaleString()}`}
                actions={
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMeeting(meeting);
                        window.localStorage.setItem(activeMeetingStorageKey, meeting.id);
                        setSearchParams({ meetingId: meeting.id }, { replace: true });
                      }}
                    >
                      Edit
                    </button>
                    <button type="button" onClick={() => void handleDeleteMeeting(meeting.id)}>Delete</button>
                  </>
                }
              >
                <span>Status: In progress</span>
                <span>Participants: {meeting.participantIds.length}</span>
              </RecordListItem>
            ))}
          </RecordList>
        )}
      </RecordPanel>

      {statusMessage ? <p>{statusMessage}</p> : null}

      {activeMeeting ? (
        <MeetingExecutionContainer
          meeting={activeMeeting}
          onSaved={handleMeetingSaved}
          onCompleted={handleMeetingCompleted}
        />
      ) : null}
    </>
  );
}
