import { InsightCard, InsightGrid } from '../Components/InsightGrid/InsightGrid';
import { useTeamWorkspaceData } from './hooks/useTeamWorkspaceData';

export function TeamOverviewPage() {
  const { teams, persons, sprints } = useTeamWorkspaceData();

  return (
    <InsightGrid>
      <InsightCard label="Teams" value={teams.length} />
      <InsightCard label="Members assigned" value={persons.length} />
      <InsightCard label="Sprints linked" value={sprints.length} />
    </InsightGrid>
  );
}
