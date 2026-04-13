import { UniqueShowOptions } from '../context.ts';
/**
 * Control the state of popup bind target:
 * 1. When set `target`. Do show the popup.
 * 2. When `target` is removed. Do hide the popup.
 * 3. When `target` change to another one:
 *  a. We wait motion finish of previous popup.
 *  b. Then we set new target and show the popup.
 * 4. During appear/enter animation, cache new options and apply after animation completes.
 */
export default function useTargetState(): readonly [(nextOptions: UniqueShowOptions | false) => void, import('vue').Ref<boolean, boolean>, import('vue').Ref<UniqueShowOptions | undefined, UniqueShowOptions | undefined>, (visible: boolean) => void];
