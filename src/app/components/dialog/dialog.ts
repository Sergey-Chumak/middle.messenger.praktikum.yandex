import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './dialog.tmpl';
import {TCompileTemplate} from "../../services/types";
import {IDialogContext} from "./dialog.types";

export const dialog: TCompileTemplate<IDialogContext> = Handlebars.compile(tmpl);
