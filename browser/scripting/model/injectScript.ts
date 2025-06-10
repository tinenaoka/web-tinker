import Tab = chrome.tabs.Tab;

export const injectScript = (
    onInject: (args: unknown[]) => void,
    onReturn: () => unknown = () => {},
    args: unknown[] = []
): boolean => {
    if (!chrome) {
        return false;
    }
    chrome.tabs.query(
        {active: true},
        (tabs: Tab[]): void => {
            let activeTabs = tabs
                .filter(tab => tab.lastAccessed !== undefined)
                .sort((a, b) => (b.lastAccessed || 0) - (a.lastAccessed || 0));

            let activeTab = activeTabs[0];
            if (typeof activeTab === 'undefined') {
                return
            }

            chrome.scripting.executeScript(
                {
                    target: {
                        tabId: activeTab.id || 0,
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