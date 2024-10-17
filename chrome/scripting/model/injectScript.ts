export const injectScript = (
    onInject: () => unknown,
    onReturn: () => unknown = () => {},
    args: [] = []
): boolean => {
    if (!chrome) {
        return false;
    }
    chrome.tabs.query(
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
                    args: args
                },
                onReturn
            )
        }
    );
    return true;
}