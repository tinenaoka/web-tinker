export {};

declare global {
    interface Window {
        chrome: typeof chrome | any;
    }
}