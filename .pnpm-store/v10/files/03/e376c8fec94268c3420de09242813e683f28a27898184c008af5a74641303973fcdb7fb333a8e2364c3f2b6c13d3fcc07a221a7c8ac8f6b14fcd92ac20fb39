import EventTarget from '../event/EventTarget.js';
import ScreenDetailed from './ScreenDetailed.js';
/**
 * ScreenDetails.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ScreenDetails
 */
export default class ScreenDetails extends EventTarget {
    currentScreen;
    screens;
    // Event handlers
    oncurrentscreenchange = null;
    onscreenschange = null;
    /**
     * Constructor.
     */
    constructor() {
        super();
        const screen = new ScreenDetailed();
        this.currentScreen = screen;
        this.screens = [screen];
    }
}
//# sourceMappingURL=ScreenDetails.js.map