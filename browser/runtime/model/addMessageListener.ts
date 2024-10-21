export const addMessageListener = (cb: (message: any, sender: any, sendResponse: (response?: any) => void) => void): void => {
    chrome.runtime?.onMessage.addListener(cb);
}