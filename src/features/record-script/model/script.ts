import {useFeatureRecordLocalStorage} from '../../../../chrome/storage';

const storage = useFeatureRecordLocalStorage;

export interface ScriptItem {
    name: string;
    scripts: Array<string>;
    id: number;
    isRunning: boolean
}

const clearRecordedScript = async (): Promise<void> => {
    await storage.setLocalStorage(storage.keys.recordedScript, [])
}

const recordScript = async (): Promise<void> => {
    await clearRecordedScript();
    await storage.setLocalStorage(storage.keys.statusRunning, true)
}

const saveScript = async (): Promise<any> => {
    await storage.setLocalStorage(storage.keys.statusRunning, false)
    return await storage.getLocalStorage(storage.keys.recordedScript)
}

const addScriptItem = async (name: string): Promise<void> => {
    let savedScripts: Array<any> = await storage.getLocalStorage(storage.keys.savedScripts);
    let recordedScript: Array<string> = await storage.getLocalStorage(storage.keys.recordedScript);
    let scripts = savedScripts ?? [];
    scripts.unshift(getScriptItem(name, recordedScript));
    await storage.setLocalStorage(storage.keys.savedScripts, scripts);
}

const getScriptItem = (name: string, scripts: Array<string>): ScriptItem  => {
    let scriptItem = <ScriptItem>{};
    scriptItem.name = name;
    scriptItem.scripts = scripts;
    scriptItem.id = new Date().getTime();
    scriptItem.isRunning = false;
    return scriptItem
}


export const useFeatureRecordScript = {
    recordScript,
    saveScript,
    addScriptItem,
}