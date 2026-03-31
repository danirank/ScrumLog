import { FormActions } from '../FormActions/FormActions';
import { FormCard } from '../FormCard/FormCard';
import { FormField } from '../FormField/FormField';
import type { SelectOption } from '../../Types/selectOption';

interface MeetingParticipantFormProps {
  meetingId: string;
  personId: string;
  meetingOptions: SelectOption[];
  personOptions: SelectOption[];
  isSubmitting: boolean;
  statusMessage?: string;
  isError?: boolean;
  onMeetingIdChange: (value: string) => void;
  onPersonIdChange: (value: string) => void;
  onSubmit: () => void;
}

export function MeetingParticipantForm(props: MeetingParticipantFormProps) {
  return (
    <FormCard title="Meeting Participant" description="Link a person to a meeting.">
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
        <FormActions
          isSubmitting={props.isSubmitting}
          submitLabel="Create participant"
          statusMessage={props.statusMessage}
          isError={props.isError}
        />
      </form>
    </FormCard>
  );
}
