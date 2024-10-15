const chrome: any = window.chrome;

const injectScript = (
    onInject: Function,
    onReturn: null | Function = null,
    args: Array<any> = []
): boolean => {
    if (!chrome) {
        return false;
    }
    chrome.tabs?.query(
        {active: true},
        (tabs: Array<any>): void => {
            let activeTab = tabs.sort((a, b) => b.lastAccessed - a.lastAccessed)[0];
            if (!activeTab) {
                return
            }
            chrome.scripting.executeScript(
                {
                    target: {
                        tabId: activeTab.id,
                        allFrames: true
                    },
                    func: onInject,
                    args: [args]
                },
                onReturn
            )
        }
    );
    return true;
}

export const useFeatureInjectScript = {
    injectScript,
}