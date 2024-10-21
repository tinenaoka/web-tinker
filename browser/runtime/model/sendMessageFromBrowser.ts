export const sendMessageFromBrowser = (action: string, data: any): void => {
    window?.chrome.runtime?.sendMessage({
        action,
        data
    });
}