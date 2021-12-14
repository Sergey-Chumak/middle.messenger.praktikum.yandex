export default function last<T = string>(arr: T[]): T {
  return arr[arr.length - 1];
}
