import {getTimeStamp} from '../src/shared/model';

export interface Script {
    selector: string,
    timeStamp: number
}

export interface ScriptBug extends Script {
    timeStamp: number,
    link: string
}

export const setScriptItem = (selector: string): Script => {
    let scriptItem = <Script>{};
    scriptItem.selector = selector;
    return scriptItem;
}

export const setScriptBugItem = (selector: string, link: string): ScriptBug => {
    let scriptItem = <ScriptBug>{
        ...setScriptItem(selector)
    };
    scriptItem.timeStamp = getTimeStamp();
    scriptItem.link = link;
    return scriptItem;
}