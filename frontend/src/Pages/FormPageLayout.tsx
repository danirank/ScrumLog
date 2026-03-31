import type { PropsWithChildren } from 'react';
import type { ReactNode } from 'react';
import styles from './FormPageLayout.module.css';

interface FormPageLayoutProps extends PropsWithChildren {
  title: string;
  description: string;
  eyebrow?: string;
  navigation?: ReactNode;
}

export function FormPageLayout({ title, description, eyebrow = 'Workspace', navigation, children }: FormPageLayoutProps) {
  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        {navigation ? <div className={styles.navigation}>{navigation}</div> : null}
      </header>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
