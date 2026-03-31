import { InsightCard, InsightGrid } from '../Components/InsightGrid/InsightGrid';
import { useMeetingWorkspaceData } from './hooks/useMeetingWorkspaceData';

export function MeetingOverviewPage() {
  const { meetings } = useMeetingWorkspaceData();
  const plannedMeetings = meetings.filter((meeting) => meeting.status === 0);
  const inProgressMeetings = meetings.filter((meeting) => meeting.status === 1);
  const completedMeetings = meetings.filter((meeting) => meeting.status === 2);

  return (
    <InsightGrid>
      <InsightCard label="Planned" value={plannedMeetings.length} />
      <InsightCard label="In progress" value={inProgressMeetings.length} />
      <InsightCard label="Completed" value={completedMeetings.length} />
    </InsightGrid>
  );
}
