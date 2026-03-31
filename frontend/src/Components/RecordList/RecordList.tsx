import type { PropsWithChildren, ReactNode } from 'react';
import styles from './RecordList.module.css';

export function RecordList({ children }: PropsWithChildren) {
  return <div className={styles.list}>{children}</div>;
}

interface RecordListItemProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function RecordListItem({ title, subtitle, actions, children }: RecordListItemProps) {
  return (
    <article className={styles.item}>
      <div className={styles.topRow}>
        <div>
          <h3>{title}</h3>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </div>
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
      {children ? <div className={styles.meta}>{children}</div> : null}
    </article>
  );
}
