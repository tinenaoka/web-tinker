import {ACTIONS_EVENT} from './actions';
import {onClickEvent} from './model/onClickEvent';
import {onChangeEvent} from './model/onChangeEvent';
import {addListener} from './model/chorme';

let listenerAction  = { ...ACTIONS_EVENT } as ACTIONS_EVENT;
listenerAction.changeDom = onChangeEvent;
listenerAction.click = onClickEvent;

addListener(({action, data}) => {
    let activeAction = listenerAction[action];
    if (!activeAction) {
        return
    }
    activeAction(data);
})