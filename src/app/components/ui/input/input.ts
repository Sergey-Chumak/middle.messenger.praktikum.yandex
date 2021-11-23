import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './input.tmpl';
import { TCompileTemplate } from '../../../services/types';
import { IInputContext } from './input.types';

export const input: TCompileTemplate<IInputContext> = Handlebars.compile(tmpl);
