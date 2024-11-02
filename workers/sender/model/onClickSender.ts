import {sendMessageFromBrowser} from '../../../browser/runtime/model/sendMessageFromBrowser';
import {getDomAbsolutePath} from '../../../browser/utils/model/getAbsolutePathFromEvent';

export const onClickSender = (actionName: string) => {
    const handlerClick = (event: Event) => {
        sendMessageFromBrowser(actionName, getDomAbsolutePath(<HTMLElement>event.target))
    }
    document.addEventListener('click', handlerClick, {
        capture: true
    })
}