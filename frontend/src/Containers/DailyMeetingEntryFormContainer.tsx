import { useEffect, useState } from 'react';
import { DailyMeetingEntryForm } from '../Components/DailyMeetingEntryForm/DailyMeetingEntryForm';
import { dailyMeetingEntryService } from '../Services/dailyMeetingEntryService';
import { meetingService } from '../Services/meetingService';
import { personService } from '../Services/personService';
import type { SelectOption } from '../Types/selectOption';

export function DailyMeetingEntryFormContainer() {
  const [meetingId, setMeetingId] = useState('');
  const [personId, setPersonId] = useState('');
  const [meetingOptions, setMeetingOptions] = useState<SelectOption[]>([]);
  const [personOptions, setPersonOptions] = useState<SelectOption[]>([]);
  const [yesterday, setYesterday] = useState('');
  const [today, setToday] = useState('');
  const [blockers, setBlockers] = useState('');
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
      await dailyMeetingEntryService.create({
        meetingId,
        personId,
        yesterday,
        today,
        blockers: blockers || null,
      });

      setMeetingId('');
      setPersonId('');
      setYesterday('');
      setToday('');
      setBlockers('');
      setIsError(false);
      setStatusMessage('Created daily meeting entry.');
    } catch (error) {
      setIsError(true);
      setStatusMessage(error instanceof Error ? error.message : 'Failed to create daily meeting entry.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <DailyMeetingEntryForm
      meetingId={meetingId}
      personId={personId}
      meetingOptions={meetingOptions}
      personOptions={personOptions}
      yesterday={yesterday}
      today={today}
      blockers={blockers}
      isSubmitting={isSubmitting}
      statusMessage={statusMessage}
      isError={isError}
      onMeetingIdChange={setMeetingId}
      onPersonIdChange={setPersonId}
      onYesterdayChange={setYesterday}
      onTodayChange={setToday}
      onBlockersChange={setBlockers}
      onSubmit={handleSubmit}
    />
  );
}
