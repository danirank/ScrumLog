import { Outlet } from 'react-router-dom';
import { SectionNavigation } from '../Components/SectionNavigation/SectionNavigation';
import { FormPageLayout } from './FormPageLayout';

export function TeamWorkspace() {
  return (
    <FormPageLayout
      eyebrow="Teams"
      title="Team workspace"
      description="Create the delivery groups that everything else in the app builds on."
      navigation={
        <SectionNavigation
          items={[
            { to: '/teams', label: 'Overview', end: true },
            { to: '/teams/records', label: 'Teams' },
            { to: '/teams/create', label: 'Create team' },
          ]}
        />
      }
    >
      <Outlet />
    </FormPageLayout>
  );
}
