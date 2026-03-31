import { useEffect, useState } from 'react';
import styles from './DashboardPage.module.css';
import { meetingService } from '../Services/meetingService';
import type { Meeting } from '../Types/meeting';

export function DashboardMeetingStatusPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        setMeetings(await meetingService.getAll());
      } catch {
        setMeetings([]);
      }
    }

    void loadData();
  }, []);

  const upcomingMeetings = meetings.filter((meeting) => meeting.status === 0);
  const activeMeetings = meetings.filter((meeting) => meeting.status === 1);
  const completedMeetings = meetings.filter((meeting) => meeting.status === 2);

  return (
    <section className={styles.columns}>
      <article className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Meeting pipeline</h2>
          <p>Planned and in-progress ceremonies at a glance.</p>
        </div>
        <div className={styles.pipeline}>
          <div className={styles.pipelineCard}>
            <span>Planned</span>
            <strong>{upcomingMeetings.length}</strong>
          </div>
          <div className={styles.pipelineCard}>
            <span>In progress</span>
            <strong>{activeMeetings.length}</strong>
          </div>
          <div className={styles.pipelineCard}>
            <span>Completed</span>
            <strong>{completedMeetings.length}</strong>
          </div>
        </div>
      </article>
    </section>
  );
}
