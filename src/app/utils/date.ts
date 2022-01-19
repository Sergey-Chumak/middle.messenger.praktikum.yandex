export function getTimeNow(): string {
  const date: Date = new Date(Date.now());
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function getTimeCustomFormat(dateStr: string): string {
  const date = new Date(Date.parse(dateStr));
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function getDateCustomFormat(dateStr: string): string {
  const date = new Date(Date.parse(dateStr));
  const month: string = EDateMonth[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}`;
}

enum EDateMonth {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}
