import type { PropsWithChildren, ReactNode } from 'react';
import styles from './FormCard.module.css';

interface FormCardProps extends PropsWithChildren {
  title: string;
  description: string;
  footer?: ReactNode;
}

export function FormCard({ title, description, footer, children }: FormCardProps) {
  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Create</p>
        <h2>{title}</h2>
        <p className={styles.description}>{description}</p>
      </header>
      <div className={styles.body}>{children}</div>
      {footer ? <footer className={styles.footer}>{footer}</footer> : null}
    </section>
  );
}
