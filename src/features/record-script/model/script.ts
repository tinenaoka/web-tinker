import {useFeatureRecordLocalStorage} from '../../../../browser/storage';
import {useFeatureRunScript} from '../../run-script';
import {Script} from '../../../../entities';
import {setScriptItem} from '../../../../entities';

const clearRecordedScript = async (): Promise<void> => {
    await setRecordedScript([]);
}

const recordScript = async (): Promise<void> => {
    await clearRecordedScript();
    await useFeatureRunScript.setStatusRunning(true)
}

const saveScript = async (): Promise<Array<Script> | []> => {
    await useFeatureRunScript.setStatusRunning(false)
    return await getRecordedScript();
}

const getRecordedScript = async (): Promise<Array<Script> | []> => {
  return await useFeatureRecordLocalStorage.getLocalStorage(useFeatureRecordLocalStorage.keys.recordedScript) ?? []
}

const addScriptRecordedItem = async (selector: string): Promise<void> => {
    let recordedScript = await getRecordedScript();
    recordedScript.push(<never>setScriptItem(selector));
    await setRecordedScript(recordedScript);
}

const setRecordedScript = async (recordedScript: Array<Script> | []) => {
  await useFeatureRecordLocalStorage.setLocalStorage(useFeatureRecordLocalStorage.keys.recordedScript, recordedScript);
}

export const useFeatureRecordScript = {
    getRecordedScript,
    setRecordedScript,
    recordScript,
    saveScript,
    addScriptRecordedItem,
}