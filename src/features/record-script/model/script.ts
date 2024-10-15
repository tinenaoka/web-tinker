import {useFeatureInjectScript} from '../../inject-script';

const injector = useFeatureInjectScript;

const getScriptRecorded = (): Array<any> => {
    let origin: string = window.location.origin;
    let getDomAbsolutePath = (element: any) => {
        if (!element) {
            return '';
        }

        const getLinkWithoutOrigin = (link: string): string => {
            return link.replaceAll(origin, '')
        }

        if (element.src && element.src.indexOf(origin) < 0) {
            return `[src='${getLinkWithoutOrigin(element.src)}']`;
        }

        if (element.href) {
            return `[href='${getLinkWithoutOrigin(element.href)}']`;
        }

        let path = [];
        while (element?.nodeType === Node.ELEMENT_NODE) {
            let selector = element.nodeName.toLowerCase();
            if (element.parentNode) {
                let sibling = element;
                let nth = 1;
                while ((sibling = sibling.previousElementSibling) !== null) {
                    if (sibling.nodeName === element.nodeName) nth++;
                }
                selector += `:nth-of-type(${nth})`;
            }

            path.unshift(selector);
            element = element.parentNode;
        }

        return path.join(' > ');
    }

    let _scriptRecorded = window._scriptRecorded;
    if (_scriptRecorded === undefined) {
        window._scriptRecorded = [];
        _scriptRecorded = [];
    }
    const setItemScript = (event: MouseEvent) => {
        let path = getDomAbsolutePath(event.target);
        if (path !== null) {
            window._scriptRecorded.push(getDomAbsolutePath(event.target))
        }
    }
    document.removeEventListener('click', setItemScript);
    if (window._isNeedDeleteEventListener) {
        delete window._scriptRecorded;
        return [];
    }
    if (_scriptRecorded.length === 0) {
        document.addEventListener('click', setItemScript);
        return [];
    }
    _scriptRecorded = Object.assign([], window._scriptRecorded);
    window._scriptRecorded = [];
    return _scriptRecorded;
}

const deleteScriptRecorded = () => {
    window._isNeedDeleteEventListener = true;
}

const createScriptRecorded = () => {
    window._isNeedDeleteEventListener = false;
}

const recordScript = (): boolean => {
    injector.injectScript(createScriptRecorded);
    return injector.injectScript(getScriptRecorded);
}

const destroyRecordScript = (): boolean => {
    injector.injectScript(deleteScriptRecorded);
    return injector.injectScript(recordScript);
}

const saveScript = (cb: Function): boolean => {
    injector.injectScript(createScriptRecorded);
    return injector.injectScript(getScriptRecorded, cb);
}


export const useFeatureRecordScript = {
    recordScript,
    saveScript,
    destroyRecordScript,
}