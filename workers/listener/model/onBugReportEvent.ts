import {useFeatureBugReportScript} from '../../../src/features/bug-script';
import {useFeatureRunScript} from '../../../src/features/run-script';
import {ActionClickData} from "../../../entities";

const bugReportScript = useFeatureBugReportScript;
const runScript = useFeatureRunScript;

export const onBugReportEvent = async (actionClickData: ActionClickData): Promise<void> => {
    let isRunningStatus = await runScript.getStatusRunning();
    if (isRunningStatus) {
        return
    }
    await bugReportScript.setBugReportScriptByDelay(
        actionClickData.selector,
        actionClickData.link
    );
}