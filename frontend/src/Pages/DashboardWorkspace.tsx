import { Outlet } from 'react-router-dom';
import { SectionNavigation } from '../Components/SectionNavigation/SectionNavigation';
import { FormPageLayout } from './FormPageLayout';

export function DashboardWorkspace() {
  return (
    <FormPageLayout
      eyebrow="Overview"
      title="Dashboard"
      description="A quick view of sprint timing and what is waiting to happen next."
      navigation={
        <SectionNavigation
          items={[
            { to: '/', label: 'Summary', end: true },
            { to: '/sprint-status', label: 'Sprints' },
            { to: '/meeting-status', label: 'Meetings' },
          ]}
        />
      }
    >
      <Outlet />
    </FormPageLayout>
  );
}
