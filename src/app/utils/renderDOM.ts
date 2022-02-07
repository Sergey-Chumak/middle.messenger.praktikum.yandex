import View from '../services/view/view';

export function render(query: string, block: View<unknown, unknown>) {
  const root = document.querySelector(query);

  root?.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
}
