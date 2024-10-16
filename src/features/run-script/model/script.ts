import {useFeatureRecordLocalStorage} from '../../../../chrome/storage';
import {ScriptItem} from '../../record-script/model/script';

const storage = useFeatureRecordLocalStorage;

const getSavedScripts = async (): Promise<ScriptItem[] | []> => {
  return await storage.getLocalStorage(storage.keys.savedScripts) ?? []
}

const getActiveScriptById = async (id: number): Promise<ScriptItem | undefined> => {
    let scripts = await getSavedScripts();
    if (scripts.length === 0) {
        return undefined
    }
    return scripts.find(item => item && item.id === id);
}

const getActiveScriptIndexById = async (id: number): Promise<number> => {
    let scripts = await getSavedScripts();
    if (scripts.length === 0) {
        return -1
    }
    return scripts.findIndex(item => item.id === id);
}

const changeStatusScript = async (script: ScriptItem, status: boolean) => {
    let newScripts = await getSavedScripts();
    if (newScripts.length === 0) {
        return
    }
    let index = await getActiveScriptIndexById(script.id);
    if (index < 0) {
        return
    }
    newScripts[index].isRunning = status;
    await storage.setLocalStorage(storage.keys.savedScripts, newScripts)
}

const startRunningSavedScript = async (script: ScriptItem) => {
    await changeStatusScript(script, true)
    await storage.setLocalStorage(storage.keys.statusRunningSaved, true)
    await storage.setLocalStorage(storage.keys.runningScript, script.scripts)
}

const stopRunningSavedScript = async (script: ScriptItem) => {
    await changeStatusScript(script, false)
    await storage.setLocalStorage(storage.keys.statusRunningSaved, false)
    await storage.setLocalStorage(storage.keys.runningScript, [])
}

const runScript = async (id: number) => {
    let script = await getActiveScriptById(id);
    if (!script) {
        return
    }
    await startRunningSavedScript(script);
}

const stopScript = async (id: number) => {
    let script = await getActiveScriptById(id);
    if (!script) {
        return
    }
    await stopRunningSavedScript(script);
}

export const useFeatureRunScript = {
    runScript,
    stopScript,
}