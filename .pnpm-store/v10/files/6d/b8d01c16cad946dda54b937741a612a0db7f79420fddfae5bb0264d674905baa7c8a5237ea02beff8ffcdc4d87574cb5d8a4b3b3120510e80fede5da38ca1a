import EventTarget from '../../event/EventTarget.js';
import type Event from '../../event/Event.js';
import type TextTrack from './TextTrack.js';
import * as PropertySymbol from '../../PropertySymbol.js';
/**
 * TextTrackCue.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TextTrackCue
 */
export default abstract class TextTrackCue extends EventTarget {
    id: string;
    startTime: number;
    endTime: number;
    pauseOnExit: boolean;
    [PropertySymbol.track]: TextTrack | null;
    onenter: ((event: Event) => void) | null;
    onexit: ((event: Event) => void) | null;
    /**
     * Constructor.
     *
     * @param illegalConstructorSymbol Illegal constructor symbol.
     */
    constructor(illegalConstructorSymbol: symbol);
    /**
     * Returns the owner track.
     *
     * @returns TextTrack.
     */
    get track(): TextTrack | null;
}
//# sourceMappingURL=TextTrackCue.d.ts.map