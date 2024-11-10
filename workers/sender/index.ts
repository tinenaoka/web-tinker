import {onChangeSender} from './model/onChangeSender';
import {onClickSender} from './model/onClickSender';
import {onBugReportSender} from './model/onBugReportSender';
import {ActionsEvent} from '../../entities';
import {useFeatureRunScript} from '../../src/features/run-script';

let senderAction = {};
senderAction[ActionsEvent.ChangeDom] = onChangeSender;
senderAction[ActionsEvent.Click] = onClickSender;
senderAction[ActionsEvent.BugReport] = onBugReportSender;
let runner = useFeatureRunScript;

for (let key in senderAction) {
    senderAction[key](key);
}
console.log('--------- RunScriptOnInitLocation --------------')
window.addEventListener('load', () => {
    runner.runScriptOnInitLocation()
});