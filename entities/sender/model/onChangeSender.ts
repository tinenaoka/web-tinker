import {sendMessageFromExtension} from '../../../chrome/runtime/model/sendMessageFromExtension';
import {useFeatureRecordLocalStorage} from './storage';

const CONFIG_CHANGE_DOM = { childList: true, subtree: true };

const storage = useFeatureRecordLocalStorage;

export const onChangeSender = (actionMame: string, timeAnimation = 3000) => {
    let isCanNextScriptAction = true;
    const observer = new MutationObserver(async () => {
        let isHaveRunningScript = await storage.getLocalStorage(storage.keys.statusRunningSaved);
        if (!isHaveRunningScript) {
            return
        }
        if (!isCanNextScriptAction) {
            return
        }
        isCanNextScriptAction = false;
        for (let selector of await storage.getLocalStorage(storage.keys.runningScript)) {
            let node = document.querySelector(selector);
            if (node) {
                node.click()
                let runningScript = await storage.getLocalStorage(storage.keys.runningScript) ?? [];
                if (runningScript.length > 0) {
                    runningScript.splice(0, 1)
                }
                await storage.setLocalStorage(
                    storage.keys.runningScript,
                    runningScript
                );
                await new Promise((resolve) => setTimeout(resolve, timeAnimation));
            }
        }
        isCanNextScriptAction = true;
        sendMessageFromExtension(actionMame, {})
    });
    observer.observe(document.body, CONFIG_CHANGE_DOM);
}