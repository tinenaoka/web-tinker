export const addListener = (cb: (message: any, sender: any, sendResponse: (response?: any) => void) => void) => {
    chrome.runtime.onMessage.addListener(cb);
}

export const sendMessage = (action, data) => {
    chrome.runtime.sendMessage({
        action,
        data
    });
}