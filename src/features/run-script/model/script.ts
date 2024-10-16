import {useFeatureRecordLocalStorage} from '../../../../chrome/storage';

const storage = useFeatureRecordLocalStorage;

const startRunningSavedScript = async (runningScript: Array<any>) => {
    await storage.setLocalStorage(storage.keys.statusRunningSaved, true)
    await storage.setLocalStorage(storage.keys.runningScript, runningScript)
}

const stopRunningSavedScript = async () => {
    await storage.setLocalStorage(storage.keys.statusRunningSaved, false)
    await storage.setLocalStorage(storage.keys.runningScript, [])
}

const runScript = async (script: Array<string>) => {
    await startRunningSavedScript(script);
}

const stopScript = async () => {
    await stopRunningSavedScript();
}

export const useFeatureRunScript = {
    runScript,
    stopScript,
}