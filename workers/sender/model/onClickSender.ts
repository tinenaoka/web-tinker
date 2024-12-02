import {sendMessageFromBrowser} from '../../../browser/runtime/model/sendMessageFromBrowser';
import {getDomAbsolutePath} from '../../../browser/utils/model/getAbsolutePathFromEvent';
import {getLocation} from '../../../browser/utils/model/getLocation';
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
    document.addEventListener('click', handlerClick, {
        capture: true
    })
}