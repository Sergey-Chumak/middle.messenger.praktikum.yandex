import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './chat-page.tmpl';
import { chatList } from '../../components/chat-list';
import { chat } from '../../components/chat';
import { plugDialog } from '../../components/plug-dialog';

Handlebars.registerPartial('chatList', chatList({ class: 'chat__chat-list' }));

Handlebars.registerPartial('chat', chat({ class: 'chat__dialog' }));

Handlebars.registerPartial('plugDialog', plugDialog({}));

export const chatPage = Handlebars.compile(tmpl)({});
