import MessageSender = chrome.runtime.MessageSender;
import {Message} from '../../../entities';

export const addMessageListener = (cb: (message: Message, sender: MessageSender, sendResponse: (response?: unknown) => void) => void): void => {
    chrome.runtime?.onMessage.addListener(cb);
}