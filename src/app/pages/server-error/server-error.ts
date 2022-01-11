import { tmpl } from './server-error.tmpl';
import Block from '../../services/block';
import { router } from '../../routing/routing';

export class ServerError extends Block<{}, void > {
  constructor(props: { }) {
    super('div', props);
  }

  componentDidMount() {
    this.setProps({
      events: {
        click: (event: Event) => {
          if ((event.target as HTMLElement).id === 'server-error-link') {
            router.go('/messenger');
          }
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, {
      error: this.props.error,
    });
  }
}
