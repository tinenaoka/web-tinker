import {sendMessageFromBrowser} from '../../../browser/runtime/model/sendMessageFromBrowser';
import {getDomAbsolutePath} from '../../../browser/utils/model/getAbsolutePathFromEvent';

export const onBugReportSender = (actionName: string) => {
    const handlerClick = (event: Event) => {
        sendMessageFromBrowser(actionName, getDomAbsolutePath(<HTMLElement>event.target))
    }
    document.addEventListener('click', handlerClick, true)
}