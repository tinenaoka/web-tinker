import {useFeatureInjectScript} from '../../inject-script';

const injector = useFeatureInjectScript;

const runScriptRecorded = async (scripts: any) => {
    console.log(JSON.parse(JSON.stringify(scripts)))
    let unUseScripts = Object.assign([], scripts)
    let intervalMutation: any = null;
    let intervalMutationTime = 1000;

    function elementFoundCallback(element: HTMLElement, defaultDelay: number = intervalMutationTime) {
        console.log(element, 'click')
        return new Promise((resolve) => {
            setTimeout(() => {
                unUseScripts.shift();
                element.click();
                resolve(true)
            }, defaultDelay)
        })
    }

    for (let script of unUseScripts) {
        const element = document.querySelector(script) as HTMLElement;
        if (element) {
            await elementFoundCallback(element);
            console.log('await')
        }
    }

    if (unUseScripts.length === 0) {
        console.log('SUCCESSSSSSS')
        return
    }

    let isCanUseCallBackMutation = true;

    const callBackMutation = async () => {
        if (unUseScripts.length === 0) {
            return true;
        }
        const element = document.querySelector(unUseScripts[0]) as HTMLElement;
        if (!element) {
            return false
        }
        if (!isCanUseCallBackMutation) {
            return false
        }
        isCanUseCallBackMutation = false;
        await elementFoundCallback(element);
        isCanUseCallBackMutation = true;
        return false
    }

    const observer = new MutationObserver(async () => {
        if (await callBackMutation()) {
            console.log('SUCCESSSSSSS')
            observer.disconnect();
            clearInterval(intervalMutation)
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
    });

    intervalMutation = setInterval(() => {

    }, intervalMutationTime)
}

const runScript = (script: Array<string>, cb: Function): boolean => {
    return injector.injectScript(runScriptRecorded, cb, script);
}


export const useFeatureRunScript = {
    runScript,
}