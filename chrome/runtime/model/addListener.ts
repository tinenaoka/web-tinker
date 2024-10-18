export const addListener = (cb: (message: any, sender: any, sendResponse: (response?: any) => void) => void): void => {
    chrome.runtime.onMessage.addListener(cb);
}