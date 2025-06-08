import {Script} from './script';
import {getTimeStamp} from '../src/shared/model';

export interface ScriptListItem {
    scripts: Script[],
    name: string,
    link: string,
    id: number,
    isRunning: boolean
}

export const setScriptListItem = (script: Array<Script> | [], name: string, link: string): ScriptListItem => {
    let scriptListItem = <ScriptListItem>{};
    scriptListItem.scripts = script;
    scriptListItem.name = name;
    scriptListItem.link = link;
    scriptListItem.id = getTimeStamp();
    scriptListItem.isRunning = false;
    return scriptListItem;
}