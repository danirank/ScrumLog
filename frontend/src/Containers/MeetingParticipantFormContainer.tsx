import { useEffect, useState } from 'react';
import { MeetingParticipantForm } from '../Components/MeetingParticipantForm/MeetingParticipantForm';
import { meetingParticipantService } from '../Services/meetingParticipantService';
import { meetingService } from '../Services/meetingService';
import { personService } from '../Services/personService';
import type { SelectOption } from '../Types/selectOption';

export function MeetingParticipantFormContainer() {
  const [meetingId, setMeetingId] = useState('');
  const [personId, setPersonId] = useState('');
  const [meetingOptions, setMeetingOptions] = useState<SelectOption[]>([]);
  const [personOptions, setPersonOptions] = useState<SelectOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function loadOptions() {
      try {
        const [meetings, persons] = await Promise.all([
          meetingService.getAll(),
          personService.getAll(),
        ]);

        const mappedMeetings = meetings.map((meeting) => ({ value: meeting.id, label: meeting.title }));
        const mappedPersons = persons.map((person) => ({ value: person.id, label: `${person.name} (${person.role})` }));

        setMeetingOptions(mappedMeetings);
        setPersonOptions(mappedPersons);
        setMeetingId((current) => current || mappedMeetings[0]?.value || '');
        setPersonId((current) => current || mappedPersons[0]?.value || '');
      } catch {
        setMeetingOptions([]);
        setPersonOptions([]);
      }
    }

    void loadOptions();
  }, []);

  async function handleSubmit() {
    setIsSubmitting(true);
    setStatusMessage(undefined);

    try {
      await meetingParticipantService.create({ meetingId, personId });
      setMeetingId('');
      setPersonId('');
      setIsError(false);
      setStatusMessage('Created meeting participant link.');
    } catch (error) {
      setIsError(true);
      setStatusMessage(error instanceof Error ? error.message : 'Failed to create meeting participant.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <MeetingParticipantForm
      meetingId={meetingId}
      personId={personId}
      meetingOptions={meetingOptions}
      personOptions={personOptions}
      isSubmitting={isSubmitting}
      statusMessage={statusMessage}
      isError={isError}
      onMeetingIdChange={setMeetingId}
      onPersonIdChange={setPersonId}
      onSubmit={handleSubmit}
    />
  );
}
