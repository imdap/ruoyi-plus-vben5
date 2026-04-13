import { Ref } from 'vue';
import { Color } from '../color';
import { TransformOffset } from '../interface';
type EventType = MouseEvent | TouchEvent;
type EventHandle = (e: EventType) => void;
interface useColorDragProps {
    color: Color;
    containerRef: Ref<HTMLDivElement>;
    targetRef: Ref<{
        transformDomRef: HTMLDivElement;
    }>;
    direction?: 'x' | 'y';
    onDragChange?: (offset: TransformOffset) => void;
    onDragChangeComplete?: () => void;
    calculate?: () => TransformOffset;
    /** Disabled drag */
    disabledDrag?: boolean;
}
declare function useColorDrag(props: useColorDragProps): [Ref<TransformOffset>, EventHandle];
export default useColorDrag;
