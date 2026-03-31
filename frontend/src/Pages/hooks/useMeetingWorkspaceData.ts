import { useEffect, useState } from 'react';
import { meetingService } from '../../Services/meetingService';
import { sprintService } from '../../Services/sprintService';
import type { Meeting } from '../../Types/meeting';
import type { SelectOption } from '../../Types/selectOption';

export const activeMeetingStorageKey = 'scrumlog.activeMeetingId';

export function useMeetingWorkspaceData() {
  const [sprintOptions, setSprintOptions] = useState<SelectOption[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  async function loadData() {
    try {
      const [allMeetings, sprints] = await Promise.all([
        meetingService.getAll(),
        sprintService.getAll(),
      ]);

      setMeetings(allMeetings);
      setSprintOptions(sprints.map((sprint) => ({ value: sprint.id, label: sprint.name })));
      return allMeetings;
    } catch {
      setMeetings([]);
      setSprintOptions([]);
      return [];
    }
  }

  useEffect(() => {
    void loadData();
  }, []);

  return { meetings, sprintOptions, refresh: loadData };
}
