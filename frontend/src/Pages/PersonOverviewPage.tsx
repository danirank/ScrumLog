import { InsightCard, InsightGrid } from '../Components/InsightGrid/InsightGrid';
import { usePersonWorkspaceData } from './hooks/usePersonWorkspaceData';

export function PersonOverviewPage() {
  const { persons } = usePersonWorkspaceData();

  return (
    <InsightGrid>
      <InsightCard label="People" value={persons.length} />
      <InsightCard label="Teams covered" value={new Set(persons.map((person) => person.teamId)).size} />
      <InsightCard label="Roles in use" value={new Set(persons.map((person) => person.role)).size} />
    </InsightGrid>
  );
}
