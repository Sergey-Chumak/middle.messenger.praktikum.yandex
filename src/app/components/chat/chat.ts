import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './chat.tmpl';
import { TCompileTemplate } from "../../services/types";
import { IChatContext } from "./chat.types";

export const chat: TCompileTemplate<IChatContext> = Handlebars.compile(tmpl);

