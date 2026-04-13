import { MotionState } from '../state/motion-state';
import { IProjectionNode } from 'framer-motion';
import { Ref } from 'vue';
export declare const injectMotion: <T extends MotionState = MotionState>(fallback?: T) => T extends null ? MotionState : MotionState, provideMotion: (contextValue: MotionState) => MotionState;
export interface NodeGroup {
    add: (node: IProjectionNode) => void;
    remove: (node: IProjectionNode) => void;
    dirty: VoidFunction;
}
export interface LayoutGroupState {
    id?: string;
    group?: NodeGroup;
    forceRender?: VoidFunction;
    key?: Ref<number>;
}
export declare const injectLayoutGroup: <T extends LayoutGroupState = LayoutGroupState>(fallback?: T) => T extends null ? LayoutGroupState : LayoutGroupState, provideLayoutGroup: (contextValue: LayoutGroupState) => LayoutGroupState;
