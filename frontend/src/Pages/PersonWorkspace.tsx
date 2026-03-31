import { Outlet } from 'react-router-dom';
import { SectionNavigation } from '../Components/SectionNavigation/SectionNavigation';
import { FormPageLayout } from './FormPageLayout';

export function PersonWorkspace() {
  return (
    <FormPageLayout
      eyebrow="People"
      title="People workspace"
      description="Track who is on each team and what roles are represented."
      navigation={
        <SectionNavigation
          items={[
            { to: '/persons', label: 'Overview', end: true },
            { to: '/persons/records', label: 'People' },
            { to: '/persons/create', label: 'Add person' },
          ]}
        />
      }
    >
      <Outlet />
    </FormPageLayout>
  );
}
