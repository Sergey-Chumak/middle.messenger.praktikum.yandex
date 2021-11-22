import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './chat-list.tmpl';

export const chatList = Handlebars.compile(tmpl);
