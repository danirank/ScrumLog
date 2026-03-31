import { useEffect, useState } from 'react';
import type { DailyParticipantEntryInput, MeetingTypeValue } from '../Components/MeetingForm/MeetingForm';
import { MeetingForm } from '../Components/MeetingForm/MeetingForm';
import { dailyMeetingEntryService } from '../Services/dailyMeetingEntryService';
import { meetingParticipantService } from '../Services/meetingParticipantService';
import { meetingService } from '../Services/meetingService';
import { personService } from '../Services/personService';
import { sprintService } from '../Services/sprintService';
import type { DailyMeetingEntry } from '../Types/dailyMeetingEntry';
import type { Meeting, MeetingStatus } from '../Types/meeting';
import type { MeetingParticipant } from '../Types/meetingParticipant';
import type { SelectOption } from '../Types/selectOption';

interface MeetingExecutionContainerProps {
  meeting: Meeting;
  onSaved: (meeting: Meeting) => void;
  onCompleted: (meeting: Meeting) => void;
}

function parseGeneralMeetingNotes(notes: string | null) {
  if (!notes) {
    return { agenda: '', notes: '' };
  }

  if (!notes.startsWith('Agenda:\n')) {
    return { agenda: notes, notes: '' };
  }

  const delimiter = '\n\nNotes:\n';
  const delimiterIndex = notes.indexOf(delimiter);

  if (delimiterIndex === -1) {
    return { agenda: notes.replace('Agenda:\n', ''), notes: '' };
  }

  return {
    agenda: notes.slice('Agenda:\n'.length, delimiterIndex),
    notes: notes.slice(delimiterIndex + delimiter.length),
  };
}

