import { ScrollInfoOptions } from '../types';
import { MaybeComputedElementRef } from '@vueuse/core';
import { ToRefs } from '../types/common';
export interface UseScrollOptions extends Omit<ToRefs<ScrollInfoOptions>, 'container' | 'target'> {
    container?: MaybeComputedElementRef;
    target?: MaybeComputedElementRef;
}
export declare function useScroll(scrollOptions?: UseScrollOptions): {
    scrollX: import('framer-motion/dom').MotionValue<number>;
    scrollY: import('framer-motion/dom').MotionValue<number>;
    scrollXProgress: import('framer-motion/dom').MotionValue<number>;
    scrollYProgress: import('framer-motion/dom').MotionValue<number>;
};
