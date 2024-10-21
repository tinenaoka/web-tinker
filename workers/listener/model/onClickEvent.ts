import {useFeatureRecordLocalStorage} from '../../../chrome/storage';

const storage = useFeatureRecordLocalStorage;

export const onClickEvent = async (absolutePath: string): Promise<void> => {
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