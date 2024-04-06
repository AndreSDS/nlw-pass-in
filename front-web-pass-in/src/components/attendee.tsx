import { Search } from "lucide-react";
import { Table } from "./table/table";
import { ChangeEvent, useRef } from "react";
import { useQueryClient } from "../lib/react-query";
import { useAttendeesStore } from "../context/useAttendeesStore";

export const AttendeeList = () => {
  const useSearchRef = useRef<HTMLInputElement>(null);
  const { attendeeItem, setAttendeeItem } = useAttendeesStore();
  const queryClient = useQueryClient();

  function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
    const url = new URL(window.location.toString());
    url.searchParams.set("search", event.target.value);
    window.history.pushState({}, "", url.toString());

    if (useSearchRef.current) {
      useSearchRef.current.value = event.target.value;
      setAttendeeItem({
        ...attendeeItem,
        attendeeName: event.target.value,
      });
    }
  }

  function onSearchbutton() {
    queryClient.invalidateQueries({
      queryKey: ["attendees"],
    });
    setAttendeeItem({
      ...attendeeItem,
      pageIndex: 0,
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Paticipantes</h1>

        <div className="flex items-center gap-3 w-72 px-3 py-1.5 border border-white/10 rounded-lg text-sm">
          <Search
            onClick={onSearchbutton}
            className="size-4 text-emerald-300 cursor-pointer"
          />

          <input
            ref={useSearchRef}
            onChange={onSearchInputChange}
            className="flex-1 bg-transparent outline-none text-sm border-none border-0 p-0"
            type="text"
            placeholder="buscar participante..."
          />
        </div>
      </div>

      <Table />
    </div>
  );
};
