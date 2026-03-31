import { Outlet } from 'react-router-dom';
import { SectionNavigation } from '../Components/SectionNavigation/SectionNavigation';
import { FormPageLayout } from './FormPageLayout';

export function SprintWorkspace() {
  return (
    <FormPageLayout
      eyebrow="Sprints"
      title="Sprint workspace"
      description="Plan sprint windows and keep a quick read on what is current, planned, and completed."
      navigation={
        <SectionNavigation
          items={[
            { to: '/sprints', label: 'Overview', end: true },
            { to: '/sprints/records', label: 'Sprints' },
            { to: '/sprints/create', label: 'Create sprint' },
          ]}
        />
      }
    >
      <Outlet />
    </FormPageLayout>
  );
}
