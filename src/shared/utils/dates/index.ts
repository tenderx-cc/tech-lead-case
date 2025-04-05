import { DateTime } from 'luxon';

export function formatDateAsText({
  date,
  dayOnly = false,
  truncateMonth = true,
}: {
  date: string;
  dayOnly?: boolean;
  truncateMonth?: boolean;
}) {
  return DateTime.fromISO(date).toLocaleString({
    day: '2-digit',
    month: truncateMonth ? 'short' : 'long',
    year: dayOnly ? undefined : 'numeric',
  });
}

export function parseFrLocaleDateStringToDate(dateString: string): Date {
  const [day, month, year] = dateString.split('/').map(Number);

  const isDateInvalid =
    isNaN(year) ||
    isNaN(month) ||
    isNaN(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31;

  if (isDateInvalid) throw new Error('Cannot parse invalid Date');

  return new Date(year, month - 1, day);
}

export function parseDateToFrLocaleDateString(date: Date): string {
  if (isNaN(date.getTime())) {
    throw new Error('Cannot parse invalid Date');
  }

  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
