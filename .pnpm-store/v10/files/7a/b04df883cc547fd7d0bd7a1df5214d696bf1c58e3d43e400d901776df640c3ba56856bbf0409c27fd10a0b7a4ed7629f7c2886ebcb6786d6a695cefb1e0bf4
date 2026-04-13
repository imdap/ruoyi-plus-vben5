import { CSSProperties, Ref } from 'vue';
import { Placement } from '../Drawer';
export interface UseDragOptions {
    prefixCls: Ref<string>;
    direction: Ref<Placement>;
    className: Ref<string | undefined>;
    style: Ref<CSSProperties | undefined>;
    maxSize: Ref<number | undefined>;
    containerRef: Ref<HTMLElement | undefined>;
    currentSize: Ref<number | string | undefined>;
    onResize?: (size: number) => void;
    onResizeEnd?: (size: number) => void;
    onResizeStart?: (size: number) => void;
}
export default function useDrag(options: UseDragOptions): {
    dragElementProps: import('vue').ComputedRef<{
        class: string;
        style: CSSProperties | undefined;
        onMousedown: (e: MouseEvent) => void;
    }>;
    isDragging: import('vue').ShallowRef<boolean, boolean>;
};
