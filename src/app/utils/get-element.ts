export function checkElemInTarget(targetEl: HTMLElement, id: string): boolean {
  let current: HTMLElement | null | undefined = targetEl;
  while (current?.id !== id) {
    if (!current) return false;
    current = current?.parentElement;
  }
  return true;
}

export function getElementWithId(targetEl: HTMLElement): string | undefined {
  let current: HTMLElement | null | undefined = targetEl;
  while (current) {
    if (current.id) {
      return current.id;
    }
    current = current?.parentElement;
  }
  return undefined;
}
