import {useFeatureRecordLocalStorage} from './storage';
import {sendMessage} from './chorme';

const storage = useFeatureRecordLocalStorage;

export const onChangeEvent = async (): Promise<void> => {
    let isHaveRunningScript = await storage.getLocalStorage(storage.keys.statusRunningSaved);
    if (!isHaveRunningScript) {
        return
    }
    let runningScript = await storage.getLocalStorage(storage.keys.runningScript) ?? [];
    if (runningScript.length !== 0) {
        return
    }
    sendMessage('stop-scripting', true);
}