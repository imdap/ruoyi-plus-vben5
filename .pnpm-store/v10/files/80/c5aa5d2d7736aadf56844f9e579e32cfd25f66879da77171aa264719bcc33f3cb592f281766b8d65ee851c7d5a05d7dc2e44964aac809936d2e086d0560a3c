import { Ref } from 'vue';
import { DispatchZoomChangeFunc, TransformType, UpdateTransformFunc } from './useImageTransform.ts';
export default function useTouchEvent(imgRef: Ref<HTMLImageElement>, movable: Ref<boolean>, open: Ref<boolean>, minScale: Ref<number>, transform: Ref<TransformType>, updateTransform: UpdateTransformFunc, dispatchZoomChange: DispatchZoomChangeFunc): {
    isTouching: import('vue').ShallowRef<boolean, boolean>;
    onTouchStart: (event: TouchEvent) => void;
    onTouchMove: (event: TouchEvent) => void;
    onTouchEnd: () => void;
};
