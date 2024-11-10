export const injectScript = (
    onInject: (args: Array<any>) => unknown,
    onReturn: () => unknown = () => {},
    args: Array<any> = []
): boolean => {
    if (!chrome) {
        return false;
    }
    chrome.tabs.query(
        {active: true},
        (tabs: Array<any>): void => {
            let activeTab = tabs.filter(tab => tab.lastAccessed !== undefined)
                .sort((a, b) => b.lastAccessed - a.lastAccessed)[0];
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