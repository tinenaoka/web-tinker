import {getTimeStamp} from '../../../shared/model';
import {useFeatureRecordLocalStorage} from '../../../../browser/storage';
import {useFeatureListScript} from '../../list-script';
import {ScriptBug, setScriptBugItem, setScriptBugTypingItem} from '../../../../entities';

const getBugReportScript = async (): Promise<Array<ScriptBug> | []> => {
    return await useFeatureRecordLocalStorage.getLocalStorage(useFeatureRecordLocalStorage.keys.bugReportScript) ?? [];
}

const setBugReportScriptByDelay = async (
    selector: string,
    link: string,
    value: null | string,
    delay = 5 * 1000 * 60
): Promise<void> => {
    let bugReportScript = <ScriptBug[]>await getBugReportScript();
    let bugReportScriptItem = <ScriptBug>setScriptBugItem(selector, link);
    if (value !== null) {
        bugReportScriptItem = <ScriptBug>setScriptBugTypingItem(selector, link, value);
    }
    bugReportScript.push(bugReportScriptItem);

    const timeStampNow = getTimeStamp();
    bugReportScript = bugReportScript.filter(({timeStamp}) => timeStamp + delay >= timeStampNow);
    await useFeatureRecordLocalStorage.setLocalStorage(useFeatureRecordLocalStorage.keys.bugReportScript, bugReportScript);
}

const clearBugReportScript = async (): Promise<void> => {
    await useFeatureRecordLocalStorage.setLocalStorage(useFeatureRecordLocalStorage.keys.bugReportScript, []);
}

const saveBugReportScript = async (name: string, timeStamp: Array<number>): Promise<void> => {
    let bugReportScript = await getBugReportScript();
    if (bugReportScript.length === 0) {
        return
    }
    bugReportScript = bugReportScript
        .filter(item => {
            return item.timeStamp >= timeStamp[0] && item.timeStamp <= timeStamp[1]
        })
        .sort((b, a) => {
            return a.timeStamp > b.timeStamp ? 1 : 0
        });
    await useFeatureListScript.addBugReportScriptItem(name, bugReportScript);
}

const generateBugScriptName = (): string => {
    return `BUG: ${new Date().toLocaleString('en-US',  {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    })}`
}

export const useFeatureBugReportScript = {
    getBugReportScript,
    setBugReportScriptByDelay,
    generateBugScriptName,
    saveBugReportScript,
    clearBugReportScript,
}