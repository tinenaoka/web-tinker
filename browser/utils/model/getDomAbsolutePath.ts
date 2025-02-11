export const getDomAbsolutePath = (element: HTMLElement | null): string => {
    if (!element) {
        return '';
    }
    let path = [];
    const ignoreClasses = ['nuxt-progress'];

    const isSiblingValid = (elementSibling: HTMLElement) => {
        let classListNode = elementSibling.classList;
        let isSiblingValid = true;
        for (let classItem of classListNode) {
            let ignoreClass: string | undefined = ignoreClasses.find(ignoreClass => ignoreClass === classItem)
            if (ignoreClass !== undefined) {
                isSiblingValid = false
            }
        }
        return isSiblingValid;
    }

    while (element?.nodeType === Node.ELEMENT_NODE) {
        let selector = element.nodeName.toLowerCase();
        let parentNode = <HTMLElement>element.parentNode;
        if (parentNode) {
            let sibling = element;
            let nth = 1;
            while ((sibling = <HTMLElement>sibling.previousElementSibling) !== null) {
                if (
                    sibling.nodeName === element.nodeName &&
                    isSiblingValid(sibling)
                ) {
                    nth++
                }
            }
            selector += `:nth-of-type(${nth})`;
        }
        path.unshift(selector);
        element = <HTMLElement>parentNode;
    }

    return path.join(' > ');
}