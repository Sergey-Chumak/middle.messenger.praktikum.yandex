import Block from '../../services/block';
import { tmpl } from './client-error.tmpl';
import { router } from '../../routing/routing';

export class ClientError extends Block<{}, void> {
  constructor(props: {}) {
    super('div', props);
  }

  componentDidMount() {
    this.setProps({
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id === 'client-error-link') {
            router.go('/messenger');
          }
        },
      },
    });
  }

  render() {
    return this.compile(tmpl, {});
  }
}
