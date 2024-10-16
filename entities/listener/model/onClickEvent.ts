import {useFeatureRecordLocalStorage} from './storage';

const storage = useFeatureRecordLocalStorage;

export const onClickEvent = async (absolutePath: string) => {
    let isRunningStatus = await storage.getLocalStorage(storage.keys.statusRunning)
    if (!isRunningStatus) {
        return
    }
    let recordedScript = await storage.getLocalStorage(storage.keys.recordedScript);
    if (!recordedScript) {
        return
    }
    recordedScript.push(absolutePath);
    await storage.setLocalStorage(storage.keys.recordedScript, recordedScript);
}