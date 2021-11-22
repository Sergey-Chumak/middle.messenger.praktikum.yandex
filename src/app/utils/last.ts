export default function last<T = string>(arr: T[]): T | void {
  if (!Array.isArray(arr)) return;
  return arr[arr.length - 1];
}