export function MeetingExecutionContainer(props: MeetingExecutionContainerProps) {
  const parsedGeneralNotes = parseGeneralMeetingNotes(props.meeting.type === 0 ? props.meeting.notes : null);
  const [title, setTitle] = useState(props.meeting.title);
  const [date, setDate] = useState(props.meeting.date.slice(0, 16));
  const [type, setType] = useState<MeetingTypeValue>(props.meeting.type);
  const [sprintId, setSprintId] = useState(props.meeting.sprintId ?? '');
  const [sprintOptions, setSprintOptions] = useState<SelectOption[]>([]);
  const [participantOptions, setParticipantOptions] = useState<SelectOption[]>([]);
  const [selectedParticipantIds, setSelectedParticipantIds] = useState<string[]>([]);
  const [agenda, setAgenda] = useState(parsedGeneralNotes.agenda);
  const [notes, setNotes] = useState(props.meeting.type === 0 ? parsedGeneralNotes.notes : (props.meeting.notes ?? ''));
  const [decisions, setDecisions] = useState(props.meeting.decisions ?? '');
  const [actions, setActions] = useState(props.meeting.actions ?? '');
  const [demonstrated, setDemonstrated] = useState('');
  const [completed, setCompleted] = useState('');
  const [feedback, setFeedback] = useState('');
  const [followUpItems, setFollowUpItems] = useState('');
  const [wentWell, setWentWell] = useState('');
  const [wentLessWell, setWentLessWell] = useState('');
  const [improvements, setImprovements] = useState('');
  const [dailyEntries, setDailyEntries] = useState<Record<string, DailyParticipantEntryInput>>({});
  const [existingMeetingParticipants, setExistingMeetingParticipants] = useState<MeetingParticipant[]>([]);
  const [existingDailyEntries, setExistingDailyEntries] = useState<DailyMeetingEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function loadOptions() {
      try {
        const [sprints, persons, allParticipants, allDailyEntries] = await Promise.all([
          sprintService.getAll(),
          personService.getAll(),
          meetingParticipantService.getAll(),
          dailyMeetingEntryService.getAll(),
        ]);

        setSprintOptions(sprints.map((sprint) => ({ value: sprint.id, label: sprint.name })));
        setParticipantOptions(persons.map((person) => ({ value: person.id, label: `${person.name} (${person.role})` })));

        const meetingParticipants = allParticipants.filter((participant) => participant.meetingId === props.meeting.id);
        const meetingDailyEntries = allDailyEntries.filter((entry) => entry.meetingId === props.meeting.id);

        setExistingMeetingParticipants(meetingParticipants);
        setExistingDailyEntries(meetingDailyEntries);
        setSelectedParticipantIds(meetingParticipants.map((participant) => participant.personId));
        setDailyEntries(
          meetingDailyEntries.reduce<Record<string, DailyParticipantEntryInput>>((accumulator, entry) => {
            accumulator[entry.personId] = {
              yesterday: entry.yesterday,
              today: entry.today,
              blockers: entry.blockers ?? '',
            };
            return accumulator;
          }, {}),
        );
      } catch {
        setSprintOptions([]);
        setParticipantOptions([]);
      }
    }

    void loadOptions();
  }, [props.meeting.id]);

  function handleParticipantToggle(participantId: string) {
    setSelectedParticipantIds((current) =>
      current.includes(participantId)
        ? current.filter((id) => id !== participantId)
        : [...current, participantId],
    );

    setDailyEntries((entries) => ({
      ...entries,
      [participantId]: entries[participantId] ?? { yesterday: '', today: '', blockers: '' },
    }));
  }

  function handleDailyEntryChange(participantId: string, field: keyof DailyParticipantEntryInput, value: string) {
    setDailyEntries((entries) => ({
      ...entries,
      [participantId]: {
        yesterday: entries[participantId]?.yesterday ?? '',
        today: entries[participantId]?.today ?? '',
        blockers: entries[participantId]?.blockers ?? '',
        [field]: value,
      },
    }));
  }

  function buildMeetingPayload() {
    if (type === 0) {
      return {
        notes: `Agenda:\n${agenda}\n\nNotes:\n${notes}`,
        decisions,
        actions,
      };
    }

    if (type === 1) {
      return {
        notes: 'Daily meeting entries are attached per participant.',
        decisions: null,
        actions: null,
      };
    }

    if (type === 2) {
      return {
        notes: `Demonstrated:\n${demonstrated}\n\nCompleted:\n${completed}`,
        decisions: `Feedback:\n${feedback}`,
        actions: `Follow-up items:\n${followUpItems}`,
      };
    }

    if (type === 3) {
      return {
        notes: `Went well:\n${wentWell}\n\nWent less well:\n${wentLessWell}`,
        decisions: `Improvements for next sprint:\n${improvements}`,
        actions,
      };
    }

    return {
      notes: `Agenda:\n${agenda}\n\nNotes:\n${notes}`,
      decisions,
      actions,
    };
  }

  function validateActiveFields() {
    if (selectedParticipantIds.length === 0) {
      return 'Select at least one participant.';
    }

    if (type === 0 && (!agenda.trim() || !notes.trim() || !decisions.trim() || !actions.trim())) {
      return 'Fill in all General meeting fields.';
    }

    if (type === 1) {
      for (const participantId of selectedParticipantIds) {
        const entry = dailyEntries[participantId];
        if (!entry?.yesterday.trim() || !entry.today.trim()) {
          return 'Each daily participant entry requires yesterday and today.';
        }
      }
    }

    if (type === 2 && (!demonstrated.trim() || !completed.trim() || !feedback.trim() || !followUpItems.trim())) {
      return 'Fill in all Review meeting fields.';
    }

    if (type === 3 && (!wentWell.trim() || !wentLessWell.trim() || !improvements.trim() || !actions.trim())) {
      return 'Fill in all Retrospective fields.';
    }

    if (type === 4 && (!agenda.trim() || !notes.trim() || !decisions.trim() || !actions.trim())) {
      return 'Fill in all Sprint Planning fields.';
    }

    return null;
  }

  async function syncParticipants() {
    const currentPersonIds = new Set(existingMeetingParticipants.map((participant) => participant.personId));
    const nextPersonIds = new Set(selectedParticipantIds);

    const additions = selectedParticipantIds.filter((personId) => !currentPersonIds.has(personId));
    const removals = existingMeetingParticipants.filter((participant) => !nextPersonIds.has(participant.personId));

    await Promise.all(additions.map((personId) => meetingParticipantService.create({ meetingId: props.meeting.id, personId })));
    await Promise.all(removals.map((participant) => meetingParticipantService.delete(participant.id)));
  }

  async function syncDailyEntries() {
    const entriesByPersonId = new Map(existingDailyEntries.map((entry) => [entry.personId, entry]));
    const selectedPeople = new Set(selectedParticipantIds);

    if (type !== 1) {
      await Promise.all(existingDailyEntries.map((entry) => dailyMeetingEntryService.delete(entry.id)));
      return;
    }

    for (const personId of selectedParticipantIds) {
      const currentEntry = entriesByPersonId.get(personId);
      const nextEntry = dailyEntries[personId];

      if (!currentEntry) {
        await dailyMeetingEntryService.create({
          meetingId: props.meeting.id,
          personId,
          yesterday: nextEntry.yesterday,
          today: nextEntry.today,
          blockers: nextEntry.blockers || null,
        });
        continue;
      }

      await dailyMeetingEntryService.update(currentEntry.id, {
        meetingId: props.meeting.id,
        personId,
        yesterday: nextEntry.yesterday,
        today: nextEntry.today,
        blockers: nextEntry.blockers || null,
      });
    }

    const removals = existingDailyEntries.filter((entry) => !selectedPeople.has(entry.personId));
    await Promise.all(removals.map((entry) => dailyMeetingEntryService.delete(entry.id)));
  }

  async function saveMeeting(status: MeetingStatus) {
    const validationMessage = validateActiveFields();
    if (validationMessage) {
      setIsError(true);
      setStatusMessage(validationMessage);
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(undefined);

    try {
      const meetingPayload = buildMeetingPayload();
      const updatedMeeting = await meetingService.update(props.meeting.id, {
        title,
        date,
        type: Number(type) as Meeting['type'],
        status,
        sprintId: sprintId || null,
        notes: meetingPayload.notes,
        decisions: meetingPayload.decisions,
        actions: meetingPayload.actions,
      });

      await syncParticipants();
      await syncDailyEntries();

      setIsError(false);
      setStatusMessage(status === 2 ? `Completed meeting ${updatedMeeting.title}.` : `Saved meeting ${updatedMeeting.title}.`);

      if (status === 2) {
        props.onCompleted(updatedMeeting);
      } else {
        props.onSaved(updatedMeeting);
      }
    } catch (error) {
      setIsError(true);
      setStatusMessage(error instanceof Error ? error.message : 'Failed to save meeting.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <MeetingForm
      title={title}
      date={date}
      type={type}
      sprintId={sprintId}
      sprintOptions={sprintOptions}
      participantOptions={participantOptions}
      selectedParticipantIds={selectedParticipantIds}
      agenda={agenda}
      notes={notes}
      decisions={decisions}
      actions={actions}
      demonstrated={demonstrated}
      completed={completed}
      feedback={feedback}
      followUpItems={followUpItems}
      wentWell={wentWell}
      wentLessWell={wentLessWell}
      improvements={improvements}
      dailyEntries={dailyEntries}
      isSubmitting={isSubmitting}
      submitLabel="Save meeting"
      statusMessage={statusMessage}
      isError={isError}
      onTitleChange={setTitle}
      onDateChange={setDate}
      onTypeChange={setType}
      onSprintIdChange={setSprintId}
      onParticipantToggle={handleParticipantToggle}
      onAgendaChange={setAgenda}
      onNotesChange={setNotes}
      onDecisionsChange={setDecisions}
      onActionsChange={setActions}
      onDemonstratedChange={setDemonstrated}
      onCompletedChange={setCompleted}
      onFeedbackChange={setFeedback}
      onFollowUpItemsChange={setFollowUpItems}
      onWentWellChange={setWentWell}
      onWentLessWellChange={setWentLessWell}
      onImprovementsChange={setImprovements}
      onDailyEntryChange={handleDailyEntryChange}
      onSubmit={() => void saveMeeting(1)}
      onMarkCompleted={() => void saveMeeting(2)}
    />
  );
}
