export const getDomAbsolutePath = (element: any) => {
    if (!element) {
        return '';
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