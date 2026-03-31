import { FormActions } from '../FormActions/FormActions';
import { FormCard } from '../FormCard/FormCard';
import { FormField } from '../FormField/FormField';
import type { MeetingType } from '../../Types/meeting';
import type { SelectOption } from '../../Types/selectOption';

interface MeetingPlanFormProps {
  title: string;
  date: string;
  type: '' | MeetingType;
  sprintId: string;
  agenda: string;
  sprintOptions: SelectOption[];
  isSubmitting: boolean;
  submitLabel: string;
  description: string;
  statusMessage?: string;
  isError?: boolean;
  onTitleChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onTypeChange: (value: '' | MeetingType) => void;
  onSprintIdChange: (value: string) => void;
  onAgendaChange: (value: string) => void;
  onSubmit: () => void;
}

export function MeetingPlanForm(props: MeetingPlanFormProps) {
  return (
    <FormCard title="Plan meeting" description={props.description}>
      <form onSubmit={(event) => { event.preventDefault(); props.onSubmit(); }}>
        <FormField label="Title">
          <input value={props.title} onChange={(event) => props.onTitleChange(event.target.value)} required />
        </FormField>
        <FormField label="Meeting type">
          <select
            value={props.type}
            onChange={(event) => props.onTypeChange(event.target.value === '' ? '' : Number(event.target.value) as MeetingType)}
            required
          >
            <option value="">Select a meeting type</option>
            <option value={0}>General</option>
            <option value={1}>Daily</option>
            <option value={2}>Review</option>
            <option value={3}>Retrospective</option>
            <option value={4}>Sprint planning</option>
          </select>
        </FormField>
        <FormField label="Date">
          <input type="datetime-local" value={props.date} onChange={(event) => props.onDateChange(event.target.value)} required />
        </FormField>
        <FormField label="Sprint">
          <select value={props.sprintId} onChange={(event) => props.onSprintIdChange(event.target.value)}>
            <option value="">No sprint selected</option>
            {props.sprintOptions.map((sprint) => (
              <option key={sprint.value} value={sprint.value}>
                {sprint.label}
              </option>
            ))}
          </select>
        </FormField>
        {props.type === 0 ? (
          <FormField label="Agenda">
            <textarea value={props.agenda} onChange={(event) => props.onAgendaChange(event.target.value)} />
          </FormField>
        ) : null}
        <FormActions
          isSubmitting={props.isSubmitting}
          submitLabel={props.submitLabel}
          statusMessage={props.statusMessage}
          isError={props.isError}
        />
      </form>
    </FormCard>
  );
}
