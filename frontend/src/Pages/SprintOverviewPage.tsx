import { InsightCard, InsightGrid } from '../Components/InsightGrid/InsightGrid';
import { useSprintWorkspaceData } from './hooks/useSprintWorkspaceData';

export function SprintOverviewPage() {
  const { sprints } = useSprintWorkspaceData();
  const now = new Date();

  return (
    <InsightGrid>
      <InsightCard label="Finished" value={sprints.filter((sprint) => new Date(sprint.endDate) < now).length} />
      <InsightCard label="Current" value={sprints.filter((sprint) => new Date(sprint.startDate) <= now && new Date(sprint.endDate) >= now).length} />
      <InsightCard label="Planned" value={sprints.filter((sprint) => new Date(sprint.startDate) > now).length} />
    </InsightGrid>
  );
}
