export function getTimeNow(): string {
  const date: Date = new Date(Date.now());
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  return `${hours}:${minutes}`;
}

export function getDateNow(): string {
  const date: Date = new Date(Date.now());
  const month: string = DateMonth[date.getMonth()];
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
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
