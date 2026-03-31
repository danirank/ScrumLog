import { useEffect, useState } from 'react';
import { personService } from '../../Services/personService';
import { teamService } from '../../Services/teamService';
import type { Person } from '../../Types/person';
import type { Team } from '../../Types/team';

export function usePersonWorkspaceData() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  async function loadData() {
    try {
      const [loadedPersons, loadedTeams] = await Promise.all([
        personService.getAll(),
        teamService.getAll(),
      ]);
      setPersons(loadedPersons);
      setTeams(loadedTeams);
    } catch {
      setPersons([]);
      setTeams([]);
    }
  }

  useEffect(() => {
    void loadData();
  }, []);

  return { persons, teams, refresh: loadData };
}
