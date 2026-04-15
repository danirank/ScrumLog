import type { DailyMeetingEntry } from '../Types/dailyMeetingEntry';
import type { MeetingMarkdownExportContext, MeetingMarkdownExportRequest } from '../Types/meetingMarkdownExport';
import type { Person } from '../Types/person';
import type { Sprint } from '../Types/sprint';
import type { Team } from '../Types/team';

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

function parseReviewContent(notes: string | null, decisions: string | null, actions: string | null) {
  const sprintGoal = notes?.startsWith('Sprint Goal:\n')
    ? notes.split('\n\nDemo:\n')[0]?.replace('Sprint Goal:\n', '') ?? ''
    : '';
  const demonstrated = notes?.includes('\n\nDemo:\n')
    ? notes.split('\n\nDemo:\n')[1] ?? ''
    : '';
  const feedback = decisions?.startsWith('Feedback:\n')
    ? decisions.split('\n\nChanges / Insights:\n')[0]?.replace('Feedback:\n', '') ?? ''
    : '';
  const changesOrInsights = decisions?.includes('\n\nChanges / Insights:\n')
    ? decisions.split('\n\nChanges / Insights:\n')[1] ?? ''
    : '';

  return {
    demonstrated,
    completed: sprintGoal,
    feedback,
    followUpItems: changesOrInsights,
    actions: actions?.replace('Next steps:\n', '') ?? '',
  };
}

function parseRetrospectiveContent(notes: string | null, decisions: string | null) {
  return {
    wentWell: notes?.startsWith('Went well:\n')
      ? notes.split('\n\nWent less well:\n')[0]?.replace('Went well:\n', '') ?? ''
      : '',
    wentLessWell: notes?.includes('\n\nWent less well:\n')
      ? notes.split('\n\nWent less well:\n')[1] ?? ''
      : '',
    improvements: decisions?.replace('Improvements for next sprint:\n', '') ?? '',
  };
}

export function mapMeetingToMarkdownExportRequest(
  context: MeetingMarkdownExportContext,
  teams: Team[],
  sprints: Sprint[],
  persons: Person[],
  dailyEntries: DailyMeetingEntry[],
): MeetingMarkdownExportRequest {
  const sprint = context.sprintId ? sprints.find((item) => item.id === context.sprintId) ?? null : null;
  const team = sprint ? teams.find((item) => item.id === sprint.teamId) ?? null : null;
  const participantNames = context.participants.map((participantId) => {
    const person = persons.find((item) => item.id === participantId);
    return person ? person.name : 'Unknown participant';
  });

  const generalContent = parseGeneralMeetingNotes(context.notes ?? null);
  const sprintPlanningContent = parseGeneralMeetingNotes(context.notes ?? null);
  const reviewContent = parseReviewContent(context.notes ?? null, context.decisions ?? null, context.actions ?? null);
  const retrospectiveContent = parseRetrospectiveContent(context.notes ?? null, context.decisions ?? null);

  return {
    title: context.title,
    meetingType: context.meetingType,
    date: context.date,
    teamName: team?.name ?? 'Unknown team',
    sprintName: sprint?.name ?? null,
    participants: participantNames,
    agenda: context.meetingType === 0 ? generalContent.agenda : context.meetingType === 4 ? sprintPlanningContent.agenda : null,
    notes:
      context.meetingType === 0
        ? generalContent.notes
        : context.meetingType === 4
          ? sprintPlanningContent.notes
          : context.meetingType === 1
            ? context.notes ?? null
            : null,
    decisions: context.meetingType === 0 || context.meetingType === 4 ? context.decisions ?? null : null,
    dailyEntries: context.meetingType === 1
      ? dailyEntries
        .filter((entry) => entry.meetingId === context.meetingId)
        .map((entry) => {
          const person = persons.find((item) => item.id === entry.personId);
          return {
            personName: person?.name ?? 'Unknown participant',
            yesterday: entry.yesterday,
            today: entry.today,
            blockers: entry.blockers ?? null,
          };
        })
      : [],
    demonstrated: context.meetingType === 2 ? reviewContent.demonstrated : null,
    completed: context.meetingType === 2 ? reviewContent.completed : null,
    feedback: context.meetingType === 2 ? reviewContent.feedback : null,
    followUpItems: context.meetingType === 2 ? reviewContent.followUpItems : null,
    actions: context.meetingType === 2 ? reviewContent.actions : context.meetingType === 0 || context.meetingType === 3 || context.meetingType === 4 ? context.actions ?? null : null,
    wentWell: context.meetingType === 3 ? retrospectiveContent.wentWell : null,
    wentLessWell: context.meetingType === 3 ? retrospectiveContent.wentLessWell : null,
    improvements: context.meetingType === 3 ? retrospectiveContent.improvements : null,
  };
}
