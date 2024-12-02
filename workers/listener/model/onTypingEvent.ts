import {useFeatureRecordScript} from '../../../src/features/record-script';
import {useFeatureRunScript} from '../../../src/features/run-script';
import {ActionTypingData} from '../../../entities';

const recordScript = useFeatureRecordScript;
const runScript = useFeatureRunScript;

export const onTypingEvent = async (actionTypingData: ActionTypingData): Promise<void> => {
    let isRunningStatus = await runScript.getStatusRunning();
    if (!isRunningStatus) {
        return
    }
    await recordScript.addScriptRecordedTypingItem(actionTypingData.selector, actionTypingData.value)
    await recordScript.addScriptRecordedLink(actionTypingData.link)
}