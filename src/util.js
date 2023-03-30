import {dateFormat, TimeCount} from './const';
import dayjs from 'dayjs';

export const humanizeDate = (rawDate, dateFormat) => dayjs(rawDate).format(dateFormat);
export const getDuration = (startDate, endDate) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const diff = end.diff(start, 'minute');
  const totalMinutesInDay = TimeCount.MINUTES * TimeCount.HOURS;

  const days = Math.floor(diff / totalMinutesInDay);
  const hours = Math.floor(((diff - days * totalMinutesInDay) / TimeCount.MINUTES));
  const minutes = diff - (days * totalMinutesInDay + hours * TimeCount.MINUTES);

  const currentDays = (days) ? `${days}D` : '';
  const currentHours = (hours) ? `${hours}H` : '';
  const currentMinutes = (minutes) ? `${minutes}M` : '';

  return `${currentDays} ${currentHours} ${currentMinutes}`;
};
