import {sendMessageFromExtension} from '../../../chrome/runtime/model/sendMessageFromExtension';

const CONFIG_CHANGE_DOM = { childList: true, subtree: true };

export const onChangeSender = (actionMame: string) => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            sendMessageFromExtension(actionMame, mutation)
        });
    });

    observer.observe(document.body, CONFIG_CHANGE_DOM);
}