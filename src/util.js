import {dateFormat} from './const';
import dayjs from 'dayjs';

export const humanizeDate = (rawDate, dateFormat) => dayjs(rawDate).format(dateFormat);
export const getDuration = (startDate, endDate) => {
  const days = dayjs(endDate).diff(dayjs(startDate), 'd');
  const hours = dayjs(endDate).subtract(days, 'd').diff((dayjs(startDate), 'h'));
  const minutes = dayjs(endDate).subtract(days, 'd').subtract(hours, 'h').diff(dayjs(startDate), 'm');

  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  } else if (hours > 0) {
    return `${hours}H ${minutes}M`;
  } else {
    return `${minutes}M`;
  }
}
