import {useFeatureBugReportScript} from '../../../src/features/bug-script';
import {useFeatureRunScript} from '../../../src/features/run-script';
import {ActionClickData, ActionTypingData} from "../../../entities";

const bugReportScript = useFeatureBugReportScript;
const runScript = useFeatureRunScript;

export const onBugReportEvent = async (actionData: ActionClickData | ActionTypingData): Promise<void> => {
    let isRunningStatus = await runScript.getStatusRunning();
    if (isRunningStatus) {
        return
    }
    let isRunningSaved = await runScript.getStatusRunningSaved();
    if (isRunningSaved) {
        return
    }
    const {selector, link} = actionData;
    let value: string | null = null;
    if ('value' in actionData) {
        value = actionData.value;
    }
    await bugReportScript.setBugReportScriptByDelay(
        selector,
        link,
        value
    );
}