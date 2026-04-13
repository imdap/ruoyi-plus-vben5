import { Ref } from 'vue';
import { SharedPickerProps } from '../interface';
export type FilledPanelClassNames = NonNullable<SharedPickerProps['classNames']>['popup'];
export type FilledPanelStyles = NonNullable<SharedPickerProps['styles']>['popup'];
export type FilledClassNames = NonNullable<SharedPickerProps['classNames']> & {
    popup: FilledPanelClassNames;
};
export type FilledStyles = NonNullable<SharedPickerProps['styles']> & {
    popup: FilledPanelStyles;
};
/**
 * Convert `classNames` & `styles` to a fully filled object
 */
export default function useSemantic(classNames?: Ref<SharedPickerProps['classNames']>, styles?: Ref<SharedPickerProps['styles']>): import('vue').ComputedRef<readonly [FilledClassNames, FilledStyles]>;
