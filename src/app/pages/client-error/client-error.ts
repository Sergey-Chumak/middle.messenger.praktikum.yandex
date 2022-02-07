import View from '../../services/view/view';
import { tmpl } from './client-error.tmpl';
import { router } from '../../services/router/router';
import { CButton } from '../../components/c-button';

export class ClientError extends View<{}, { button: CButton }> {
  constructor(props: {}) {
    super('div', props);
  }

  componentDidMount() {
    this.initButton();
  }

  render() {
    return this.compile(tmpl);
  }

  initButton(): void {
    this.children.button = new CButton({
      name: 'Back to chats',
      color: 'secondary',
      size: 'l',
      class: 'client-error__button',
    });

    this.children.button.setProps({
      events: {
        click: () => router.go('/messenger'),
      },
    });
  }
}
