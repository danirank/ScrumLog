import { MeetingParticipantFormContainer } from '../Containers/MeetingParticipantFormContainer';
import { FormPageLayout } from './FormPageLayout';

export function MeetingParticipantPage() {
  return (
    <FormPageLayout title="Meeting Participant" description="Attach a person to a meeting through the linking entity.">
      <MeetingParticipantFormContainer />
    </FormPageLayout>
  );
}
