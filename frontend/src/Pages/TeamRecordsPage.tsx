import { useState } from 'react';
import { RecordList, RecordListItem } from '../Components/RecordList/RecordList';
import { RecordPanel } from '../Components/RecordPanel/RecordPanel';
import { teamService } from '../Services/teamService';
import type { UpdateTeamRequest } from '../Types/team';
import { useTeamWorkspaceData } from './hooks/useTeamWorkspaceData';

export function TeamRecordsPage() {
  const { teams, persons, sprints, refresh } = useTeamWorkspaceData();
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  async function handleDelete(teamId: string) {
    await teamService.delete(teamId);
    await refresh();
  }

  function beginEdit(teamId: string, name: string) {
    setEditingTeamId(teamId);
    setEditName(name);
  }

  async function saveEdit(teamId: string) {
    const payload: UpdateTeamRequest = { name: editName };
    await teamService.update(teamId, payload);
    setEditingTeamId(null);
    setEditName('');
    await refresh();
  }

  return (
    <RecordPanel title="Connected teams" description="View each team together with its members and linked sprints.">
      {teams.length === 0 ? (
        <p>No teams created yet.</p>
      ) : (
        <RecordList>
          {teams.map((team) => {
            const memberCount = persons.filter((person) => person.teamId === team.id).length;
            const sprintCount = sprints.filter((sprint) => sprint.teamId === team.id).length;
            const isEditing = editingTeamId === team.id;

            return (
              <RecordListItem
                key={team.id}
                title={team.name}
                subtitle={`${memberCount} members • ${sprintCount} sprints`}
                actions={
                  isEditing ? (
                    <>
                      <button type="button" onClick={() => void saveEdit(team.id)}>Save</button>
                      <button type="button" onClick={() => setEditingTeamId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => beginEdit(team.id, team.name)}>Edit</button>
                      <button type="button" onClick={() => void handleDelete(team.id)}>Delete</button>
                    </>
                  )
                }
              >
                {isEditing ? (
                  <label>
                    <span>Name</span>
                    <input value={editName} onChange={(event) => setEditName(event.target.value)} />
                  </label>
                ) : (
                  <>
                    <span>Members: {memberCount}</span>
                    <span>Sprints: {sprintCount}</span>
                  </>
                )}
              </RecordListItem>
            );
          })}
        </RecordList>
      )}
    </RecordPanel>
  );
}
