import { ChangeEvent, useRef, useState } from "react";
import { IconButton } from "../icon-button";
import { TableComponents } from "./table-component";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";
import { attendees } from "../../data/attendee";
import { relativeDate } from "../../utils/format";

export const Table = () => {
  const useSearchRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(1);
  function onSearchInput(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value === "") {
      if (useSearchRef.current !== null) {
        useSearchRef.current.value = event.target.value;
      }
    }
  }

  const totalPages = Math.ceil(attendees.length / 10);

  function goToNextPage() {
    if (page === totalPages) return;
    setPage((page) => page + 1);
  }

  function goToPreviousPage() {
    if (page === 1) return;
    setPage((page) => page - 1);
  }

  function goToFirstPage() {
    if (page === 1) return;
    setPage(1);
  }

  function goToLastPage() {
    if (page === totalPages) return;
    setPage(totalPages);
  }

  return (
    <TableComponents.Table>
      <TableComponents.THeadComponent>
        <TableComponents.TRComponent>
          <TableComponents.THComponent style={{ width: 48 }}>
            <input
              ref={useSearchRef}
              onChange={onSearchInput}
              className="size-4 rounded border-white/10 outline-none checked:accent-green-500"
              type="checkbox"
            />
          </TableComponents.THComponent>
          <TableComponents.THComponent>Código</TableComponents.THComponent>
          <TableComponents.THComponent>
            Participante
          </TableComponents.THComponent>
          <TableComponents.THComponent>
            Data de inscrição
          </TableComponents.THComponent>
          <TableComponents.THComponent>
            Data de check-in
          </TableComponents.THComponent>
          <TableComponents.THComponent
            style={{
              width: 64,
            }}
          />
        </TableComponents.TRComponent>
      </TableComponents.THeadComponent>

      <TableComponents.TBodyComponent>
        {attendees
          .slice((page - 1) * 10, page * 10)
          .map(({ id, name, email, createdAt, checkedInAt }) => (
            <TableComponents.TRComponent key={id}>
              <TableComponents.TDComponent>
                <input
                  className="size-4 rounded border-white/10 outline-none checked:accent-green-500"
                  type="checkbox"
                />
              </TableComponents.TDComponent>
              <TableComponents.TDComponent>{id}</TableComponents.TDComponent>
              <TableComponents.TDComponent>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">{name}</span>
                  <span>{email}</span>
                </div>
              </TableComponents.TDComponent>
              <TableComponents.TDComponent>
                {relativeDate(createdAt)}
              </TableComponents.TDComponent>
              <TableComponents.TDComponent>
                {relativeDate(checkedInAt)}
              </TableComponents.TDComponent>
              <TableComponents.TDComponent>
                <IconButton className="bg-black/20 border border-white/10">
                  <MoreHorizontal className="size-4" />
                </IconButton>
              </TableComponents.TDComponent>
            </TableComponents.TRComponent>
          ))}
      </TableComponents.TBodyComponent>

      <TableComponents.TFootComponent>
        <TableComponents.TRComponent>
          <TableComponents.TDComponent colSpan={3}>
            Mostrando 10 de {attendees.length} items
          </TableComponents.TDComponent>
          <TableComponents.TDComponent colSpan={3} className="text-right">
            <div className="inline-flex items-center gap-8">
              <span>
                Página {page} de {Math.ceil(attendees.length / 10)}
              </span>
              <div className="flex gap-1.5">
                <IconButton disabled={page === 1} onClick={goToFirstPage}>
                  <ChevronsLeft className="size-4" />
                </IconButton>
                <IconButton disabled={page === 1} onClick={goToPreviousPage}>
                  <ChevronLeft className="size-4" />
                </IconButton>
                <IconButton
                  disabled={page === totalPages}
                  onClick={goToNextPage}
                >
                  <ChevronRight className="size-4" />
                </IconButton>
                <IconButton
                  disabled={page === totalPages}
                  onClick={goToLastPage}
                >
                  <ChevronsRight className="size-4" />
                </IconButton>
              </div>
            </div>
          </TableComponents.TDComponent>
        </TableComponents.TRComponent>
      </TableComponents.TFootComponent>
    </TableComponents.Table>
  );
};
