import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './client-error.tmpl';

export const clientError = Handlebars.compile(tmpl)({});
