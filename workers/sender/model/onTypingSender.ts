import {ActionsEvent, ActionTypingData} from '../../../entities';
import {getDomAbsolutePath} from '../../../browser/utils/model/getAbsolutePathFromEvent';
import {getLocation} from '../../../browser/utils/model/getLocation';
import {sendMessageFromBrowser} from '../../../browser/runtime/model/sendMessageFromBrowser';

export const onTypingSender = (actionName: string) => {
    let actionData= <ActionTypingData>{};
    let debounce = null;
    let debounceTime = 500;
    const handlerFocusIn = (event: Event) => {
        actionData.selector = getDomAbsolutePath(<HTMLElement>event.target);
        actionData.link = getLocation();
        document.addEventListener('input', handlerInput, {
            capture: true
        })
    }
    const handlerInput = (event: Event) => {
        clearTimeout(debounce);
        const target = <HTMLInputElement | HTMLTextAreaElement>event.target;
        actionData.value = target.value;
        debounce = setTimeout(() => {
            saveTypingScript()
        }, debounceTime);
    }
    const saveTypingScript = () => {
        clearTimeout(debounce);
        document.removeEventListener('input', handlerInput);
        sendMessageFromBrowser(actionName, actionData)
        sendMessageFromBrowser(ActionsEvent.BugReport, actionData)
    }
    document.addEventListener('focusin', handlerFocusIn, {
        capture: true
    })
}