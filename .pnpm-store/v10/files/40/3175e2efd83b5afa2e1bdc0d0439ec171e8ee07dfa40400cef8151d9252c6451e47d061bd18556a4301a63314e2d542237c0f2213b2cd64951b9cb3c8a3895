import { computed, inject, provide } from 'vue';
import { handleCheckInfo } from './permission';
export function useSize(props) {
    // 组件尺寸上下文
    const xeSizeInfo = inject('xeSizeInfo', null);
    const computeSize = computed(() => {
        return props.size || (xeSizeInfo ? xeSizeInfo.value : null);
    });
    provide('xeSizeInfo', computeSize);
    return { computeSize };
}
export function usePermission(props) {
    const computePermissionInfo = computed(() => {
        return handleCheckInfo(props.permissionCode, props.permissionMethod);
    });
    return {
        computePermissionInfo
    };
}
export const useFns = {
    useSize,
    usePermission
};
