import {ActionsEvent} from '../../../entities';
import {useFeatureRecordLocalStorage} from '../../../browser/storage';
import {sendMessageFromExtension} from '../../../browser/runtime/model/sendMessageFromExtension';

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
    sendMessageFromExtension(ActionsEvent.StopScripting, true);
}