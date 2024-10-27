import {useFeatureBugReportScript} from '../../../src/features/bug-script';
import {useFeatureRunScript} from '../../../src/features/run-script';

const bugReportScript = useFeatureBugReportScript;
const runScript = useFeatureRunScript;

export const onBugReportEvent = async (selector: string): Promise<void> => {
    let isRunningStatus = await runScript.getStatusRunning();
    if (isRunningStatus) {
        return
    }
    await bugReportScript.setBugReportScriptByDelay(selector);
}