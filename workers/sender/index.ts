import {onChangeSender} from './model/onChangeSender';
import {onClickSender} from './model/onClickSender';
import {ActionsEvent} from '../../entities';
import {useFeatureRunScript} from '../../src/features/run-script';
import {sendMessageFromBrowser} from '../../browser/runtime';
import {onTypingSender} from './model/onTypingSender';

let senderAction = {};
senderAction[ActionsEvent.ChangeDom] = onChangeSender;
senderAction[ActionsEvent.Click] = onClickSender;
senderAction[ActionsEvent.Typing] = onTypingSender;
let runner = useFeatureRunScript;

for (let key in senderAction) {
    senderAction[key](key);
}
console.log('--------- RunScriptOnInitLocation --------------')
window.addEventListener('load', async () => {
    sendMessageFromBrowser(ActionsEvent.InitLocation, true)
    await runner.runScriptOnInitLocation();
});