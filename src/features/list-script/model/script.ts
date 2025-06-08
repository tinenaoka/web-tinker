import {ScriptBug, ScriptListItem, setScriptListItem} from '../../../../entities';
import {useFeatureRecordLocalStorage} from '../../../../browser/storage';
import {Script} from '../../../../entities';
import {useFeatureRecordScript} from '../../record-script';

const getSavedScripts = async (): Promise<ScriptListItem[] | []> => {
    return await useFeatureRecordLocalStorage.getLocalStorage(useFeatureRecordLocalStorage.keys.savedScripts) ?? []
}

const getActiveScriptById = async (id: number): Promise<ScriptListItem | undefined> => {
    let scripts = await getSavedScripts();
    if (scripts.length === 0) {
        return undefined
    }
    return scripts.find((item): item is ScriptListItem => item.id === id);
}

const getActiveScriptIndexById = async (id: number): Promise<number> => {
    let scripts = await getSavedScripts();
    if (scripts.length === 0) {
        return -1
    }
    return scripts.findIndex(item => item.id === id);
}

const deleteScript = async (script: ScriptListItem): Promise<void> => {
    let newScripts = await getSavedScripts();
    if (newScripts.length === 0) {
        return
    }
    let index = await getActiveScriptIndexById(script.id);
    if (index < 0) {
        return
    }
    newScripts.splice(index, 1);
    await setSavedScript(newScripts);
}

const addScriptListItem = async (name: string, recordedScript: Array<Script> | Array<ScriptBug>, link: string): Promise<void> => {
    let savedScripts: Array<ScriptListItem> = await getSavedScripts();
    let scripts = savedScripts ?? [];
    scripts.unshift(setScriptListItem(recordedScript, name, link));
    await setSavedScript(scripts);
}

const addRecordedScriptItem = async (name: string): Promise<void> => {
    let recordedScript = await useFeatureRecordScript.getRecordedScript();
    let recordedScriptLink = await useFeatureRecordScript.getRecordedScriptLink();
    await addScriptListItem(name, recordedScript, recordedScriptLink);
}

const addBugReportScriptItem = async (name: string, bugRecordedScript: Array<ScriptBug>): Promise<void> => {
    await addScriptListItem(name, bugRecordedScript, bugRecordedScript[0].link);
}

const setSavedScript = async (scripts: Array<ScriptListItem>) => {
    await useFeatureRecordLocalStorage.setLocalStorage(useFeatureRecordLocalStorage.keys.savedScripts, scripts);
}

const changeStatusScript = async (script: ScriptListItem, status: boolean): Promise<void> => {
    let newScripts = await getSavedScripts();
    if (newScripts.length === 0) {
        return
    }
    let index = await getActiveScriptIndexById(script.id);
    if (index < 0) {
        return
    }
    newScripts[index].isRunning = status;
    await setSavedScript(newScripts);
}

export const useFeatureListScript = {
    getSavedScripts,
    getActiveScriptIndexById,
    getActiveScriptById,
    setSavedScript,
    deleteScript,
    addRecordedScriptItem,
    addBugReportScriptItem,
    changeStatusScript
}