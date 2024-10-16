export const sendMessageFromChrome = (action, data) => {
    window?.chrome.runtime.sendMessage({
        action,
        data
    });
}