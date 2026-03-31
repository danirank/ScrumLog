import type { PropsWithChildren } from 'react';
import styles from './InsightGrid.module.css';

interface InsightCardProps extends PropsWithChildren {
  label: string;
  value: string | number;
}

export function InsightGrid({ children }: PropsWithChildren) {
  return <section className={styles.grid}>{children}</section>;
}

export function InsightCard({ label, value, children }: InsightCardProps) {
  return (
    <article className={styles.card}>
      <p className={styles.label}>{label}</p>
      <strong className={styles.value}>{value}</strong>
      {children ? <div className={styles.meta}>{children}</div> : null}
    </article>
  );
}
