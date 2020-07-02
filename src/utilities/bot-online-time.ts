import { DateTime } from 'luxon';

export function getBotOnlineAt(): string {
  const dt = DateTime.local();
  const format = dt.toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET);

  return format;
}
