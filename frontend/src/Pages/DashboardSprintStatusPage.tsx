import { useEffect, useState } from 'react';
import styles from './DashboardPage.module.css';
import { sprintService } from '../Services/sprintService';
import type { Sprint } from '../Types/sprint';

function formatDate(value: string) {
  return new Date(value).toLocaleDateString();
}

export function DashboardSprintStatusPage() {
  const [sprints, setSprints] = useState<Sprint[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        setSprints(await sprintService.getAll());
      } catch {
        setSprints([]);
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

  return (
    <section className={styles.columns}>
      <article className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Current sprint</h2>
          <p>What the team should be focused on right now.</p>
        </div>
        {currentSprint ? (
          <div className={styles.detailCard}>
            <h3>{currentSprint.name}</h3>
            <p>
              {formatDate(currentSprint.startDate)} to {formatDate(currentSprint.endDate)}
            </p>
            <p>{currentSprint.meetingIds.length} meetings attached.</p>
          </div>
        ) : (
          <p className={styles.empty}>No sprint is currently active.</p>
        )}
      </article>

      <article className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Planned sprints</h2>
          <p>What is queued after the current sprint.</p>
        </div>
        {plannedSprints.length === 0 ? (
          <p className={styles.empty}>No planned sprints yet.</p>
        ) : (
          <ul className={styles.list}>
            {plannedSprints.slice(0, 5).map((sprint) => (
              <li key={sprint.id} className={styles.listItem}>
                <h3>{sprint.name}</h3>
                <p>{formatDate(sprint.startDate)} to {formatDate(sprint.endDate)}</p>
              </li>
            ))}
          </ul>
        )}
      </article>

      <article className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Finished sprints</h2>
          <p>Recently completed sprint windows.</p>
        </div>
        {finishedSprints.length === 0 ? (
          <p className={styles.empty}>No finished sprints yet.</p>
        ) : (
          <ul className={styles.list}>
            {finishedSprints.slice(-5).reverse().map((sprint) => (
              <li key={sprint.id} className={styles.listItem}>
                <h3>{sprint.name}</h3>
                <p>Ended {formatDate(sprint.endDate)}</p>
              </li>
            ))}
          </ul>
        )}
      </article>
    </section>
  );
}
