export const addListener = (cb: (message: any, sender: any, sendResponse: (response?: any) => void) => void): void => {
    chrome.runtime.onMessage.addListener(cb);
}

export const sendMessage = (action: string, data: any): void => {
    chrome.runtime.sendMessage({
        action,
        data
    });
}