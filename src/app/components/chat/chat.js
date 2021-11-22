import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './chat.tmpl';

export const chat = Handlebars.compile(tmpl);
