export function getTimeNow(): string {
  const date: Date = new Date(Date.now());
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  return `${hours}:${minutes}`;
}

export function getTimeCustomFormat(dateStr: string): string {
  const date = new Date(Date.parse(dateStr));
  const hours = date.getHours().toString().length === 1 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${hours}:${minutes}`;
}

export function getDateCustomFormat(date: Date = new Date(Date.now())): string {
  const month: string = DateMonth[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day}`;
}

enum DateMonth {
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
