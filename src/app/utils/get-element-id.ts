export function getElementId(targetEl: HTMLElement): string | undefined {
  let current: HTMLElement | null | undefined = targetEl;
  while (current) {
    if (current.id) {
      return current.id;
    }
    current = current?.parentElement;
  }
  return undefined;
}
