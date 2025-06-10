const keys = {
    statusRunning: 'isRunningRecord',
    savedScripts: 'savedScripts',
    recordedScript: 'recordedScript',
    recordedScriptLink: 'recordedScriptLink',
    runningScript: 'runningScript',
    statusRunningSaved: 'isRunningSaved',
    idRunningSaved: 'idRunningSaved',
    bugReportScript: 'bugReportScript',
}

const getLocalStorage = async (key: string): Promise<unknown | null> => {
    let storage = await chrome.storage?.local.get(key);
    if (!storage) {
        return null
    }
    return storage[key] ?? null;
}

const removeLocalStorage = (key: string): Promise<void> | undefined => {
    return chrome.storage?.local.remove(key);
}

const clearLocalStorage = (): Promise<void> | undefined => {
    return chrome.storage?.local.clear();
}

const setLocalStorage = <Type>(key: string, value: Type): Promise<void> | undefined => {
    let storeItem: Record<string, Type> = {};
    storeItem[key] = value;
    return chrome.storage?.local.set(storeItem);
}

export const useFeatureRecordLocalStorage = {
    keys,
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage,
    clearLocalStorage
}