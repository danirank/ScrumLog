import { useEffect, useState } from 'react';
import styles from './DashboardPage.module.css';
import { meetingService } from '../Services/meetingService';
import { sprintService } from '../Services/sprintService';
import type { Meeting } from '../Types/meeting';
import type { Sprint } from '../Types/sprint';

export function DashboardSummaryPage() {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [loadedSprints, loadedMeetings] = await Promise.all([
          sprintService.getAll(),
          meetingService.getAll(),
        ]);

        setSprints(loadedSprints);
        setMeetings(loadedMeetings);
      } catch {
        setSprints([]);
        setMeetings([]);
      }
    }

    void loadData();
  }, []);

  const now = new Date();
  const finishedSprints = sprints.filter((sprint) => new Date(sprint.endDate) < now);
  const currentSprint = sprints.find(
    (sprint) => new Date(sprint.startDate) <= now && new Date(sprint.endDate) >= now,
  );
  const plannedSprints = sprints.filter((sprint) => new Date(sprint.startDate) > now);
  const upcomingMeetings = meetings.filter((meeting) => meeting.status === 0);

  return (
    <section className={styles.heroGrid}>
      <article className={styles.statCard}>
        <p>Finished sprints</p>
        <strong>{finishedSprints.length}</strong>
      </article>
      <article className={styles.statCard}>
        <p>Current sprint</p>
        <strong>{currentSprint ? currentSprint.name : 'None active'}</strong>
      </article>
      <article className={styles.statCard}>
        <p>Planned sprints</p>
        <strong>{plannedSprints.length}</strong>
      </article>
      <article className={styles.statCard}>
        <p>Upcoming meetings</p>
        <strong>{upcomingMeetings.length}</strong>
      </article>
    </section>
  );
}
