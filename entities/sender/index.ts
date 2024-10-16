import {ACTIONS_EVENT} from './actions';
import {onChangeSender} from './model/onChangeSender';
import {onClickSender} from './model/onClickSender';

let senderAction = { ...ACTIONS_EVENT } as ACTIONS_EVENT;
senderAction.changeDom = onChangeSender;
senderAction.click = onClickSender;

for (let key in ACTIONS_EVENT) {
    senderAction[key](ACTIONS_EVENT[key]);
}