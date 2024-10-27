import {sendMessageFromExtension} from '../../../browser/runtime/model/sendMessageFromExtension';
import {Script} from '../../../entities';
import {useFeatureRunScript} from '../../../src/features/run-script';

const CONFIG_CHANGE_DOM = {childList: true, subtree: true};

const runScript = useFeatureRunScript;

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
    return await runScript.setRunningScript(runningScript);
}

const getRunningScript = async (): Promise<Array<Script> | []> => {
    return await runScript.getRunningScript();
}

const whitForAnimation = async (timeAnimation: number): Promise<void> => {
    return await new Promise((resolve) => setTimeout(resolve, timeAnimation));
}

const getNextElementNode = (runningScript: Array<Script> | [], index = 0): HTMLElement | null => {
    if (runningScript.length === 0) {
        return null
    }
    return document.querySelector(runningScript[index]?.selector)
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
        let isHaveRunningScript = await runScript.getStatusRunningSaved();
        if (!isHaveRunningScript) {
            return
        }
        if (!isCanNextScriptAction) {
            return
        }
        isCanNextScriptAction = false;
        for (let script of await getRunningScript()) {
            if (clickToElementFromSelector(script.selector)) {
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