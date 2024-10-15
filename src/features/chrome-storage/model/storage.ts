const keys = {
    statusRunning: 'isRunningRecord',
    savedScripts: 'savedScripts'
}

const getLocalStorage = (key: string): Promise<any> => {
    return window.chrome.storage?.local.get(key);
}

const removeLocalStorage = (key: string): Promise<any> => {
    return window.chrome.storage?.local.remove(key);
}

const setLocalStorage = (key: string, value: any): Promise<any> => {
    let storeItem: Record<string, any> = {};
    storeItem[key] = value;
    return window.chrome.storage?.local.set(storeItem);
}

export const useFeatureRecordLocalStorage = {
    keys,
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage
}