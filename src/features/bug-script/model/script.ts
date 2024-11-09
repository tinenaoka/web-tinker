import {getTimeStamp} from '../../../shared/model';
import {useFeatureRecordLocalStorage} from '../../../../browser/storage';
import {ScriptBug, setScriptBugItem} from '../../../../entities';

const getBugReportScript = async (): Promise<Array<ScriptBug> | []> => {
    return await useFeatureRecordLocalStorage.getLocalStorage(useFeatureRecordLocalStorage.keys.bugReportScript) ?? [];
}

const setBugReportScriptByDelay = async (selector: string, delay = 5 * 1000 * 60) => {
    let bugReportScript = await getBugReportScript();
    bugReportScript.push(<never>setScriptBugItem(selector));

    const timeStampNow = getTimeStamp();
    bugReportScript = bugReportScript.filter(({timeStamp}) => timeStamp + delay > timeStampNow)
    await useFeatureRecordLocalStorage.setLocalStorage(useFeatureRecordLocalStorage.keys.bugReportScript, bugReportScript);
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
    generateBugScriptName
}