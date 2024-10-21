import {onClickEvent} from './model/onClickEvent';
import {onChangeEvent} from './model/onChangeEvent';
import {ActionsEvent} from '../../entities';
import {addMessageListener} from '../../browser/runtime/model/addMessageListener';

let listenerAction = {};
listenerAction[ActionsEvent.Click] = onClickEvent;
listenerAction[ActionsEvent.ChangeDom] = onChangeEvent;

addMessageListener(({action, data}) => {
    let activeAction = listenerAction[action];
    if (!activeAction) {
        return
    }
    activeAction(data);
})