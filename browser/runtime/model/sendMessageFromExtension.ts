export const sendMessageFromExtension = (action: string, data: any): void => {
    chrome.runtime?.sendMessage({
        action,
        data
    });
}