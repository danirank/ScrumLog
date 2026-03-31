import { useEffect, useState } from 'react';
import { meetingService } from '../../Services/meetingService';
import { sprintService } from '../../Services/sprintService';
import { teamService } from '../../Services/teamService';
import type { Meeting } from '../../Types/meeting';
import type { Sprint } from '../../Types/sprint';
import type { Team } from '../../Types/team';

export function useSprintWorkspaceData() {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  async function loadData() {
    try {
      const [loadedSprints, loadedTeams, loadedMeetings] = await Promise.all([
        sprintService.getAll(),
        teamService.getAll(),
        meetingService.getAll(),
      ]);
      setSprints(loadedSprints);
      setTeams(loadedTeams);
      setMeetings(loadedMeetings);
    } catch {
      setSprints([]);
      setTeams([]);
      setMeetings([]);
    }
  }

  useEffect(() => {
    void loadData();
  }, []);

  return { sprints, teams, meetings, refresh: loadData };
}
