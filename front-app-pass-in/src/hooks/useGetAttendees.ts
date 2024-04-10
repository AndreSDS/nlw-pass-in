import { queryClient, useQuery } from "@/lib/useQuery";
import {
  AttendeeBadge,
  AttendeeInfo,
  RegisterResponse,
  getAttendeeBadge,
  registerToEvent,
} from "@/server/api";

export const useGetAttendeeBadge = (attendeeId: string) => {
  const {
    data: badge,
    error: badgeError,
    isLoading: badgeLoading,
    isFetching: badgeFetching,
  } = useQuery<AttendeeBadge>({
    queryKey: ["attendeeBadge"],
    queryFn: () => getAttendeeBadge(attendeeId),
    enabled: false,
  });

  return { badge, badgeError, badgeLoading, badgeFetching };
};

export const useRegisterAttendeeToEvent = ({ name, email }: AttendeeInfo) => {
  const {
    data: attendeeId,
    error: registerError,
    isLoading: registerLoading,
    isFetching: registerFetching,
  } = useQuery<RegisterResponse>({
    queryKey: ["attendee"],
    queryFn: () => {
      return registerToEvent({ name, email });
    },
    enabled: false,
  });

  return {
    attendeeId,
    registerError,
    registerLoading,
    registerFetching,
  };
};
