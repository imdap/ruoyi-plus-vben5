import { Options } from '../types/state';
import { MaybeComputedElementRef, MaybeRef } from '@vueuse/core';
type InViewOptions = Options['inViewOptions'];
export interface UseInViewOptions extends Omit<InViewOptions, 'root'> {
    root?: MaybeRef<Element | Document>;
}
export declare function useInView(domRef: MaybeComputedElementRef, options?: MaybeRef<UseInViewOptions>): import('vue').Ref<boolean, boolean>;
export {};
