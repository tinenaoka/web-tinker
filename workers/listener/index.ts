import {onClickEvent} from './model/onClickEvent';
import {onChangeEvent} from './model/onChangeEvent';
import {onBugReportEvent} from './model/onBugReportEvent';
import {ActionsEvent, Message} from '../../entities';
import {addMessageListener} from '../../browser/runtime';
import {onTypingEvent} from './model/onTypingEvent';

let listenerAction = {};
listenerAction[ActionsEvent.Click] = onClickEvent;
listenerAction[ActionsEvent.ChangeDom] = onChangeEvent;
listenerAction[ActionsEvent.BugReport] = onBugReportEvent;
listenerAction[ActionsEvent.Typing] = onTypingEvent;
addMessageListener(({action, data}: Message) => {
    let activeAction = listenerAction[action];
    if (!activeAction) {
        return
    }
    activeAction(data);
})