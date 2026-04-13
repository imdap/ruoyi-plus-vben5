import Event from '../Event.js';
/**
 *
 */
export default class CloseEvent extends Event {
    code;
    reason;
    wasClean;
    /**
     * Constructor.
     *
     * @param type Event type.
     * @param [eventInit] Event init.
     */
    constructor(type, eventInit = null) {
        super(type, eventInit);
        this.code = eventInit?.code ?? 0;
        this.reason = eventInit?.reason ?? '';
        this.wasClean = eventInit?.wasClean ?? false;
    }
}
//# sourceMappingURL=CloseEvent.js.map