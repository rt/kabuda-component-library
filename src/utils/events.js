
export default class Events {

    static isLeftClickEvent(event) {
        return event.button === 0;
    }

    static isModifiedEvent(event) {
        return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
    }

}
