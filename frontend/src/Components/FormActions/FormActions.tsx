import styles from './FormActions.module.css';

interface FormActionsProps {
  isSubmitting: boolean;
  submitLabel: string;
  statusMessage?: string;
  isError?: boolean;
}

export function FormActions({ isSubmitting, submitLabel, statusMessage, isError = false }: FormActionsProps) {
  return (
    <div className={styles.actions}>
      <button className={styles.button} type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
      {statusMessage ? (
        <p className={isError ? styles.error : styles.success}>{statusMessage}</p>
      ) : null}
    </div>
  );
}
