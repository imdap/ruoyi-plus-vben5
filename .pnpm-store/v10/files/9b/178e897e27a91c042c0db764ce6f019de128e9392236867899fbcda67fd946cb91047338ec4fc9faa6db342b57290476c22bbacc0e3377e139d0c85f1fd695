/**
 * Creates `AnimationControls`, which can be used to manually start, stop
 * and sequence animations on one or more components.
 *
 * The returned `AnimationControls` should be passed to the `animate` property
 * of the components you want to animate.
 *
 * These components can then be animated with the `start` method.
 *
 * ```jsx
 * import { motion, useAnimationControls } from 'motion-v'
 *
 * export default defineComponent({
 *    setup() {
 *        const controls = useAnimationControls()
 *
 *        controls.start({
 *            x: 100,
 *            transition: { duration: 0.5 },
 *        })
 *
 *        return () => (
 *            <motion.div animate={controls} />
 *        )
 *    }
 * })
 * ```
 *
 * @returns Animation controller with `start`, `stop`, `set` and `mount` methods
 *
 * @public
 */
export declare function useAnimationControls(): import('../types').AnimationControls;
