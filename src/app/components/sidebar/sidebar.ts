import Handlebars from 'handlebars/dist/handlebars';
import { tmpl } from './sidebar.tmpl';
import {TCompileTemplate} from "../../services/types";
import {ISidebarContext} from "./sidebar.types";

export const sidebar: TCompileTemplate<ISidebarContext> = Handlebars.compile(tmpl);
