import { useState } from 'react';
import { RecordList, RecordListItem } from '../Components/RecordList/RecordList';
import { RecordPanel } from '../Components/RecordPanel/RecordPanel';
import { personService } from '../Services/personService';
import type { UpdatePersonRequest } from '../Types/person';
import { usePersonWorkspaceData } from './hooks/usePersonWorkspaceData';

export function PersonRecordsPage() {
  const { persons, teams, refresh } = usePersonWorkspaceData();
  const [editingPersonId, setEditingPersonId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editTeamId, setEditTeamId] = useState('');

  function beginEdit(personId: string, name: string, role: string, teamId: string) {
    setEditingPersonId(personId);
    setEditName(name);
    setEditRole(role);
    setEditTeamId(teamId);
  }

  async function saveEdit(personId: string) {
    const payload: UpdatePersonRequest = { name: editName, role: editRole, teamId: editTeamId };
    await personService.update(personId, payload);
    setEditingPersonId(null);
    await refresh();
  }

  async function handleDelete(personId: string) {
    await personService.delete(personId);
    await refresh();
  }

  return (
    <RecordPanel title="Connected people" description="View each person with their role and assigned team.">
      {persons.length === 0 ? (
        <p>No people created yet.</p>
      ) : (
        <RecordList>
          {persons.map((person) => {
            const team = teams.find((item) => item.id === person.teamId);
            const isEditing = editingPersonId === person.id;

            return (
              <RecordListItem
                key={person.id}
                title={person.name}
                subtitle={`${person.role} • ${team?.name ?? 'No team'}`}
                actions={
                  isEditing ? (
                    <>
                      <button type="button" onClick={() => void saveEdit(person.id)}>Save</button>
                      <button type="button" onClick={() => setEditingPersonId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => beginEdit(person.id, person.name, person.role, person.teamId)}>Edit</button>
                      <button type="button" onClick={() => void handleDelete(person.id)}>Delete</button>
                    </>
                  )
                }
              >
                {isEditing ? (
                  <>
                    <label>
                      <span>Name</span>
                      <input value={editName} onChange={(event) => setEditName(event.target.value)} />
                    </label>
                    <label>
                      <span>Role</span>
                      <input value={editRole} onChange={(event) => setEditRole(event.target.value)} />
                    </label>
                    <label>
                      <span>Team</span>
                      <select value={editTeamId} onChange={(event) => setEditTeamId(event.target.value)}>
                        {teams.map((teamOption) => (
                          <option key={teamOption.id} value={teamOption.id}>{teamOption.name}</option>
                        ))}
                      </select>
                    </label>
                  </>
                ) : (
                  <>
                    <span>Team: {team?.name ?? 'Unknown'}</span>
                    <span>Role: {person.role}</span>
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
