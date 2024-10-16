export const getDomAbsolutePath = (element: any) => {
    if (!element) {
        return '';
    }

    let origin: string = window.location.origin;

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