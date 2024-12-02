import {getTimeStamp} from '../src/shared/model';

export interface Script {
    selector: string,
    value: string | null
}

export interface ScriptBug extends Script {
    timeStamp: number,
    link: string
}

export const setScriptItem = (selector: string): Script => {
    let scriptItem = <Script>{};
    scriptItem.selector = selector;
    scriptItem.value = null;
    return scriptItem;
}

export const setScriptTypingItem = (selector: string, value: string): Script => {
    let scriptItem = setScriptItem(selector);
    scriptItem.value = value;
    return scriptItem;
}

export const setScriptBugItem = (selector: string, link: string): ScriptBug => {
    let ScriptBug = <ScriptBug>{
        ...setScriptItem(selector)
    };
    ScriptBug.timeStamp = getTimeStamp();
    ScriptBug.link = link;
    return ScriptBug;
}

export const setScriptBugTypingItem = (selector: string, link: string, value: string): ScriptBug => {
    let ScriptBug = setScriptBugItem(selector, link);
    ScriptBug.value = value;
    return ScriptBug;
}