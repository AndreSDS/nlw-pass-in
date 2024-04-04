import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ptBr from "dayjs/locale/pt-br";

// use dayjs to format date to relative date
dayjs.extend(relativeTime);
dayjs.locale(ptBr);

export const relativeDate = (date: Date) => {
  return dayjs().to(dayjs(date));
};
