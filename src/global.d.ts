export {};
declare global {
    interface Window {
        chrome: any;
        _scriptRecorded: any;
        _isNeedDeleteEventListener: boolean;
    }
}