export const sendMessageFromExtension = (action, data) => {
    chrome.runtime.sendMessage({
        action,
        data
    });
}