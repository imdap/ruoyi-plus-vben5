import { ComputedRef, Ref } from 'vue';
import { GenerateConfig } from '../../generate';
import { PanelMode, RangeTimeProps, SharedPickerProps, SharedTimeProps } from '../../interface';
/**
 * Check if provided date is valid for the `disabledDate` & `showTime.disabledTime`.
 */
export default function useInvalidate<DateType extends object = any>(generateConfig: Ref<GenerateConfig<DateType>>, picker: Ref<PanelMode>, disabledDate: Ref<SharedPickerProps<DateType>['disabledDate'] | undefined>, showTime: Ref<SharedTimeProps<DateType> | RangeTimeProps | null> | ComputedRef<SharedTimeProps<DateType> | RangeTimeProps | null>): (date: DateType, info?: {
    from?: DateType;
    activeIndex: number;
}) => boolean;
