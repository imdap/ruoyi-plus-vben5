import { ref, h, reactive, watch, computed, inject, onMounted } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getConfig, createEvent, renderEmptyElement, useSize } from '../../ui';
export default defineVxeComponent({
    name: 'VxeSlider',
    props: {
        modelValue: [String, Number, Array],
        vertical: Boolean,
        max: {
            type: [String, Number],
            default: () => getConfig().slider.max
        },
        min: {
            type: [String, Number],
            default: () => getConfig().slider.min
        },
        step: {
            type: [String, Number],
            default: () => getConfig().slider.step
        },
        size: {
            type: String,
            default: () => getConfig().slider.size || getConfig().size
        },
        range: {
            type: Boolean,
            default: () => getConfig().slider.range
        },
        readonly: {
            type: Boolean,
            default: null
        },
        disabled: {
            type: Boolean,
            default: null
        }
    },
    emits: [
        'update:modelValue',
        'change',
        'track-dragstart',
        'track-dragover',
        'track-dragend'
    ],
    setup(props, context) {
        const { emit } = context;
        const $xeForm = inject('$xeForm', null);
        const formItemInfo = inject('xeFormItemInfo', null);
        const xID = XEUtils.uniqueId();
        const { computeSize } = useSize(props);
        const refElem = ref();
        const refBarElem = ref();
        const refTrackElem = ref();
        const refStartBtnElem = ref();
        const refEndBtnElem = ref();
        const reactData = reactive({
            startValue: 0,
            endValue: 0
        });
        const refMaps = {
            refElem
        };
        const computeFormReadonly = computed(() => {
            const { readonly } = props;
            if (readonly === null) {
                if ($xeForm) {
                    return $xeForm.props.readonly;
                }
                return false;
            }
            return readonly;
        });
        const computeIsDisabled = computed(() => {
            const { disabled } = props;
            if (disabled === null) {
                if ($xeForm) {
                    return $xeForm.props.disabled;
                }
                return false;
            }
            return disabled;
        });
        const computeMaxNum = computed(() => {
            return XEUtils.toNumber(props.max || 0);
        });
        const computeMinNum = computed(() => {
            return XEUtils.toNumber(props.min || 0);
        });
        const computeMaps = {};
        const $xeSlider = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const emitModel = (value) => {
            emit('update:modelValue', value);
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $slider: $xeSlider }, params));
        };
        const collapsePaneMethods = {
            dispatchEvent
        };
        const getStartPercent = (startValue) => {
            const { range } = props;
            const maxNum = computeMaxNum.value;
            const minNum = computeMinNum.value;
            return range ? XEUtils.floor((startValue - minNum) / XEUtils.toNumber(maxNum - minNum) * 100) : 0;
        };
        const getEndPercent = (startValue, endValue) => {
            const { range } = props;
            const maxNum = computeMaxNum.value;
            const minNum = computeMinNum.value;
            return XEUtils.floor((endValue - (range ? startValue : 0) - minNum) / XEUtils.toNumber(maxNum - minNum) * 100);
        };
        const updateModel = () => {
            const { modelValue } = props;
            if (XEUtils.isArray(modelValue)) {
                const [sVal, eVal] = XEUtils.clone(modelValue, true).sort();
                reactData.startValue = XEUtils.floor(XEUtils.toNumber(sVal || 0));
                reactData.endValue = XEUtils.floor(XEUtils.toNumber(eVal || 0));
            }
            else {
                reactData.startValue = 0;
                reactData.endValue = XEUtils.floor(XEUtils.toNumber(modelValue || 0));
            }
        };
        const updateBarStyle = () => {
            const { startValue, endValue } = reactData;
            const trackElem = refTrackElem.value;
            const startBtnElem = refStartBtnElem.value;
            const endBtnElem = refEndBtnElem.value;
            let startPercent = 0;
            let endPercent = 0;
            if (startValue > endValue) {
                startPercent = getStartPercent(endValue);
                endPercent = getEndPercent(endValue, startValue);
            }
            else {
                startPercent = getStartPercent(startValue);
                endPercent = getEndPercent(startValue, endValue);
            }
            if (trackElem) {
                trackElem.style.left = `${startPercent}%`;
                trackElem.style.width = `${endPercent}%`;
            }
            if (startBtnElem) {
                startBtnElem.style.left = `${startPercent}%`;
            }
            if (endBtnElem) {
                endBtnElem.style.left = `${XEUtils.floor(startPercent + endPercent)}%`;
            }
        };
        const changeEvent = (evnt) => {
            const { range } = props;
            const { startValue, endValue } = reactData;
            const value = range ? [startValue, endValue].sort() : endValue;
            emitModel(value);
            dispatchEvent('change', { value }, evnt);
            // 自动更新校验状态
            if ($xeForm && formItemInfo) {
                $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
            }
        };
        const handleMousedownEvent = (evnt, isEnd) => {
            const formReadonly = computeFormReadonly.value;
            const isDisabled = computeIsDisabled.value;
            const maxNum = computeMaxNum.value;
            const minNum = computeMinNum.value;
            if (!(formReadonly || isDisabled)) {
                evnt.preventDefault();
                document.onmousemove = evnt => {
                    evnt.preventDefault();
                    const el = refElem.value;
                    const barElem = refBarElem.value;
                    if (el && barElem) {
                        const barRect = barElem.getBoundingClientRect();
                        const trackWidth = (evnt.clientX - barRect.left) / barRect.width;
                        if (isEnd) {
                            reactData.endValue = XEUtils.floor(Math.max(minNum, Math.min(maxNum, trackWidth * (maxNum - minNum) + minNum)));
                        }
                        else {
                            reactData.startValue = XEUtils.floor(Math.max(minNum, Math.min(maxNum, trackWidth * (maxNum - minNum))));
                        }
                        dispatchEvent('track-dragover', { startValue: reactData.startValue, endValue: reactData.endValue }, evnt);
                    }
                    updateBarStyle();
                };
                document.onmouseup = (evnt) => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    dispatchEvent('track-dragend', { startValue: reactData.startValue, endValue: reactData.endValue }, evnt);
                    changeEvent(evnt);
                    updateBarStyle();
                };
                dispatchEvent('track-dragstart', { startValue: reactData.startValue, endValue: reactData.endValue }, evnt);
            }
        };
        const handleStartMousedownEvent = (evnt) => {
            const endBtnElem = refEndBtnElem.value;
            const startBtnElem = evnt.currentTarget;
            handleMousedownEvent(evnt, endBtnElem ? endBtnElem.offsetLeft < startBtnElem.offsetLeft : false);
        };
        const handleEndMousedownEvent = (evnt) => {
            const startBtnElem = refStartBtnElem.value;
            const endBtnElem = evnt.currentTarget;
            handleMousedownEvent(evnt, startBtnElem ? endBtnElem.offsetLeft > startBtnElem.offsetLeft : true);
        };
        const collapsePanePrivateMethods = {};
        Object.assign($xeSlider, collapsePaneMethods, collapsePanePrivateMethods);
        const renderVN = () => {
            const { vertical, range } = props;
            const vSize = computeSize.value;
            const formReadonly = computeFormReadonly.value;
            const isDisabled = computeIsDisabled.value;
            return h('div', {
                ref: refElem,
                class: ['vxe-slider', {
                        [`size--${vSize}`]: vSize,
                        'is--vertical': vertical,
                        'is--readonly': formReadonly,
                        'is--disabled': isDisabled
                    }]
            }, [
                h('div', {
                    class: 'vxe-slider--inner'
                }, [
                    h('div', {
                        ref: refBarElem,
                        class: 'vxe-slider--bar-wrapper'
                    }),
                    h('div', {
                        ref: refTrackElem,
                        class: 'vxe-slider--bar-track'
                    }),
                    formReadonly || !range
                        ? renderEmptyElement($xeSlider)
                        : h('div', {
                            ref: refStartBtnElem,
                            class: 'vxe-slider--bar-btn vxe-slider--start-btn',
                            onMousedown: handleStartMousedownEvent
                        }),
                    formReadonly
                        ? renderEmptyElement($xeSlider)
                        : h('div', {
                            ref: refEndBtnElem,
                            class: 'vxe-slider--bar-btn vxe-slider--end-btn',
                            onMousedown: handleEndMousedownEvent
                        })
                ])
            ]);
        };
        watch(() => props.modelValue, () => {
            updateModel();
        });
        onMounted(() => {
            updateBarStyle();
        });
        updateModel();
        $xeSlider.renderVN = renderVN;
        return $xeSlider;
    },
    render() {
        return this.renderVN();
    }
});
