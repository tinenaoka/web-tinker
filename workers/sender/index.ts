import {onChangeSender} from './model/onChangeSender';
import {onClickSender} from './model/onClickSender';
import {ActionsEvent} from '../../entities';

let senderAction = {};
senderAction[ActionsEvent.ChangeDom] = onChangeSender;
senderAction[ActionsEvent.Click] = onClickSender;

for (let key in senderAction) {
    senderAction[key](key);
}