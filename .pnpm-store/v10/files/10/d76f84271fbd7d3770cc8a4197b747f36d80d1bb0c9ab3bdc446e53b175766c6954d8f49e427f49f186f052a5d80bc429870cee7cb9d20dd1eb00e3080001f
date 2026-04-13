import { Ref } from 'vue';
import { DispatchZoomChangeFunc, TransformType, UpdateTransformFunc } from './useImageTransform.ts';
export default function useMouseEvent(imgRef: Ref<HTMLImageElement>, movable: Ref<boolean>, open: Ref<boolean>, scaleStep: Ref<number>, transform: Ref<TransformType>, updateTransform: UpdateTransformFunc, dispatchZoomChange: DispatchZoomChangeFunc): {
    isMoving: import('vue').ShallowRef<boolean, boolean>;
    onMouseDown: (event: MouseEvent) => void;
    onMouseMove: (event: MouseEvent) => void;
    onMouseUp: () => void;
    onWheel: (event: WheelEvent) => void;
};
