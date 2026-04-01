import { useEffect, useState } from 'react';
import { RecordList, RecordListItem } from '../Components/RecordList/RecordList';
import { RecordPanel } from '../Components/RecordPanel/RecordPanel';
import { dailyMeetingEntryService } from '../Services/dailyMeetingEntryService';
import { meetingService } from '../Services/meetingService';
import { personService } from '../Services/personService';
import type { DailyMeetingEntry } from '../Types/dailyMeetingEntry';
import type { Meeting, MeetingType } from '../Types/meeting';
import type { Person } from '../Types/person';
import { useMeetingWorkspaceData } from './hooks/useMeetingWorkspaceData';
import styles from './MeetingCompletedPage.module.css';

function getMeetingTypeLabel(type: Meeting['type']) {
  if (type === 0) return 'General';
  if (type === 1) return 'Daily';
  if (type === 2) return 'Review';
  if (type === 3) return 'Retrospective';
  return 'Sprint planning';
}

function renderMultilineValue(value: string | null) {
  if (!value?.trim()) {
    return 'No data saved.';
  }

  return value.split('\n').map((line, index) => (
    <span key={`${line}-${index}`} className={styles.detailLine}>
      {line}
    </span>
  ));
}

export function MeetingCompletedPage() {
  const { meetings, sprintOptions, refresh } = useMeetingWorkspaceData();
  const [selectedSprintId, setSelectedSprintId] = useState('');
  const [selectedType, setSelectedType] = useState<'' | MeetingType>('');
  const [expandedMeetingId, setExpandedMeetingId] = useState<string | null>(null);
  const [persons, setPersons] = useState<Person[]>([]);
  const [dailyEntries, setDailyEntries] = useState<DailyMeetingEntry[]>([]);

  useEffect(() => {
    async function loadRelatedData() {
      try {
        const [loadedPersons, loadedDailyEntries] = await Promise.all([
          personService.getAll(),
          dailyMeetingEntryService.getAll(),
        ]);

        setPersons(loadedPersons);
        setDailyEntries(loadedDailyEntries);
      } catch {
        setPersons([]);
        setDailyEntries([]);
      }
    }

    void loadRelatedData();
  }, []);

  const completedMeetings = meetings.filter((meeting) => meeting.status === 2);
  const filteredMeetings = completedMeetings
    .filter((meeting) => selectedSprintId === '' || meeting.sprintId === selectedSprintId)
    .filter((meeting) => selectedType === '' || meeting.type === selectedType)
    .sort((left, right) => {
      const leftSprint = sprintOptions.find((option) => option.value === left.sprintId)?.label ?? 'No sprint';
      const rightSprint = sprintOptions.find((option) => option.value === right.sprintId)?.label ?? 'No sprint';
      const sprintSort = leftSprint.localeCompare(rightSprint);
      if (sprintSort !== 0) {
        return sprintSort;
      }

      const typeSort = getMeetingTypeLabel(left.type).localeCompare(getMeetingTypeLabel(right.type));
      if (typeSort !== 0) {
        return typeSort;
      }

      return new Date(right.date).getTime() - new Date(left.date).getTime();
    });

  useEffect(() => {
    if (expandedMeetingId && !filteredMeetings.some((meeting) => meeting.id === expandedMeetingId)) {
      setExpandedMeetingId(null);
    }
  }, [expandedMeetingId, filteredMeetings]);

  async function handleDeleteMeeting(meetingId: string) {
    await meetingService.delete(meetingId);
    if (expandedMeetingId === meetingId) {
      setExpandedMeetingId(null);
    }
    await refresh();
  }

  return (
    <RecordPanel
      title="Completed meetings"
      description="Review finished meetings and narrow the list by sprint and meeting type."
      actions={
        <div className={styles.filters}>
          <label className={styles.filter}>
            <span>Sprint</span>
            <select value={selectedSprintId} onChange={(event) => setSelectedSprintId(event.target.value)}>
              <option value="">All sprints</option>
              {sprintOptions.map((sprint) => (
                <option key={sprint.value} value={sprint.value}>
                  {sprint.label}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.filter}>
            <span>Type</span>
            <select
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value === '' ? '' : Number(event.target.value) as MeetingType)}
            >
              <option value="">All types</option>
              <option value={0}>General</option>
              <option value={1}>Daily</option>
              <option value={2}>Review</option>
              <option value={3}>Retrospective</option>
              <option value={4}>Sprint planning</option>
            </select>
          </label>
        </div>
      }
    >
      {filteredMeetings.length === 0 ? (
        <p>No completed meetings match the selected filters.</p>
      ) : (
        <RecordList>
          {filteredMeetings.map((meeting) => {
            const isExpanded = expandedMeetingId === meeting.id;
            const sprintLabel = sprintOptions.find((option) => option.value === meeting.sprintId)?.label ?? 'No sprint';
            const meetingParticipantDetails = meeting.participantIds.map((participantId) => {
              const person = persons.find((item) => item.id === participantId);
              return {
                id: participantId,
                label: person ? `${person.name} (${person.role})` : 'Unknown participant',
              };
            });
            const meetingDailyEntries = dailyEntries.filter((entry) => entry.meetingId === meeting.id);

            return (
              <RecordListItem
                key={meeting.id}
                title={meeting.title}
                subtitle={`${getMeetingTypeLabel(meeting.type)} • ${new Date(meeting.date).toLocaleString()}`}
                actions={
                  <>
                    <button
                      type="button"
                      onClick={() => setExpandedMeetingId((current) => current === meeting.id ? null : meeting.id)}
                    >
                      {isExpanded ? 'Hide details' : 'View details'}
                    </button>
                    <button type="button" onClick={() => void handleDeleteMeeting(meeting.id)}>Delete</button>
                  </>
                }
              >
                <span className={styles.metaChip}>Sprint: {sprintLabel}</span>
                <span className={styles.metaChip}>Participants: {meeting.participantIds.length}</span>

                {isExpanded ? (
                  <div className={styles.expandedSection}>
                    <div className={styles.detailsHeader}>
                      <h3>Meeting details</h3>
                      <p>Review the captured outcome, participants, and follow-up information.</p>
                    </div>

                    <div className={styles.detailsGrid}>
                    <article className={styles.detailCard}>
                      <h3>Summary</h3>
                      <span>Sprint: {sprintLabel}</span>
                      <span>Type: {getMeetingTypeLabel(meeting.type)}</span>
                      <span>Participants: {meeting.participantIds.length}</span>
                    </article>

                    <article className={styles.detailCard}>
                      <h3>Participants</h3>
                      {meetingParticipantDetails.length === 0 ? (
                        <span>No participants recorded.</span>
                      ) : (
                        meetingParticipantDetails.map((participant) => (
                          <span key={participant.id}>{participant.label}</span>
                        ))
                      )}
                    </article>

                    <article className={styles.detailCard}>
                      <h3>Notes</h3>
                      {renderMultilineValue(meeting.notes)}
                    </article>

                    <article className={styles.detailCard}>
                      <h3>Decisions</h3>
                      {renderMultilineValue(meeting.decisions)}
                    </article>

                    <article className={styles.detailCard}>
                      <h3>Actions</h3>
                      {renderMultilineValue(meeting.actions)}
                    </article>

                    {meeting.type === 1 ? (
                      <article className={styles.detailCard}>
                        <h3>Daily entries</h3>
                        {meetingDailyEntries.length === 0 ? (
                          <span>No daily entries recorded.</span>
                        ) : (
                          meetingDailyEntries.map((entry) => {
                            const person = persons.find((item) => item.id === entry.personId);

                            return (
                              <div key={entry.id} className={styles.dailyEntry}>
                                <strong>{person ? `${person.name} (${person.role})` : 'Participant'}</strong>
                                <span>Yesterday: {entry.yesterday}</span>
                                <span>Today: {entry.today}</span>
                                <span>Blockers: {entry.blockers || 'None'}</span>
                              </div>
                            );
                          })
                        )}
                      </article>
                    ) : null}
                    </div>
                  </div>
                ) : null}
              </RecordListItem>
            );
          })}
        </RecordList>
      )}
    </RecordPanel>
  );
}
