import { useEffect, useState } from 'react';
import { SprintForm } from '../Components/SprintForm/SprintForm';
import { sprintService } from '../Services/sprintService';
import { teamService } from '../Services/teamService';
import type { SelectOption } from '../Types/selectOption';

export function SprintFormContainer() {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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
      const created = await sprintService.create({ name, startDate, endDate, teamId });
      setName('');
      setStartDate('');
      setEndDate('');
      setTeamId('');
      setIsError(false);
      setStatusMessage(`Created sprint ${created.name}.`);
    } catch (error) {
      setIsError(true);
      setStatusMessage(error instanceof Error ? error.message : 'Failed to create sprint.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SprintForm
      name={name}
      startDate={startDate}
      endDate={endDate}
      teamId={teamId}
      teamOptions={teamOptions}
      isSubmitting={isSubmitting}
      statusMessage={statusMessage}
      isError={isError}
      onNameChange={setName}
      onStartDateChange={setStartDate}
      onEndDateChange={setEndDate}
      onTeamIdChange={setTeamId}
      onSubmit={handleSubmit}
    />
  );
}
