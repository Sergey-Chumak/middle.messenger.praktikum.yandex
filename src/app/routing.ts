import Router from './services/router/router';
import { Main } from './layout/main';
import { Auth } from './pages/auth';
import { ChatPage } from './pages/chat-page';

export const router = new Router('#app')
  .use('/', Main)
  .use('/auth', Auth)
  .use('/messenger', ChatPage);
