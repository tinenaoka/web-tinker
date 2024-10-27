import {Script} from './script';
import {getTimeStamp} from '../src/shared/model';

export interface ScriptListItem {
    scripts: Array<Script>,
    name: string,
    id: number,
    isRunning: boolean
}

export const setScriptListItem = (script: Array<Script> | [], name: string): ScriptListItem => {
    let scriptListItem = <ScriptListItem>{};
    scriptListItem.scripts = script;
    scriptListItem.name = name;
    scriptListItem.id = getTimeStamp();
    scriptListItem.isRunning = false;
    return scriptListItem;
}