export const addListener = (cb: Function) => {
    chrome.runtime.onMessage.addListener(cb);
}