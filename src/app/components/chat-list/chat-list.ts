import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './chat-list.tmpl';
import {TCompileTemplate} from "../../services/types";
import {IChatListContext} from "./chat-list.types";

export const chatList: TCompileTemplate<IChatListContext> = Handlebars.compile(tmpl);
