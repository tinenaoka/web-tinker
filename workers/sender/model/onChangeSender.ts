import {sendMessageFromExtension} from '../../../chrome/runtime/model/sendMessageFromExtension';
import {useFeatureRecordLocalStorage} from '../../../chrome/storage';

const CONFIG_CHANGE_DOM = { childList: true, subtree: true };

const storage = useFeatureRecordLocalStorage;

const clickToElementFromSelector = (selector: string): boolean => {
    let node = <HTMLElement>document.querySelector(selector);
    if (!node) {
        return false
    }
    node.click()
    return true;
}

const saveCurrentScriptRunning = async (): Promise<void> => {
    let runningScript = await getRunningScript();
    if (runningScript.length > 0) {
        runningScript.splice(0, 1)
    }
    return await storage.setLocalStorage(
        storage.keys.runningScript,
        runningScript
    );
}

const whitForAnimation = async (timeAnimation: number): Promise<void> => {
    return await new Promise((resolve) => setTimeout(resolve, timeAnimation));
}

const getRunningScript = async (): Promise<Array<string> | []> => {
    return await storage.getLocalStorage(storage.keys.runningScript) ?? []
}

const getNextElementNode = (runningScript: Array<string> | [], index = 0): HTMLElement | null => {
    if (runningScript.length === 0) {
        return null
    }
    return document.querySelector(runningScript[index])
}

const whitForNextElement = async (): Promise<HTMLElement | boolean> => {
    return new Promise(async (resolve): Promise<boolean> => {
        let runningScript = await getRunningScript();
        if (runningScript.length === 0) {
            resolve(false);
            return false;
        }

        let nextElement = getNextElementNode(runningScript);
        if (nextElement !== null) {
            resolve(nextElement);
            return true;
        }

        const observerNextElement = new MutationObserver(async (): Promise<boolean> => {
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

const isNodeVisible = (node: HTMLElement): boolean => {
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

const whitForElementIsShowingOnPage = (nextElement: HTMLElement): Promise<boolean> | boolean => {
    if (isNodeVisible(nextElement)) {
        return true;
    }
    return new Promise((resolve): void => {
        const observerElement = new MutationObserver(async (): Promise<boolean> => {
            if (isNodeVisible(nextElement)) {
                resolve(true);
                observerElement.disconnect()
                return true;
            }
        })
        observerElement.observe(document.body, CONFIG_CHANGE_DOM);
    })
}

export const onChangeSender = (actionMame: string, timeAnimation = 500): void => {
    let isCanNextScriptAction = true;
    const observer = new MutationObserver(async (): Promise<void> => {
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