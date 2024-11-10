import {sendMessageFromBrowser} from '../../../browser/runtime/model/sendMessageFromBrowser';
import {getDomAbsolutePath} from '../../../browser/utils/model/getAbsolutePathFromEvent';
import {ActionClickData} from "../../../entities";
import {getLocation} from "../../../browser/utils/model/getLocation";

export const onBugReportSender = (actionName: string) => {
    const handlerClick = (event: Event) => {
        let actionData: ActionClickData = {
            selector: getDomAbsolutePath(<HTMLElement>event.target),
            link: getLocation(),
        };
        sendMessageFromBrowser(actionName, actionData)
    }
    document.addEventListener('click', handlerClick, {
        capture: true
    })
}