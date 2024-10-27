import {useFeatureRecordScript} from '../../../src/features/record-script';
import {useFeatureRunScript} from '../../../src/features/run-script';

const recordScript = useFeatureRecordScript;
const runScript = useFeatureRunScript;

export const onClickEvent = async (selector: string): Promise<void> => {
    let isRunningStatus = await runScript.getStatusRunning();
    if (!isRunningStatus) {
        return
    }
    await recordScript.addScriptRecordedItem(selector)
}