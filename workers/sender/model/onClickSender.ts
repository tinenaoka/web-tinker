import {sendMessageFromBrowser} from '../../../browser/runtime';
import {getDomAbsolutePath} from '../../../browser/utils';
import {getLocation} from '../../../browser/utils';
import {ActionClickData, ActionsEvent} from '../../../entities';

export const onClickSender = (actionName: string) => {
    const handlerClick = (event: Event) => {
        let actionData: ActionClickData = {
            selector: getDomAbsolutePath(<HTMLElement>event.target),
            link: getLocation(),
        };
        sendMessageFromBrowser(actionName, actionData)
        sendMessageFromBrowser(ActionsEvent.BugReport, actionData)
    }
    document.addEventListener('click', handlerClick, { // mousedown
        capture: true
    })
}