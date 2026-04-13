import { MotionProps } from '../motion';
import { ElementType } from '../../types';
export interface GroupItemProps<T extends ElementType = 'li', K = unknown, V = unknown> extends MotionProps<T, K> {
    /**
     * The value in the list that this component represents.
     *
     * @public
     */
    value: V;
    /**
     * A subset of layout options primarily used to disable layout="size"
     *
     * @public
     * @default true
     */
    layout?: true | 'position';
}
declare const _default: <T extends ElementType = "li", K = unknown, V = unknown>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<Pick<Partial<{}> & Omit<{} & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, never>, never> & GroupItemProps<keyof import('vue').IntrinsicElementAttributes, unknown, unknown>> & import('vue').PublicProps;
    expose(exposed: import('vue').ShallowUnwrapRef<{}>): void;
    attrs: any;
    slots: {
        default?(_: {
            isDragging: boolean;
        }): any;
    };
    emit: {};
}>) => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}> & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
export default _default;
type __VLS_PrettifyLocal<T> = {
    [K in keyof T]: T[K];
} & {};
