import {ActionsEvent} from '../../../entities';
import {sendMessageFromExtension} from '../../../browser/runtime/model/sendMessageFromExtension';
import {useFeatureRunScript} from '../../../src/features/run-script';

const runScript = useFeatureRunScript;

export const onChangeEvent = async (): Promise<void> => {
    let isRunningStatusSaved = await runScript.getStatusRunningSaved();
    if (!isRunningStatusSaved) {
        return
    }
    let runningScript = await runScript.getRunningScript();
    if (runningScript.length !== 0) {
        return
    }
    sendMessageFromExtension(ActionsEvent.StopScripting, true);
}