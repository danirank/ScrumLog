import { FormActions } from '../FormActions/FormActions';
import { FormCard } from '../FormCard/FormCard';
import { FormField } from '../FormField/FormField';
import type { SelectOption } from '../../Types/selectOption';
import styles from './MeetingForm.module.css';

export type MeetingTypeValue = '' | 0 | 1 | 2 | 3 | 4;

export interface DailyParticipantEntryInput {
  yesterday: string;
  today: string;
  blockers: string;
}

interface MeetingFormProps {
  title: string;
  date: string;
  type: MeetingTypeValue;
  sprintId: string;
  sprintOptions: SelectOption[];
  participantOptions: SelectOption[];
  selectedParticipantIds: string[];
  agenda: string;
  notes: string;
  decisions: string;
  actions: string;
  demonstrated: string;
  completed: string;
  feedback: string;
  followUpItems: string;
  wentWell: string;
  wentLessWell: string;
  improvements: string;
  dailyEntries: Record<string, DailyParticipantEntryInput>;
  lockedFields?: Partial<Record<
    | 'title'
    | 'date'
    | 'type'
    | 'sprintId'
    | 'agenda'
    | 'notes'
    | 'decisions'
    | 'actions'
    | 'demonstrated'
    | 'completed'
    | 'feedback'
    | 'followUpItems'
    | 'wentWell'
    | 'wentLessWell'
    | 'improvements',
    boolean
  >>;
  lockedParticipantIds?: string[];
  lockedDailyEntries?: Record<string, Partial<Record<keyof DailyParticipantEntryInput, boolean>>>;
  isSubmitting: boolean;
  submitLabel: string;
  statusMessage?: string;
  isError?: boolean;
  onMarkCompleted?: () => void;
  onTitleChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onTypeChange: (value: MeetingTypeValue) => void;
  onSprintIdChange: (value: string) => void;
  onParticipantToggle: (participantId: string) => void;
  onAgendaChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onDecisionsChange: (value: string) => void;
  onActionsChange: (value: string) => void;
  onDemonstratedChange: (value: string) => void;
  onCompletedChange: (value: string) => void;
  onFeedbackChange: (value: string) => void;
  onFollowUpItemsChange: (value: string) => void;
  onWentWellChange: (value: string) => void;
  onWentLessWellChange: (value: string) => void;
  onImprovementsChange: (value: string) => void;
  onDailyEntryChange: (participantId: string, field: keyof DailyParticipantEntryInput, value: string) => void;
  onSubmit: () => void;
}

