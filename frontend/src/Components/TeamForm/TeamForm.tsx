import { FormActions } from '../FormActions/FormActions';
import { FormCard } from '../FormCard/FormCard';
import { FormField } from '../FormField/FormField';

interface TeamFormProps {
  name: string;
  isSubmitting: boolean;
  statusMessage?: string;
  isError?: boolean;
  onNameChange: (value: string) => void;
  onSubmit: () => void;
}

export function TeamForm(props: TeamFormProps) {
  return (
    <FormCard title="Team" description="Create a new scrum team with a clear name.">
      <form onSubmit={(event) => { event.preventDefault(); props.onSubmit(); }}>
        <FormField label="Name">
          <input value={props.name} onChange={(event) => props.onNameChange(event.target.value)} required />
        </FormField>
        <FormActions
          isSubmitting={props.isSubmitting}
          submitLabel="Create team"
          statusMessage={props.statusMessage}
          isError={props.isError}
        />
      </form>
    </FormCard>
  );
}
