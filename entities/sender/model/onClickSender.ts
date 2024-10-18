import {sendMessageFromChrome} from '../../../chrome/runtime/model/sendMessageFromChrome';
import {getDomAbsolutePath} from '../../../chrome/utils/model/getAbsolutePathFromEvent';

export const onClickSender = (actionName: string) => {
    const handlerClick = (event: Event) => {
        sendMessageFromChrome(actionName, getDomAbsolutePath(event.target as HTMLElement))
    }
    document.addEventListener('click', handlerClick, true)
}