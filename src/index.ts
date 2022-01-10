import './styles/styles.scss';

import { router } from './app/routing/routing';
import { render } from './app/utils/renderDOM';
import { Main } from './app/layout/main';
import { cloneDeep } from './app/utils/cloneDeep';

render('#app', new Main({}));

router.start();
if (document.location.pathname === '/') {
  router.go('/signin');
}

cloneDeep([{ a: 1 }, { b: 2 }]);
