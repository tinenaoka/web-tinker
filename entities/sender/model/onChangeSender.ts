import {sendMessageFromExtension} from '../../../chrome/runtime/model/sendMessageFromExtension';
import {useFeatureRecordLocalStorage} from './storage';

const CONFIG_CHANGE_DOM = { childList: true, subtree: true };

const storage = useFeatureRecordLocalStorage;

const clickToElementFromSelector = (selector: string) => {
    let node = document.querySelector(selector);
    if (!node) {
        return false
    }
    node.click()
    return true;
}

const saveCurrentScriptRunning = async () => {
    let runningScript = await storage.getLocalStorage(storage.keys.runningScript) ?? [];
    if (runningScript.length > 0) {
        runningScript.splice(0, 1)
    }
    return await storage.setLocalStorage(
        storage.keys.runningScript,
        runningScript
    );
}

const whitForAnimation = async (timeAnimation: number) => {
    return await new Promise((resolve) => setTimeout(resolve, timeAnimation));
}

export const onChangeSender = (actionMame: string, timeAnimation = 1200) => {
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
            if (clickToElementFromSelector(selector)) {
                console.log('click')
                await saveCurrentScriptRunning();
                await whitForAnimation(timeAnimation);
                console.log('next script')
            }
        }
        isCanNextScriptAction = true;
        sendMessageFromExtension(actionMame, {})
    });
    observer.observe(document.body, CONFIG_CHANGE_DOM);
}