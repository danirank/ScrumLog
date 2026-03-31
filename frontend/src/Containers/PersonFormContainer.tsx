import { useEffect, useState } from 'react';
import { PersonForm } from '../Components/PersonForm/PersonForm';
import { personService } from '../Services/personService';
import { teamService } from '../Services/teamService';
import type { SelectOption } from '../Types/selectOption';

export function PersonFormContainer() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [teamId, setTeamId] = useState('');
  const [teamOptions, setTeamOptions] = useState<SelectOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function loadTeams() {
      try {
        const teams = await teamService.getAll();
        const options = teams.map((team) => ({ value: team.id, label: team.name }));
        setTeamOptions(options);
        setTeamId((current) => current || options[0]?.value || '');
      } catch {
        setTeamOptions([]);
      }
    }

    void loadTeams();
  }, []);

  async function handleSubmit() {
    setIsSubmitting(true);
    setStatusMessage(undefined);

    try {
      const created = await personService.create({ name, role, teamId });
      setName('');
      setRole('');
      setTeamId('');
      setIsError(false);
      setStatusMessage(`Created person ${created.name}.`);
    } catch (error) {
      setIsError(true);
      setStatusMessage(error instanceof Error ? error.message : 'Failed to create person.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PersonForm
      name={name}
      role={role}
      teamId={teamId}
      teamOptions={teamOptions}
      isSubmitting={isSubmitting}
      statusMessage={statusMessage}
      isError={isError}
      onNameChange={setName}
      onRoleChange={setRole}
      onTeamIdChange={setTeamId}
      onSubmit={handleSubmit}
    />
  );
}
