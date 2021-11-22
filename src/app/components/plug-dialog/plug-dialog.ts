import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './plug-dialog.tmpl';
import { TCompileTemplate } from "../../services/types";

export const plugDialog: TCompileTemplate = Handlebars.compile(tmpl);
