import {
  AttendeesFromEventResponse,
  getAttendeesFromEvent,
} from "../api/getAttendees";
import { useAttendeesStore } from "../context/useAttendeesStore";
import { useQuery } from "../lib/react-query";

export function useGetAttendees() {
  const {
    attendeeItem: { eventId, attendeeName, pageIndex },
  } = useAttendeesStore();

  return useQuery<AttendeesFromEventResponse>({
    queryKey: ["attendees", pageIndex, attendeeName],
    queryFn: () => getAttendeesFromEvent(eventId, pageIndex, attendeeName),
  });
}
