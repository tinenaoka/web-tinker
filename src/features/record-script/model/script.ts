import {useFeatureRecordLocalStorage} from '../../../../browser/storage';
import {useFeatureRunScript} from '../../run-script';
import {Script} from '../../../../entities';
import {setScriptItem, setScriptTypingItem} from '../../../../entities';

const clearRecordedScript = async (): Promise<void> => {
    await setRecordedScript([]);
}

const recordScript = async (): Promise<void> => {
    await clearScriptRecordedLink();
    await clearRecordedScript();
    await useFeatureRunScript.setStatusRunning(true)
}

const saveScript = async (): Promise<Script[]> => {
    await useFeatureRunScript.setStatusRunning(false)
    return await getRecordedScript();
}

const getRecordedScript = async (): Promise<Script[]> => {
    return <Script[]>await useFeatureRecordLocalStorage.getLocalStorage(useFeatureRecordLocalStorage.keys.recordedScript) ?? [];
}

const getRecordedScriptLink = async (): Promise<string> => {
    return <string>await useFeatureRecordLocalStorage.getLocalStorage(useFeatureRecordLocalStorage.keys.recordedScriptLink)
}

const addScriptRecordedItem = async (selector: string): Promise<void> => {
    let recordedScript = <Script[]>await getRecordedScript();
    recordedScript.push(setScriptItem(selector));
    await setRecordedScript(recordedScript);
}

const addScriptRecordedTypingItem = async (selector: string, value: string): Promise<void> => {
    let recordedScript = <Script[]>await getRecordedScript();
    recordedScript.push(setScriptTypingItem(selector, value));
    await setRecordedScript(recordedScript);
}

const setScriptRecordedLink = async (link: string | null): Promise<void> => {
    await useFeatureRecordLocalStorage.setLocalStorage(useFeatureRecordLocalStorage.keys.recordedScriptLink, link);
}

const addScriptRecordedLink = async (link: string): Promise<void> => {
    let linkRecordedScript = await getRecordedScriptLink();
    if (linkRecordedScript !== null) {
        return
    }
    await setScriptRecordedLink(link);
}

const clearScriptRecordedLink = async (): Promise<void> => {
    await setScriptRecordedLink(null);
}


const setRecordedScript = async (recordedScript: Script[]) => {
  await useFeatureRecordLocalStorage.setLocalStorage(useFeatureRecordLocalStorage.keys.recordedScript, recordedScript);
}

export const useFeatureRecordScript = {
    getRecordedScript,
    getRecordedScriptLink,
    setRecordedScript,
    recordScript,
    saveScript,
    addScriptRecordedItem,
    addScriptRecordedLink,
    clearScriptRecordedLink,
    addScriptRecordedTypingItem,
}