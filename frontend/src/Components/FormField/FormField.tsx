import type { PropsWithChildren } from 'react';
import styles from './FormField.module.css';

interface FormFieldProps extends PropsWithChildren {
  label: string;
}

export function FormField({ label, children }: FormFieldProps) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      {children}
    </label>
  );
}
