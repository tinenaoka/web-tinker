import {useFeatureRecordScript} from '../../../src/features/record-script';
import {useFeatureRunScript} from '../../../src/features/run-script';
import {ActionClickData} from '../../../entities';

const recordScript = useFeatureRecordScript;
const runScript = useFeatureRunScript;

export const onClickEvent = async (actionClickData: ActionClickData): Promise<void> => {
    let isRunningStatus = await runScript.getStatusRunning();
    if (!isRunningStatus) {
        return
    }
    await recordScript.addScriptRecordedItem(actionClickData.selector)
    await recordScript.addScriptRecordedLink(actionClickData.link)
}