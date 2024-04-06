const baseUrl = "http://localhost:3333";

export type Attendee = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  checkIn: Date | null;
};

export type Event = {
  id: string;
  title: string;
  details: string;
  slug: string;
  maximumAttendees: number | null;
  attendeesAmount: number;
};

export type AttendeesFromEventResponse = {
  attendees: Attendee[];
  total: number;
};

export async function getAttendeesFromEvent(
  eventId: string,
  page?: number,
  attendee?: string
): Promise<AttendeesFromEventResponse> {
  const url = new URL(`${baseUrl}/events/${eventId}/attendees`);

  url.searchParams.append("pageIndex", page?.toString() || "1");
  if (!attendee) url.searchParams.delete("query");
  else url.searchParams.append("query", attendee || "");

  const response = await fetch(url.toString());
  const { attendees, total } = await response.json();
  return { attendees: attendees, total: total || 0 };
}
