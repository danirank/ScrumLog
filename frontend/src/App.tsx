import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NavigationMenu } from './Components/NavigationMenu/NavigationMenu';
import { DashboardMeetingStatusPage } from './Pages/DashboardMeetingStatusPage';
import { DashboardSprintStatusPage } from './Pages/DashboardSprintStatusPage';
import { DashboardSummaryPage } from './Pages/DashboardSummaryPage';
import { DashboardWorkspace } from './Pages/DashboardWorkspace';
import { MeetingParticipantPage } from './Pages/MeetingParticipantPage';
import { MeetingCompletedPage } from './Pages/MeetingCompletedPage';
import { MeetingInProgressPage } from './Pages/MeetingInProgressPage';
import { MeetingOverviewPage } from './Pages/MeetingOverviewPage';
import { MeetingPlanPage } from './Pages/MeetingPlanPage';
import { MeetingUpcomingPage } from './Pages/MeetingUpcomingPage';
import { MeetingWorkspace } from './Pages/MeetingWorkspace';
import { PersonCreatePage } from './Pages/PersonCreatePage';
import { PersonOverviewPage } from './Pages/PersonOverviewPage';
import { PersonRecordsPage } from './Pages/PersonRecordsPage';
import { PersonWorkspace } from './Pages/PersonWorkspace';
import { SprintCreatePage } from './Pages/SprintCreatePage';
import { SprintOverviewPage } from './Pages/SprintOverviewPage';
import { SprintRecordsPage } from './Pages/SprintRecordsPage';
import { SprintWorkspace } from './Pages/SprintWorkspace';
import { TeamCreatePage } from './Pages/TeamCreatePage';
import { TeamOverviewPage } from './Pages/TeamOverviewPage';
import { TeamRecordsPage } from './Pages/TeamRecordsPage';
import { TeamWorkspace } from './Pages/TeamWorkspace';

function App() {
  return (
    <main className="appShell">
      <aside className="sidebar">
        <div className="brandPanel">
          <p className="kicker">ScrumLog</p>
          <h1>Plan the room. Run the sprint. Capture the outcome.</h1>
          <p className="lede">
            A compact workspace for building teams, planning meetings, and moving each ceremony
            from setup to completion without leaving the flow.
          </p>
        </div>

        <div className="sideBlock">
          <p className="blockLabel">Workspace</p>
          <NavigationMenu />
        </div>

        <div className="sideBlock tipsBlock">
          <p className="blockLabel">Flow</p>
          <ul className="tipsList">
            <li>Create teams, people, and sprints first.</li>
            <li>Plan meetings before starting them.</li>
            <li>Start a meeting to unlock participants and live notes.</li>
          </ul>
        </div>
      </aside>

      <section className="workspace">
        <Routes>
          <Route path="/" element={<DashboardWorkspace />}>
            <Route index element={<DashboardSummaryPage />} />
            <Route path="sprint-status" element={<DashboardSprintStatusPage />} />
            <Route path="meeting-status" element={<DashboardMeetingStatusPage />} />
          </Route>
          <Route path="/teams" element={<TeamWorkspace />}>
            <Route index element={<TeamOverviewPage />} />
            <Route path="records" element={<TeamRecordsPage />} />
            <Route path="create" element={<TeamCreatePage />} />
          </Route>
          <Route path="/persons" element={<PersonWorkspace />}>
            <Route index element={<PersonOverviewPage />} />
            <Route path="records" element={<PersonRecordsPage />} />
            <Route path="create" element={<PersonCreatePage />} />
          </Route>
          <Route path="/sprints" element={<SprintWorkspace />}>
            <Route index element={<SprintOverviewPage />} />
            <Route path="records" element={<SprintRecordsPage />} />
            <Route path="create" element={<SprintCreatePage />} />
          </Route>
          <Route path="/meetings" element={<MeetingWorkspace />}>
            <Route index element={<MeetingOverviewPage />} />
            <Route path="plan" element={<MeetingPlanPage />} />
            <Route path="upcoming" element={<MeetingUpcomingPage />} />
            <Route path="in-progress" element={<MeetingInProgressPage />} />
            <Route path="completed" element={<MeetingCompletedPage />} />
          </Route>
          <Route path="/meeting-participants" element={<MeetingParticipantPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
