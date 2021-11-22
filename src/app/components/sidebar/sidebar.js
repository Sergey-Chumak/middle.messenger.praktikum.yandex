import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './sidebar.tmpl';

export const sidebar = Handlebars.compile(tmpl);
