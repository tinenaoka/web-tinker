export const sendMessageFromBrowser = <Type>(action: string, data: Type): void => {
    window?.chrome.runtime?.sendMessage({
        action,
        data
    });
}