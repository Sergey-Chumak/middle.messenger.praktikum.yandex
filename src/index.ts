import './styles/styles.scss';

import { router } from './app/routing/routing';
import { render } from './app/utils/renderDOM';
import { Main } from './app/layout/main';

render('#app', new Main({}));

router.start();
if (document.location.pathname === '/') {
  router.go('/signin');
}
