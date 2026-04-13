import { MotionValue } from 'framer-motion/dom';
/**
 * 将多个motion值组合成一个新的motion值,使用模板字符串语法
 *
 * ```vue
 * <script setup>
 * import { useSpring, motionValue, useMotionTemplate } from 'motion-v'
 *
 * const shadowX = useSpring(0)
 * const shadowY = motionValue(0)
 * const shadow = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 20px rgba(0,0,0,0.3))`
 * </script>
 *
 * <template>
 *   <Motion :style="{ filter: shadow }" />
 * </template>
 * ```
 *
 * @public
 */
export declare function useMotionTemplate(fragments: TemplateStringsArray, ...values: Array<MotionValue | number | string>): MotionValue<string>;
