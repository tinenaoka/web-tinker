import {Script} from '../../../entities';
import {useFeatureRunScript} from '../../../src/features/run-script';
import {sendMessageFromBrowser} from '../../../browser/runtime/model/sendMessageFromBrowser';

const CONFIG_CHANGE_DOM = {childList: true, subtree: true, attributes: true};
const CONFIG_CHANGE_BUTTON = {attributes: true};

const runScript = useFeatureRunScript;

const clickToElement = (node: HTMLElement): void => {
    node.click()
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

const getCurrentElementNode = (runningScript: Array<Script> | [], index = 0): HTMLElement | null => {
    return document.querySelector(runningScript[index].selector)
}

const waitForCurrentElement = async (): Promise<HTMLElement> => {
    return new Promise(async (resolve): Promise<boolean> => {
        let runningScript = await getRunningScript();
        let nextElement = getCurrentElementNode(runningScript);
        if (nextElement !== null) {
            resolve(nextElement);
            return true;
        }

        const observerNextElement = new MutationObserver(async (): Promise<boolean> => {
            console.log('observerNextElement', getCurrentElementNode(runningScript), runningScript[0])
            nextElement = getCurrentElementNode(runningScript);
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

const isNodeButton = (node: HTMLElement): boolean => {
    return node.nodeName === 'BUTTON';
}

const isButtonDisabled = (node: HTMLButtonElement): boolean => {
    return node.disabled;
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

const whitForButtonIsNotDisabled = (nextElement: HTMLElement): Promise<boolean> | boolean => {
    if (!isNodeButton(nextElement)) {
        return true;
    }
    if (!isButtonDisabled(<HTMLButtonElement>nextElement)) {
        return true;
    }
    return new Promise((resolve): void => {
        const observerElement = new MutationObserver(async (): Promise<boolean> => {
            if (!isButtonDisabled(<HTMLButtonElement>nextElement)) {
                resolve(true);
                observerElement.disconnect()
                return true;
            }
        })
        observerElement.observe(nextElement, CONFIG_CHANGE_BUTTON);
    })
}

export const onChangeSender = (actionMame: string, timeAnimation = 500): void => {
    let isCanNextScriptAction = true;
    const observer = new MutationObserver(async (): Promise<void> => {
        let isHaveRunningScript = await runScript.getStatusRunningSaved();
        if (!isHaveRunningScript) {
            isCanNextScriptAction = true;
            return
        }
        if (!isCanNextScriptAction) {
            return
        }
        isCanNextScriptAction = false;
        while ((await getRunningScript()).length > 0) {
            console.log('-------START WAIT CURRENT--------')
            console.log(await getRunningScript())
            let currentElement = await waitForCurrentElement();
            console.log('-------END WAIT CURRENT--------')
            await whitForElementIsShowingOnPage(currentElement);
            console.log('-------- SHOW ON PAGE ----------')
            await whitForButtonIsNotDisabled(currentElement);
            console.log('-------- BUTTON IS NOT DISABLED ----------')
            clickToElement(currentElement)
            console.log('-------CLICK--------')
            await saveCurrentScriptRunning();
            await whitForAnimation(timeAnimation);
            console.log('-------ANIMATION--------')
        }
        console.log('-----END SCRIPTING-------')
        isCanNextScriptAction = true;
        sendMessageFromBrowser(actionMame, {})
    });
    observer.observe(document.body, CONFIG_CHANGE_DOM);
}