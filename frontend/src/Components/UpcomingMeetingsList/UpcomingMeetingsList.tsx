import type { Meeting } from '../../Types/meeting';
import styles from './UpcomingMeetingsList.module.css';

interface UpcomingMeetingsListProps {
  meetings: Meeting[];
  onStartMeeting: (meeting: Meeting) => void;
  onEditMeeting: (meeting: Meeting) => void;
  onDeleteMeeting: (meetingId: string) => void;
  onCreateAgenda: (meeting: Meeting) => void;
}

function getTypeLabel(type: Meeting['type']) {
  if (type === 0) return 'General';
  if (type === 1) return 'Daily';
  if (type === 2) return 'Review';
  if (type === 3) return 'Retrospective';
  return 'Sprint planning';
}

export function UpcomingMeetingsList(props: UpcomingMeetingsListProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <h2>Upcoming Meetings</h2>
        <p>All meetings currently planned and ready to start.</p>
      </div>

      {props.meetings.length === 0 ? (
        <p className={styles.empty}>No planned meetings yet.</p>
      ) : (
        <ul className={styles.list}>
          {props.meetings.map((meeting) => (
            <li key={meeting.id} className={styles.item}>
              <div>
                <h3>{meeting.title}</h3>
                <p>{getTypeLabel(meeting.type)} • {new Date(meeting.date).toLocaleString()}</p>
              </div>
              <div className={styles.actions}>
                <button type="button" onClick={() => props.onStartMeeting(meeting)}>Start Meeting</button>
                <button type="button" onClick={() => props.onEditMeeting(meeting)}>Edit</button>
                <button type="button" onClick={() => props.onDeleteMeeting(meeting.id)}>Delete</button>
                {meeting.type === 0 ? (
                  <button type="button" onClick={() => props.onCreateAgenda(meeting)}>Create Agenda</button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
