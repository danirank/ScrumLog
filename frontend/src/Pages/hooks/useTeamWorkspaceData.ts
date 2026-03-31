import { useEffect, useState } from 'react';
import { personService } from '../../Services/personService';
import { sprintService } from '../../Services/sprintService';
import { teamService } from '../../Services/teamService';
import type { Person } from '../../Types/person';
import type { Sprint } from '../../Types/sprint';
import type { Team } from '../../Types/team';

export function useTeamWorkspaceData() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [persons, setPersons] = useState<Person[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);

  async function loadData() {
    try {
      const [loadedTeams, loadedPersons, loadedSprints] = await Promise.all([
        teamService.getAll(),
        personService.getAll(),
        sprintService.getAll(),
      ]);

      setTeams(loadedTeams);
      setPersons(loadedPersons);
      setSprints(loadedSprints);
    } catch {
      setTeams([]);
      setPersons([]);
      setSprints([]);
    }
  }

  useEffect(() => {
    void loadData();
  }, []);

  return { teams, persons, sprints, refresh: loadData };
}
