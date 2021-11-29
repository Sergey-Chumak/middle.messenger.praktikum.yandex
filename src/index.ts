import './styles/styles.scss';

import { Main } from './app/layout/main';
import { render } from './app/utils/renderDOM';

const main = new Main({});

main.setProps({
  test: 'test',
});

render('#app', main);
