import type { PropsWithChildren, ReactNode } from 'react';
import styles from './RecordPanel.module.css';

interface RecordPanelProps extends PropsWithChildren {
  title: string;
  description: string;
  actions?: ReactNode;
}

export function RecordPanel({ title, description, actions, children }: RecordPanelProps) {
  return (
    <section className={styles.panel}>
      <header className={styles.header}>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        {actions ? <div className={styles.headerActions}>{actions}</div> : null}
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
