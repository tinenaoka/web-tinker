import {sendMessageFromChrome} from '../../../chrome/runtime/model/sendMessageFromChrome';
import {getDomAbsolutePath} from '../../../chrome/utils/model/getAbsolutePathFromEvent';

export const onClickSender = (actionName: string) => {
    const handlerClick = (event: Event) => {
        sendMessageFromChrome(actionName, getDomAbsolutePath(<HTMLElement>event.target))
    }
    document.addEventListener('click', handlerClick, true)
}