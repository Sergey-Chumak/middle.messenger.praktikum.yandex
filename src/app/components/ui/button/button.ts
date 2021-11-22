import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './button.tmpl';
import {TCompileTemplate} from "../../../services/types";
import {IButtonContext} from "./button.types";

export const button: TCompileTemplate<IButtonContext> = Handlebars.compile(tmpl);

