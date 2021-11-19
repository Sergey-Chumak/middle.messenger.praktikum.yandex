import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './server-error.tmpl';

const context = { error: 500 };

export const serverError = Handlebars.compile(tmpl)(context);
