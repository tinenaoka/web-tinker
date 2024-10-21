import {onClickEvent} from './model/onClickEvent';
import {onChangeEvent} from './model/onChangeEvent';
import {ActionsEvent} from '../../entities';
import {addListener} from '../../chrome/runtime/model/addListener';

let listenerAction  = {};
listenerAction[ActionsEvent.Click] = onClickEvent;
listenerAction[ActionsEvent.ChangeDom] = onChangeEvent;

addListener(({action, data}) => {
    let activeAction = listenerAction[action];
    if (!activeAction) {
        return
    }
    activeAction(data);
})