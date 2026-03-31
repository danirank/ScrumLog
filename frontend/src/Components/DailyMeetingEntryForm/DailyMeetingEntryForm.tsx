import { FormActions } from '../FormActions/FormActions';
import { FormCard } from '../FormCard/FormCard';
import { FormField } from '../FormField/FormField';
import type { SelectOption } from '../../Types/selectOption';

interface DailyMeetingEntryFormProps {
  meetingId: string;
  personId: string;
  meetingOptions: SelectOption[];
  personOptions: SelectOption[];
  yesterday: string;
  today: string;
  blockers: string;
  isSubmitting: boolean;
  statusMessage?: string;
  isError?: boolean;
  onMeetingIdChange: (value: string) => void;
  onPersonIdChange: (value: string) => void;
  onYesterdayChange: (value: string) => void;
  onTodayChange: (value: string) => void;
  onBlockersChange: (value: string) => void;
  onSubmit: () => void;
}

export function DailyMeetingEntryForm(props: DailyMeetingEntryFormProps) {
  return (
    <FormCard title="Daily Entry" description="Capture what one person did, plans next, and blockers.">
      <form onSubmit={(event) => { event.preventDefault(); props.onSubmit(); }}>
        <FormField label="Meeting">
          <select value={props.meetingId} onChange={(event) => props.onMeetingIdChange(event.target.value)} required>
            <option value="">Select a meeting</option>
            {props.meetingOptions.map((meeting) => (
              <option key={meeting.value} value={meeting.value}>
                {meeting.label}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Person">
          <select value={props.personId} onChange={(event) => props.onPersonIdChange(event.target.value)} required>
            <option value="">Select a person</option>
            {props.personOptions.map((person) => (
              <option key={person.value} value={person.value}>
                {person.label}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Yesterday">
          <textarea value={props.yesterday} onChange={(event) => props.onYesterdayChange(event.target.value)} required />
        </FormField>
        <FormField label="Today">
          <textarea value={props.today} onChange={(event) => props.onTodayChange(event.target.value)} required />
        </FormField>
        <FormField label="Blockers">
          <textarea value={props.blockers} onChange={(event) => props.onBlockersChange(event.target.value)} />
        </FormField>
        <FormActions
          isSubmitting={props.isSubmitting}
          submitLabel="Create daily entry"
          statusMessage={props.statusMessage}
          isError={props.isError}
        />
      </form>
    </FormCard>
  );
}
