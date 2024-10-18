const keys = {
    statusRunning: 'isRunningRecord',
    savedScripts: 'savedScripts',
    recordedScript: 'recordedScript',
    runningScript: 'runningScript',
    statusRunningSaved: 'isRunningSaved',
    idRunningSaved: 'idRunningSaved',
}

const getLocalStorage = async (key: string): Promise<any | null> => {
    let storage = await chrome.storage.local.get(key);
    if (!storage) {
        return null
    }
    return storage[key] ?? null;
}

const removeLocalStorage = (key: string): Promise<void> => {
    return chrome.storage.local.remove(key);
}

const clearLocalStorage = (): Promise<void> => {
    return chrome.storage.local.clear();
}

const setLocalStorage = (key: string, value: any): Promise<void> => {
    let storeItem: Record<string, any> = {};
    storeItem[key] = value;
    return chrome.storage.local.set(storeItem);
}

export const useFeatureRecordLocalStorage = {
    keys,
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage,
    clearLocalStorage
}