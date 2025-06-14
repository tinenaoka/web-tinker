import {Script} from '../../../entities';
import {useFeatureRunScript} from '../../../src/features/run-script';
import {sendMessageFromBrowser} from '../../../browser/runtime';

const CONFIG_CHANGE_DOM = {
    childList: true,
    subtree: true,
    attributes: true
};
const CONFIG_CHANGE_BUTTON = {
    attributes: true
};
const EVENT_CLICK_OPTIONS = {
    view: window,
    bubbles: true,
    cancelable: true,
}

const runScript = useFeatureRunScript;

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

const isNodeCanFill = (node: HTMLElement): boolean => {
    return node.nodeName === 'INPUT' ||
        node.nodeName === 'TEXTAREA';
}

const clickToElement = (node: HTMLElement): void => {
    const eventClick = new MouseEvent('click', EVENT_CLICK_OPTIONS);
    const eventMouseDown = new MouseEvent('mousedown', EVENT_CLICK_OPTIONS);
    const eventFocus = new MouseEvent('focus', EVENT_CLICK_OPTIONS);
    node.dispatchEvent(eventMouseDown);
    node.dispatchEvent(eventFocus);
    node.dispatchEvent(eventClick);
}

const fillToElement = async (node: HTMLElement): Promise<void> => {
    if (!isNodeCanFill(node)) {
        return;
    }
    let runningScript = await getRunningScript();
    if (runningScript[0].value === null) {
        return;
    }
    let fillValue = runningScript[0].value.toString();
    const fillNode = <HTMLInputElement | HTMLTextAreaElement>node;
    const eventInput = new InputEvent('input', {
        data: fillValue
    });
    fillNode.value = fillValue;
    fillNode.dispatchEvent(eventInput);
}

const getRunningScript = async (): Promise<Script[]> => {
    return await runScript.getRunningScript();
}

const getCurrentElementNode = (runningScript: Script[], index = 0): HTMLElement | null => {
    return document.querySelector(runningScript[index].selector)
}

const saveCurrentScriptRunning = async (): Promise<void> => {
    let runningScript = await getRunningScript();
    if (runningScript.length > 0) {
        runningScript.splice(0, 1)
    }
    return await runScript.setRunningScript(runningScript);
}

const waitForAnimation = async (timeAnimation: number): Promise<void> => {
    return await new Promise((resolve) => setTimeout(resolve, timeAnimation));
}

const waitForCurrentElement = (): Promise<HTMLElement> => {
    return new Promise(async (resolve): Promise<HTMLElement> => {
        let runningScript = await getRunningScript();
        let nextElement = getCurrentElementNode(runningScript);
        if (nextElement !== null) {
            resolve(nextElement);
            return;
        }

        const observerNextElement = new MutationObserver(async (): Promise<boolean> => {
            nextElement = getCurrentElementNode(runningScript);
            if (nextElement !== null) {
                resolve(nextElement);
                observerNextElement.disconnect()
                return;
            }
        })
        observerNextElement.observe(document.body, CONFIG_CHANGE_DOM);
    })
}

const waitForElementIsShowingOnPage = (nextElement: HTMLElement): Promise<boolean> | boolean => {
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

const waitForButtonIsNotDisabled = (nextElement: HTMLElement): Promise<boolean> | boolean => {
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
            await waitForElementIsShowingOnPage(currentElement);
            console.log('-------- SHOW ON PAGE ----------')
            await waitForButtonIsNotDisabled(currentElement);
            console.log('-------- BUTTON IS NOT DISABLED ----------')
            clickToElement(currentElement);
            console.log('-------CLICK--------', (await getRunningScript()).length)
            await fillToElement(currentElement);
            console.log('-------FILL--------')
            await saveCurrentScriptRunning();
            await waitForAnimation(timeAnimation);
            console.log('-------ANIMATION--------')
        }
        console.log('-----END SCRIPTING-------')
        isCanNextScriptAction = true;
        sendMessageFromBrowser(actionMame, {})
    });
    observer.observe(document.body, CONFIG_CHANGE_DOM);
}