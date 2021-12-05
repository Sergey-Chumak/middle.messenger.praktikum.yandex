import './styles/styles.scss';

import { Main } from './app/layout/main';
import { render } from './app/utils/renderDOM';

const main = new Main({});

render('#app', main);
