import {useFeatureRecordLocalStorage} from '../../../../chrome/storage';

const storage = useFeatureRecordLocalStorage;

const clearRecordedScript = async () => {
    await storage.setLocalStorage(storage.keys.recordedScript, [])
}

const recordScript = async () => {
    await clearRecordedScript();
    await storage.setLocalStorage(storage.keys.statusRunning, true)
}

const saveScript = async (): Promise<any> => {
    await storage.setLocalStorage(storage.keys.statusRunning, false)
    return await storage.getLocalStorage(storage.keys.recordedScript)
}


export const useFeatureRecordScript = {
    recordScript,
    saveScript,
}