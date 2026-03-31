import { Outlet } from 'react-router-dom';
import { SectionNavigation } from '../Components/SectionNavigation/SectionNavigation';
import { FormPageLayout } from './FormPageLayout';

export function MeetingWorkspace() {
  return (
    <FormPageLayout
      eyebrow="Meetings"
      title="Meeting flow"
      description="Plan meetings first, then start them from Upcoming Meetings and complete them after execution."
      navigation={
        <SectionNavigation
          items={[
            { to: '/meetings', label: 'Overview', end: true },
            { to: '/meetings/plan', label: 'Plan meeting' },
            { to: '/meetings/upcoming', label: 'Upcoming meetings' },
            { to: '/meetings/in-progress', label: 'In progress' },
            { to: '/meetings/completed', label: 'Completed' },
          ]}
        />
      }
    >
      <Outlet />
    </FormPageLayout>
  );
}
