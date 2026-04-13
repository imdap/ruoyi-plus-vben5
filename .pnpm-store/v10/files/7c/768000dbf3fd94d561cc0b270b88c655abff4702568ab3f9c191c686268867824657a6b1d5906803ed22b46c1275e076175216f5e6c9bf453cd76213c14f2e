import { MotionState } from '../../state';
export declare const PRESENCE_CHILD_ATTR = "data-ap-child";
export interface PresenceContext {
    initial?: boolean;
    custom?: any;
    register?: (container: Element, state: MotionState) => void;
    onMotionExitComplete?: (container: Element, state: MotionState) => void;
    registerPending?: (state: MotionState) => void;
    unregisterPending?: (state: MotionState) => void;
}
export declare const injectAnimatePresence: <T extends PresenceContext = PresenceContext>(fallback?: T) => T extends null ? PresenceContext : PresenceContext, provideAnimatePresence: (contextValue: PresenceContext) => PresenceContext;
