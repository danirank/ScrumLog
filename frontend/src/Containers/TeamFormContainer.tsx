import { useState } from 'react';
import { TeamForm } from '../Components/TeamForm/TeamForm';
import { teamService } from '../Services/teamService';

export function TeamFormContainer() {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>();
  const [isError, setIsError] = useState(false);

  async function handleSubmit() {
    setIsSubmitting(true);
    setStatusMessage(undefined);

    try {
      const created = await teamService.create({ name });
      setName('');
      setIsError(false);
      setStatusMessage(`Created team ${created.name}.`);
    } catch (error) {
      setIsError(true);
      setStatusMessage(error instanceof Error ? error.message : 'Failed to create team.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <TeamForm
      name={name}
      isSubmitting={isSubmitting}
      statusMessage={statusMessage}
      isError={isError}
      onNameChange={setName}
      onSubmit={handleSubmit}
    />
  );
}
