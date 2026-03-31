import { useState } from 'react';
import { RecordList, RecordListItem } from '../Components/RecordList/RecordList';
import { RecordPanel } from '../Components/RecordPanel/RecordPanel';
import { sprintService } from '../Services/sprintService';
import type { UpdateSprintRequest } from '../Types/sprint';
import { useSprintWorkspaceData } from './hooks/useSprintWorkspaceData';

function formatDate(value: string) {
  return new Date(value).toLocaleDateString();
}

export function SprintRecordsPage() {
  const { sprints, teams, meetings, refresh } = useSprintWorkspaceData();
  const [editingSprintId, setEditingSprintId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editStartDate, setEditStartDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');
  const [editTeamId, setEditTeamId] = useState('');
  const now = new Date();

  function beginEdit(sprintId: string, name: string, startDate: string, endDate: string, teamId: string) {
    setEditingSprintId(sprintId);
    setEditName(name);
    setEditStartDate(startDate.slice(0, 16));
    setEditEndDate(endDate.slice(0, 16));
    setEditTeamId(teamId);
  }

  async function saveEdit(sprintId: string) {
    const payload: UpdateSprintRequest = {
      name: editName,
      startDate: editStartDate,
      endDate: editEndDate,
      teamId: editTeamId,
    };
    await sprintService.update(sprintId, payload);
    setEditingSprintId(null);
    await refresh();
  }

  async function handleDelete(sprintId: string) {
    await sprintService.delete(sprintId);
    await refresh();
  }

  return (
    <RecordPanel title="Connected sprints" description="View each sprint with its team, time window, and attached meetings.">
      {sprints.length === 0 ? (
        <p>No sprints created yet.</p>
      ) : (
        <RecordList>
          {sprints.map((sprint) => {
            const team = teams.find((item) => item.id === sprint.teamId);
            const sprintMeetings = meetings.filter((meeting) => meeting.sprintId === sprint.id);
            const isEditing = editingSprintId === sprint.id;

            return (
              <RecordListItem
                key={sprint.id}
                title={sprint.name}
                subtitle={`${team?.name ?? 'Unknown team'} • ${formatDate(sprint.startDate)} to ${formatDate(sprint.endDate)}`}
                actions={
                  isEditing ? (
                    <>
                      <button type="button" onClick={() => void saveEdit(sprint.id)}>Save</button>
                      <button type="button" onClick={() => setEditingSprintId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => beginEdit(sprint.id, sprint.name, sprint.startDate, sprint.endDate, sprint.teamId)}>Edit</button>
                      <button type="button" onClick={() => void handleDelete(sprint.id)}>Delete</button>
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
                      <span>Start</span>
                      <input type="datetime-local" value={editStartDate} onChange={(event) => setEditStartDate(event.target.value)} />
                    </label>
                    <label>
                      <span>End</span>
                      <input type="datetime-local" value={editEndDate} onChange={(event) => setEditEndDate(event.target.value)} />
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
                    <span>Meetings: {sprintMeetings.length}</span>
                    <span>Status: {new Date(sprint.endDate) < now ? 'Finished' : new Date(sprint.startDate) > now ? 'Planned' : 'Current'}</span>
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
