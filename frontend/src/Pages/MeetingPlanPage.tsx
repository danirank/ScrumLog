import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MeetingPlanForm } from '../Components/MeetingPlanForm/MeetingPlanForm';
import { meetingService } from '../Services/meetingService';
import type { Meeting, MeetingType } from '../Types/meeting';
import { useMeetingWorkspaceData } from './hooks/useMeetingWorkspaceData';

export function MeetingPlanPage() {
  const { meetings, sprintOptions, refresh } = useMeetingWorkspaceData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState<'' | MeetingType>('');
  const [sprintId, setSprintId] = useState('');
  const [agenda, setAgenda] = useState('');
  const [editingPlannedMeeting, setEditingPlannedMeeting] = useState<Meeting | null>(null);
  const [agendaMeeting, setAgendaMeeting] = useState<Meeting | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const meetingId = searchParams.get('meetingId');
    const mode = searchParams.get('mode');

    if (!meetingId) {
      setEditingPlannedMeeting(null);
      setAgendaMeeting(null);
      setTitle('');
      setDate('');
      setType('');
      setSprintId('');
      setAgenda('');
      return;
    }

    const meeting = meetings.find((item) => item.id === meetingId && item.status === 0);
    if (!meeting) {
      setSearchParams({}, { replace: true });
      return;
    }

    setEditingPlannedMeeting(meeting);
    setAgendaMeeting(mode === 'agenda' ? meeting : null);
    setTitle(meeting.title);
    setDate(meeting.date.slice(0, 16));
    setType(meeting.type);
    setSprintId(meeting.sprintId ?? '');
    setAgenda(meeting.type === 0 ? meeting.notes ?? '' : '');
    setStatusMessage(undefined);
  }, [meetings, searchParams, setSearchParams]);

  async function handleCreatePlannedMeeting() {
    if (type === '') {
      setIsError(true);
      setStatusMessage('Select a meeting type.');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(undefined);

    try {
      if (editingPlannedMeeting) {
        await meetingService.update(editingPlannedMeeting.id, {
          title,
          date,
          type,
          status: editingPlannedMeeting.status,
          sprintId: sprintId || null,
          notes: type === 0 ? agenda || null : editingPlannedMeeting.notes,
          decisions: editingPlannedMeeting.decisions,
          actions: editingPlannedMeeting.actions,
        });
      } else {
        await meetingService.create({
          title,
          date,
          type,
          sprintId: sprintId || null,
          notes: type === 0 ? agenda || null : null,
        });
      }

      setTitle('');
      setDate('');
      setType('');
      setSprintId('');
      setAgenda('');
      setEditingPlannedMeeting(null);
      setAgendaMeeting(null);
      setSearchParams({}, { replace: true });
      setIsError(false);
      setStatusMessage(
        agendaMeeting ? 'Saved agenda for planned meeting.' : editingPlannedMeeting ? 'Updated planned meeting.' : 'Created planned meeting.',
      );
      await refresh();
    } catch (error) {
      setIsError(true);
      setStatusMessage(error instanceof Error ? error.message : 'Failed to create planned meeting.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <MeetingPlanForm
      title={title}
      date={date}
      type={type}
      sprintId={sprintId}
      agenda={agenda}
      sprintOptions={sprintOptions}
      isSubmitting={isSubmitting}
      submitLabel={agendaMeeting ? 'Save agenda' : editingPlannedMeeting ? 'Update planned meeting' : 'Create planned meeting'}
      description={
        agendaMeeting
          ? 'Add or update the agenda for this planned General meeting before it starts.'
          : 'Create the meeting first. Details are added when it starts.'
      }
      statusMessage={statusMessage}
      isError={isError}
      onTitleChange={setTitle}
      onDateChange={setDate}
      onTypeChange={setType}
      onSprintIdChange={setSprintId}
      onAgendaChange={setAgenda}
      onSubmit={() => void handleCreatePlannedMeeting()}
    />
  );
}
