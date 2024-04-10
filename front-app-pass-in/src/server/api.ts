import axios from "axios";

const EVENT_ID = "bcf25cd0-c2ed-4a6c-8712-baf095a45dcb";
export const api = axios.create({
  baseURL: "http://127.0.0.1:3333",
});

export type AttendeeBadge = {
  avatar?: string;
  name: string;
  email: string;
  event: string;
  checkInUrl: string;
};

export type Attendee = {
  avatar: string;
  name: string;
  email: string;
  attendeeId: string;
};

export type AttendeeInfo = {
  name: string;
  email: string;
};


export type RegisterResponse = {
  attendeeId: number;
};

export async function registerToEvent(userInfo: {
  name: string;
  email: string;
}): Promise<RegisterResponse> {
  const { data } = await api.post<RegisterResponse>(
    `/events/${EVENT_ID}/attendees`,
    userInfo
  );

  return data;
}

export async function getAttendeeBadge(
  attendeeId: string
): Promise<AttendeeBadge> {
  const { data } = await api.get<AttendeeBadge>(
    `/attendees/${attendeeId}/badge`
  );

  return data;
}
