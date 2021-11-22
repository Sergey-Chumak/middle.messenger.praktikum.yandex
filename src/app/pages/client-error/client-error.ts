import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './client-error.tmpl';

export const clientError: string = Handlebars.compile(tmpl)({});
