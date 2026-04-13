import { reactive, h, computed, watch } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import { getConfig, getIcon, getI18n, createEvent, useSize, renderEmptyElement } from '../../ui';
import { getSlotVNs } from '../../ui/src/vn';
import XEUtils from 'xe-utils';
export default defineVxeComponent({
    name: 'VxeLoading',
    props: {
        modelValue: Boolean,
        icon: {
            type: String,
            default: () => getConfig().loading.icon
        },
        showIcon: {
            type: Boolean,
            default: () => getConfig().loading.showIcon
        },
        text: {
            type: String,
            default: () => getConfig().loading.text
        },
        showText: {
            type: Boolean,
            default: () => getConfig().loading.showText
        },
        status: String,
        size: {
            type: String,
            default: () => getConfig().loading.size || getConfig().size
        }
    },
    setup(props, context) {
        const { slots, emit } = context;
        const xID = XEUtils.uniqueId();
        const { computeSize } = useSize(props);
        const reactData = reactive({
            initialized: false
        });
        const computeMaps = {
            computeSize
        };
        const $xeLoading = {
            xID,
            props,
            context,
            reactData,
            getComputeMaps: () => computeMaps
        };
        const computeLoadingIcon = computed(() => {
            return props.icon || getIcon().LOADING;
        });
        const computeLoadingText = computed(() => {
            const { text } = props;
            return XEUtils.isString(text) ? text : getI18n('vxe.loading.text');
        });
        const handleInit = () => {
            if (!reactData.initialized) {
                reactData.initialized = !!reactData.initialized;
            }
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $loading: $xeLoading }, params));
        };
        const loadingMethods = {
            dispatchEvent
        };
        const loadingPrivateMethods = {};
        Object.assign($xeLoading, loadingMethods, loadingPrivateMethods);
        const renderVN = () => {
            const { modelValue, showIcon, status } = props;
            const { initialized } = reactData;
            const vSize = computeSize.value;
            const defaultSlot = slots.default;
            const textSlot = slots.text;
            const iconSlot = slots.icon;
            const loadingIcon = computeLoadingIcon.value;
            const loadingText = computeLoadingText.value;
            if (!initialized && !modelValue) {
                return renderEmptyElement($xeLoading);
            }
            return h('div', {
                class: ['vxe-loading', {
                        [`size--${vSize}`]: vSize,
                        [`theme--${status}`]: status,
                        'is--visible': modelValue
                    }]
            }, defaultSlot
                ? [
                    h('div', {
                        class: 'vxe-loading--wrapper'
                    }, getSlotVNs(defaultSlot({})))
                ]
                : [
                    h('div', {
                        class: 'vxe-loading--chunk'
                    }, [
                        showIcon && (iconSlot || loadingIcon)
                            ? h('div', {
                                class: 'vxe-loading--icon'
                            }, iconSlot
                                ? getSlotVNs(iconSlot({}))
                                : [
                                    h('i', {
                                        class: loadingIcon
                                    })
                                ])
                            : h('div', {
                                class: 'vxe-loading--spinner'
                            }),
                        textSlot || loadingText
                            ? h('div', {
                                class: 'vxe-loading--text'
                            }, textSlot ? getSlotVNs(textSlot({})) : `${loadingText}`)
                            : null
                    ])
                ]);
        };
        watch(() => props.modelValue, () => {
            handleInit();
        });
        handleInit();
        $xeLoading.renderVN = renderVN;
        return $xeLoading;
    },
    render() {
        return this.renderVN();
    }
});
