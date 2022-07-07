import { Time } from '../enums';

export function getTodayDate() {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}${Time.ZeroHourUtc}`;
}

export function getLastDayDate() {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = (date.getUTCDate() - 1).toString().padStart(2, '0');
  return `${year}-${month}-${day}${Time.ZeroHourUtc}`;
}
