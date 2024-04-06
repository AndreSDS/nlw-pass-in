import { IconButton } from "../icon-button";
import { TableComponents } from "./table-component";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";
import { relativeDate } from "../../utils/format";
import { useGetAttendees } from "../../hooks/useGetAttendees";
import { useAttendeesStore } from "../../context/useAttendeesStore";

export const Table = () => {
  const {
    attendeeItem,
    attendeeItem: { pageIndex },
    setAttendeeItem,
  } = useAttendeesStore();
  const { data } = useGetAttendees();
  const { attendees, total } = data || {};

  const totalPages = total ? Math.ceil(total / 10) : 1;

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());
    url.searchParams.set("page", String(page));
    window.history.pushState({}, "", url.toString());
    setAttendeeItem({ ...attendeeItem, pageIndex: page });
  }

  console.log({ total });

  return (
    <TableComponents.Table>
      <TableComponents.THeadComponent>
        <TableComponents.TRComponent>
          <TableComponents.THComponent style={{ width: 48 }}>
            <input
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
        {attendees &&
          attendees.map(({ id, name, email, createdAt, checkIn }) => (
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
                {checkIn ? relativeDate(checkIn) : "Aguardando check-in"}
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
            Mostrando {attendees?.length} de {total || 0} items
          </TableComponents.TDComponent>
          <TableComponents.TDComponent colSpan={3} className="text-right">
            <div className="inline-flex items-center gap-8">
              <span>
                Página {pageIndex === 0 ? 1 : pageIndex} de {totalPages}
              </span>
              <div className="flex gap-1.5">
                <IconButton disabled={pageIndex === 0}>
                  <ChevronsLeft className="size-4" />
                </IconButton>
                <IconButton disabled={pageIndex === 0}>
                  <ChevronLeft className="size-4" />
                </IconButton>
                <IconButton disabled={pageIndex === totalPages}>
                  <ChevronRight className="size-4" />
                </IconButton>
                <IconButton disabled={pageIndex === totalPages}>
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
