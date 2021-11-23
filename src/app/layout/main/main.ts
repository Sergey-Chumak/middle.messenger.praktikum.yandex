import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './main.tmpl';
import { sidebar } from '../../components/sidebar';
import { IMainContext } from './main.types';

const context: IMainContext = {
  showMenuBtn: document.location.href.includes('chat-page') || document.location.href.includes('profile'),
};

Handlebars.registerPartial('sidebar', sidebar({
  userName: 'Ivan',
  userPhone: '+7 (909) 967 30 30',
}));

(document.querySelector('#app') as HTMLDivElement).innerHTML = Handlebars.compile(tmpl)(context);

const $iconMenu: HTMLDivElement | null = document.querySelector('#icon-menu') as HTMLDivElement;
const $backdrop: HTMLDivElement | null = document.querySelector('#main-backdrop') as HTMLDivElement;
const $sidebar: HTMLDivElement | null = document.querySelector('#sidebar') as HTMLDivElement;
const $chatListSidebar: HTMLDivElement | null = document.querySelector('#chat-list-sidebar');
const $profileSidebar: HTMLDivElement | null = document.querySelector('#profile-sidebar');
const $logoutSidebar: HTMLDivElement | null = document.querySelector('#logout-sidebar');

new Promise<void>((resolve) => {
  resolve();
}).then(() => {
  if (context.showMenuBtn) {
    $iconMenu.addEventListener('click', () => {
      $sidebar.style.left = '0';
      $backdrop.style.visibility = 'visible';
    });

    $backdrop.addEventListener('click', () => {
      $sidebar.style.left = '-228px';
      $backdrop.style.visibility = 'hidden';
    });
  }
  $chatListSidebar?.addEventListener('click', () => {
    document.location.href = 'chat-page';
  });

  $profileSidebar?.addEventListener('click', () => {
    document.location.href = 'profile';
  });

  $logoutSidebar?.addEventListener('click', () => {
    document.location.href = 'auth';
  });
}).catch((e) => console.log(e));
