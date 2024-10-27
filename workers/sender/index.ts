import {onChangeSender} from './model/onChangeSender';
import {onClickSender} from './model/onClickSender';
import {onBugReportSender} from './model/onBugReportSender';
import {ActionsEvent} from '../../entities';

let senderAction = {};
senderAction[ActionsEvent.ChangeDom] = onChangeSender;
senderAction[ActionsEvent.Click] = onClickSender;
senderAction[ActionsEvent.BugReport] = onBugReportSender;

for (let key in senderAction) {
    senderAction[key](key);
}