import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './main.tmpl';
import { sidebar } from '../../components/sidebar';

const context = {
  showMenu: document.location.href.includes('chat-page') || document.location.href.includes('profile'),
};

Handlebars.registerPartial('sidebar', sidebar({
  userName: 'Ivan',
  userPhone: '+7 (909) 967 30 30',
}));

document.querySelector('#app').innerHTML = Handlebars.compile(tmpl)(context);

const $iconMenu = document.querySelector('#icon-menu');
const $backdrop = document.querySelector('#main-backdrop');
const $sidebar = document.querySelector('#sidebar');
const $chatListSidebar = document.querySelector('#chat-list-sidebar');
const $profileSidebar = document.querySelector('#profile-sidebar');
const $logoutSidebar = document.querySelector('#logout-sidebar');

new Promise((resolve) => {
  resolve();
}).then(() => {
  $iconMenu?.addEventListener('click', () => {
    $sidebar.style.left = '0';
    $backdrop.style.visibility = 'visible';
  });

  $backdrop?.addEventListener('click', () => {
    $sidebar.style.left = '-228px';
    $backdrop.style.visibility = 'hidden';
  });

  $chatListSidebar?.addEventListener('click', () => {
    document.location.href = 'chat-page';
  });

  $profileSidebar?.addEventListener('click', () => {
    document.location.href = 'profile';
  });

  $logoutSidebar?.addEventListener('click', () => {
    document.location.href = 'auth';
  });
});
