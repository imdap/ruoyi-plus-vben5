export type WindowEventName = keyof WindowEventMap;
export type DocumentEventName = keyof DocumentEventMap;
export declare function addEventListener<E extends WindowEventName = WindowEventName>(target: Window, eventType: E, cb: WindowEventMap[E], option?: AddEventListenerOptions): {
    remove: () => void;
};
export declare function addEventListener<E extends DocumentEventName = DocumentEventName>(target: Document, eventType: E, cb: DocumentEventMap[E], option?: AddEventListenerOptions): {
    remove: () => void;
};
