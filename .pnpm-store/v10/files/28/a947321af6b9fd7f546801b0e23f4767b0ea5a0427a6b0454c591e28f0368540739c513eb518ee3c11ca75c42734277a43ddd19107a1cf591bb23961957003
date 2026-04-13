import { Ref } from 'vue';
type InternalActionType = 'hover' | 'focus' | 'click' | 'contextmenu' | 'touch';
type ExternalActionType = InternalActionType | Uppercase<InternalActionType> | 'contextMenu';
type ActionTypes = ExternalActionType | ExternalActionType[];
export default function useAction(action: Ref<ActionTypes>, showAction?: Ref<ActionTypes | undefined>, hideAction?: Ref<ActionTypes | undefined>): readonly [import('vue').ShallowRef<Set<InternalActionType>, Set<InternalActionType>>, import('vue').ShallowRef<Set<InternalActionType>, Set<InternalActionType>>];
export {};
