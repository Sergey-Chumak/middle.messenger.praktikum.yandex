import Block from '../services/block/block';

export function render(query: string, block: Block<unknown, unknown>) {
  const root = document.querySelector(query);

  root?.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
}
