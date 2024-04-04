import { Search } from "lucide-react";
import { Table } from "./table/table";

export const AttendeeList = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Paticipantes</h1>

        <div className="flex items-center gap-3 w-72 px-3 py-1.5 border border-white/10 rounded-lg text-sm">
          <Search className="size-4 text-emerald-300" />

          <input
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