export function MeetingForm(props: MeetingFormProps) {
  const lockedFields = props.lockedFields ?? {};
  const lockedParticipantIds = props.lockedParticipantIds ?? [];
  const lockedDailyEntries = props.lockedDailyEntries ?? {};

  const selectedParticipantsLabel =
    props.selectedParticipantIds.length === 0
      ? 'Select participants'
      : `${props.selectedParticipantIds.length} selected`;

  function renderGeneralFields() {
    return (
      <>
        <h3>General details</h3>
        <FormField label="Agenda">
          <textarea value={props.agenda} onChange={(event) => props.onAgendaChange(event.target.value)} required readOnly={lockedFields.agenda} />
        </FormField>
        <FormField label="Notes">
          <textarea value={props.notes} onChange={(event) => props.onNotesChange(event.target.value)} required readOnly={lockedFields.notes} />
        </FormField>
        <FormField label="Decisions">
          <textarea value={props.decisions} onChange={(event) => props.onDecisionsChange(event.target.value)} required readOnly={lockedFields.decisions} />
        </FormField>
        <FormField label="Actions">
          <textarea value={props.actions} onChange={(event) => props.onActionsChange(event.target.value)} required readOnly={lockedFields.actions} />
        </FormField>
      </>
    );
  }

  function renderDailyFields() {
    return (
      <>
        <h3>Daily entries</h3>
        {props.selectedParticipantIds.length === 0 ? (
          <p>Select at least one participant to enter daily updates.</p>
        ) : (
          props.selectedParticipantIds.map((participantId) => {
            const participant = props.participantOptions.find((option) => option.value === participantId);
            const entry = props.dailyEntries[participantId] ?? { yesterday: '', today: '', blockers: '' };

            return (
              <section key={participantId}>
                <h4>{participant?.label ?? 'Participant'}</h4>
                <FormField label="What did you do yesterday?">
                  <textarea
                    value={entry.yesterday}
                    onChange={(event) => props.onDailyEntryChange(participantId, 'yesterday', event.target.value)}
                    required
                    readOnly={lockedDailyEntries[participantId]?.yesterday}
                  />
                </FormField>
                <FormField label="What will you do today?">
                  <textarea
                    value={entry.today}
                    onChange={(event) => props.onDailyEntryChange(participantId, 'today', event.target.value)}
                    required
                    readOnly={lockedDailyEntries[participantId]?.today}
                  />
                </FormField>
                <FormField label="Any blockers?">
                  <textarea
                    value={entry.blockers}
                    onChange={(event) => props.onDailyEntryChange(participantId, 'blockers', event.target.value)}
                    readOnly={lockedDailyEntries[participantId]?.blockers}
                  />
                </FormField>
              </section>
            );
          })
        )}
        <FormField label="Actions">
          <textarea value={props.actions} onChange={(event) => props.onActionsChange(event.target.value)} readOnly={lockedFields.actions} />
        </FormField>
      </>
    );
  }

  function renderReviewFields() {
    return (
      <>
        <h3>Review details</h3>
        <FormField label="Sprint Goal">
          <textarea value={props.completed} onChange={(event) => props.onCompletedChange(event.target.value)} required readOnly={lockedFields.completed} />
        </FormField>
        <FormField label="Demo (What was demonstrated)">
          <textarea value={props.demonstrated} onChange={(event) => props.onDemonstratedChange(event.target.value)} required readOnly={lockedFields.demonstrated} />
        </FormField>
        <FormField label="Feedback">
          <textarea value={props.feedback} onChange={(event) => props.onFeedbackChange(event.target.value)} required readOnly={lockedFields.feedback} />
        </FormField>
        <FormField label="Changes / Insights">
          <textarea value={props.followUpItems} onChange={(event) => props.onFollowUpItemsChange(event.target.value)} required readOnly={lockedFields.followUpItems} />
        </FormField>
        <FormField label="Next steps">
          <textarea value={props.actions} onChange={(event) => props.onActionsChange(event.target.value)} required readOnly={lockedFields.actions} />
        </FormField>
      </>
    );
  }

  function renderRetrospectiveFields() {
    return (
      <>
        <h3>Retrospective details</h3>
        <FormField label="What went well">
          <textarea value={props.wentWell} onChange={(event) => props.onWentWellChange(event.target.value)} required readOnly={lockedFields.wentWell} />
        </FormField>
        <FormField label="What went less well">
          <textarea value={props.wentLessWell} onChange={(event) => props.onWentLessWellChange(event.target.value)} required readOnly={lockedFields.wentLessWell} />
        </FormField>
        <FormField label="Improvements for next sprint">
          <textarea value={props.improvements} onChange={(event) => props.onImprovementsChange(event.target.value)} required readOnly={lockedFields.improvements} />
        </FormField>
        <FormField label="Actions">
          <textarea value={props.actions} onChange={(event) => props.onActionsChange(event.target.value)} required readOnly={lockedFields.actions} />
        </FormField>
      </>
    );
  }

  function renderSprintPlanningFields() {
    return (
      <>
        <h3>Sprint planning details</h3>
        <FormField label="Sprint value">
          <textarea value={props.agenda} onChange={(event) => props.onAgendaChange(event.target.value)} required readOnly={lockedFields.agenda} />
        </FormField>
        <FormField label="Definition of Done (Increment)">
          <textarea value={props.decisions} onChange={(event) => props.onDecisionsChange(event.target.value)} required readOnly={lockedFields.decisions} />
        </FormField>
        <FormField label="Sprint Goal">
          <textarea value={props.actions} onChange={(event) => props.onActionsChange(event.target.value)} required readOnly={lockedFields.actions} />
        </FormField>
        <FormField label="Notes">
          <textarea value={props.notes} onChange={(event) => props.onNotesChange(event.target.value)} readOnly={lockedFields.notes} />
        </FormField>
      </>
    );
  }

  function renderTypeSpecificFields() {
    if (props.type === '') {
      return null;
    }

    if (props.type === 0) {
      return renderGeneralFields();
    }

    if (props.type === 1) {
      return renderDailyFields();
    }

    if (props.type === 2) {
      return renderReviewFields();
    }

    if (props.type === 3) {
      return renderRetrospectiveFields();
    }

    return renderSprintPlanningFields();
  }

  return (
    <FormCard title="Meeting" description="Create a meeting and show only the fields needed for its type.">
      <form onSubmit={(event) => { event.preventDefault(); props.onSubmit(); }}>
        <h3>Base fields</h3>
        <FormField label="Title">
          <input value={props.title} onChange={(event) => props.onTitleChange(event.target.value)} required readOnly={lockedFields.title} />
        </FormField>
        <FormField label="Date">
          <input type="datetime-local" value={props.date} onChange={(event) => props.onDateChange(event.target.value)} required readOnly={lockedFields.date} />
        </FormField>
        <FormField label="Sprint">
          <select value={props.sprintId} onChange={(event) => props.onSprintIdChange(event.target.value)} required disabled={lockedFields.sprintId}>
            <option value="">Select a sprint</option>
            {props.sprintOptions.map((sprint) => (
              <option key={sprint.value} value={sprint.value}>
                {sprint.label}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Participants">
          <details className={styles.participantPicker}>
            <summary className={styles.summary}>{selectedParticipantsLabel}</summary>
            <div className={styles.options}>
              {props.participantOptions.map((participant) => (
                <label key={participant.value} className={styles.option}>
                  <span>{participant.label}</span>
                  <input
                    type="checkbox"
                    checked={props.selectedParticipantIds.includes(participant.value)}
                    onChange={() => props.onParticipantToggle(participant.value)}
                    disabled={lockedParticipantIds.includes(participant.value)}
                  />
                </label>
              ))}
            </div>
          </details>
        </FormField>
        <FormField label="Meeting type">
          <select
            value={props.type}
            onChange={(event) =>
              props.onTypeChange(event.target.value === '' ? '' : (Number(event.target.value) as MeetingTypeValue))
            }
            disabled={lockedFields.type}
          >
            <option value="">Select a meeting type</option>
            <option value={0}>General</option>
            <option value={1}>Daily</option>
            <option value={2}>Review</option>
            <option value={3}>Retrospective</option>
            <option value={4}>Sprint planning</option>
          </select>
        </FormField>

        {renderTypeSpecificFields()}

        <div className={styles.actionArea}>
          <FormActions
            isSubmitting={props.isSubmitting}
            submitLabel={props.submitLabel}
            statusMessage={props.statusMessage}
            isError={props.isError}
          />
          {props.onMarkCompleted ? (
            <div className={styles.completionAction}>
              <div className={styles.completionCopy}>
                <strong>Finish this meeting</strong>
                <p>Use this when the meeting is done and should move to Completed.</p>
              </div>
              <button
                className={styles.completeButton}
                type="button"
                onClick={props.onMarkCompleted}
                disabled={props.isSubmitting}
              >
                Mark as completed
              </button>
            </div>
          ) : null}
        </div>
      </form>
    </FormCard>
  );
}
