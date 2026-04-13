import { AnimationPlaybackControls } from 'framer-motion';
import { Ref, UnwrapRef } from 'vue';
import { createScopedAnimate } from 'framer-motion/dom';
type Scope = Ref<UnwrapRef<Element>> & {
    animations: AnimationPlaybackControls[];
};
export declare function useAnimate<T extends Element = any>(): [Scope, ReturnType<typeof createScopedAnimate>];
export {};
