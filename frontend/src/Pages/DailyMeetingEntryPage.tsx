import { DailyMeetingEntryFormContainer } from '../Containers/DailyMeetingEntryFormContainer';
import { FormPageLayout } from './FormPageLayout';

export function DailyMeetingEntryPage() {
  return (
    <FormPageLayout title="Daily Meeting Entry" description="Capture yesterday, today, and blockers for one participant.">
      <DailyMeetingEntryFormContainer />
    </FormPageLayout>
  );
}
