export const sendMessageFromExtension = <Type>(action: string, data: Type): void => {
    chrome.runtime?.sendMessage({
        action,
        data
    });
}