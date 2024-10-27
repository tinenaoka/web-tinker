import {getTimeStamp} from '../src/shared/model';

export interface Script {
    selector: string,
    timeStamp: number
}

export interface ScriptBug extends Script {
    timeStamp: number
}

export const setScriptItem = (selector: string): Script => {
    let scriptItem = <Script>{};
    scriptItem.selector = selector;
    return scriptItem;
}

export const setScriptBugItem = (selector: string): ScriptBug => {
    let scriptItem = <ScriptBug>{
        ...setScriptItem(selector)
    };
    scriptItem.timeStamp = getTimeStamp();
    return scriptItem;
}