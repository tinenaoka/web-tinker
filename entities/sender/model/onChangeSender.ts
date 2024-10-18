import {sendMessageFromExtension} from '../../../chrome/runtime/model/sendMessageFromExtension';
import {useFeatureRecordLocalStorage} from './storage';

const CONFIG_CHANGE_DOM = { childList: true, subtree: true };

const storage = useFeatureRecordLocalStorage;

const clickToElementFromSelector = (selector: string) => {
    let node = document.querySelector(selector) as HTMLElement;
    if (!node) {
        return false
    }
    node.click()
    return true;
}

const saveCurrentScriptRunning = async () => {
    let runningScript = await getRunningScript();
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

const getRunningScript = async () => {
    return await storage.getLocalStorage(storage.keys.runningScript) ?? []
}

const getNextElementNode = (runningScript: Array<string>, index = 0): HTMLElement | null => {
    return document.querySelector(runningScript[index])
}

const whitForNextElement = async (): Promise<HTMLElement | boolean> => {
    return new Promise(async (resolve) => {
        let runningScript = await getRunningScript();
        if (runningScript.length === 0) {
            resolve(false);
            return false;
        }
        let nextElement = getNextElementNode(runningScript);
        if (nextElement) {
            resolve(nextElement);
            return true;
        }
        const observerNextElement = new MutationObserver(async () => {
            nextElement = getNextElementNode(runningScript);
            if (nextElement !== null) {
                resolve(nextElement);
                observerNextElement.disconnect()
                return true;
            }
        })
        observerNextElement.observe(document.body, CONFIG_CHANGE_DOM);
    })
}

const isNodeVisible = (node: HTMLElement) => {
    let currentElement = node;

    while (currentElement) {
        const style = window.getComputedStyle(currentElement);
        if (style.display === 'none') {
            return false;
        }
        currentElement = currentElement.parentElement;
    }
    return true;
}

const whitForElementIsShowingOnPage = (nextElement: HTMLElement) => {
    if (isNodeVisible(nextElement)) {
        return true;
    }
    return new Promise((resolve) => {
        const observerElement = new MutationObserver(async () => {
            if (isNodeVisible(nextElement)) {
                resolve(true);
                observerElement.disconnect()
                return true;
            }
        })
        observerElement.observe(document.body, CONFIG_CHANGE_DOM);
    })
}

export const onChangeSender = (actionMame: string, timeAnimation = 500) => {
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
        for (let selector of await getRunningScript()) {
            if (clickToElementFromSelector(selector)) {
                console.log('-------CLICK--------')
                await saveCurrentScriptRunning();
                await whitForAnimation(timeAnimation);
                let nextElement = await whitForNextElement();
                if (typeof nextElement !== 'boolean') {
                    await whitForElementIsShowingOnPage(nextElement);
                }
                console.log('-----NEXT CLICK--------')
            }
        }
        console.log('-----END SCRIPTING-------')
        isCanNextScriptAction = true;
        sendMessageFromExtension(actionMame, {})
    });
    observer.observe(document.body, CONFIG_CHANGE_DOM);
}