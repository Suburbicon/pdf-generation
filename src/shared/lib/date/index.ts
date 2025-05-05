import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/kk';

export function format(date: Date, options: { lng: string; template: string }) {
  return dayjs(date).locale(options.lng).format(options.template);
}

export const dateLib = {
  format,
};
