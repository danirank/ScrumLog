import { FormActions } from '../FormActions/FormActions';
import { FormCard } from '../FormCard/FormCard';
import { FormField } from '../FormField/FormField';
import type { SelectOption } from '../../Types/selectOption';

interface PersonFormProps {
  name: string;
  role: string;
  teamId: string;
  teamOptions: SelectOption[];
  isSubmitting: boolean;
  statusMessage?: string;
  isError?: boolean;
  onNameChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onTeamIdChange: (value: string) => void;
  onSubmit: () => void;
}

export function PersonForm(props: PersonFormProps) {
  return (
    <FormCard title="Person" description="Add a team member and attach them to an existing team.">
      <form onSubmit={(event) => { event.preventDefault(); props.onSubmit(); }}>
        <FormField label="Name">
          <input value={props.name} onChange={(event) => props.onNameChange(event.target.value)} required />
        </FormField>
        <FormField label="Role">
          <input value={props.role} onChange={(event) => props.onRoleChange(event.target.value)} required />
        </FormField>
        <FormField label="Team">
          <select value={props.teamId} onChange={(event) => props.onTeamIdChange(event.target.value)} required>
            <option value="">Select a team</option>
            {props.teamOptions.map((team) => (
              <option key={team.value} value={team.value}>
                {team.label}
              </option>
            ))}
          </select>
        </FormField>
        <FormActions
          isSubmitting={props.isSubmitting}
          submitLabel="Create person"
          statusMessage={props.statusMessage}
          isError={props.isError}
        />
      </form>
    </FormCard>
  );
}
