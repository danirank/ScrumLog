import { FormActions } from '../FormActions/FormActions';
import { FormCard } from '../FormCard/FormCard';
import { FormField } from '../FormField/FormField';
import type { SelectOption } from '../../Types/selectOption';

interface SprintFormProps {
  name: string;
  startDate: string;
  endDate: string;
  teamId: string;
  teamOptions: SelectOption[];
  isSubmitting: boolean;
  statusMessage?: string;
  isError?: boolean;
  onNameChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onTeamIdChange: (value: string) => void;
  onSubmit: () => void;
}

export function SprintForm(props: SprintFormProps) {
  return (
    <FormCard title="Sprint" description="Create a sprint window and associate it with a team.">
      <form onSubmit={(event) => { event.preventDefault(); props.onSubmit(); }}>
        <FormField label="Name">
          <input value={props.name} onChange={(event) => props.onNameChange(event.target.value)} required />
        </FormField>
        <FormField label="Start Date">
          <input type="datetime-local" value={props.startDate} onChange={(event) => props.onStartDateChange(event.target.value)} required />
        </FormField>
        <FormField label="End Date">
          <input type="datetime-local" value={props.endDate} onChange={(event) => props.onEndDateChange(event.target.value)} required />
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
          submitLabel="Create sprint"
          statusMessage={props.statusMessage}
          isError={props.isError}
        />
      </form>
    </FormCard>
  );
}
