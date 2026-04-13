import { h, provide, computed, inject, reactive, onUnmounted, watch, onMounted, nextTick } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import { getConfig, createEvent, useSize } from '../../ui';
import XEUtils from 'xe-utils';
import VxeCheckboxComponent from './checkbox';
function createInternalData() {
    return {
    // isLoaded: false
    };
}
export default defineVxeComponent({
    name: 'VxeCheckboxGroup',
    props: {
        modelValue: Array,
        options: Array,
        optionProps: Object,
        disabled: {
            type: Boolean,
            default: null
        },
        max: {
            type: [String, Number],
            default: null
        },
        size: {
            type: String,
            default: () => getConfig().checkboxGroup.size || getConfig().size
        },
        defaultConfig: Object
    },
    emits: [
        'update:modelValue',
        'change',
        'default-change'
    ],
    setup(props, context) {
        const { slots, emit } = context;
        const $xeForm = inject('$xeForm', null);
        const formItemInfo = inject('xeFormItemInfo', null);
        const xID = XEUtils.uniqueId();
        const reactData = reactive({});
        const internalData = createInternalData();
        const computeIsDisabled = computed(() => {
            const { disabled } = props;
            if (disabled === null) {
                if ($xeForm) {
                    return $xeForm.props.readonly || $xeForm.props.disabled;
                }
                return false;
            }
            return disabled;
        });
        const computeIsMaximize = computed(() => {
            const { modelValue, max } = props;
            if (max) {
                return (modelValue ? modelValue.length : 0) >= XEUtils.toNumber(max);
            }
            return false;
        });
        const computeDefaultOpts = computed(() => {
            return Object.assign({}, props.defaultConfig);
        });
        const computePropsOpts = computed(() => {
            return Object.assign({}, props.optionProps);
        });
        const computeLabelField = computed(() => {
            const propsOpts = computePropsOpts.value;
            return propsOpts.label || 'label';
        });
        const computeValueField = computed(() => {
            const propsOpts = computePropsOpts.value;
            return propsOpts.value || 'value';
        });
        const computeDisabledField = computed(() => {
            const propsOpts = computePropsOpts.value;
            return propsOpts.disabled || 'disabled';
        });
        const computeMaps = {
            computeIsMaximize,
            computeIsDisabled
        };
        const $xeCheckboxGroup = {
            xID,
            props,
            context,
            reactData,
            getComputeMaps: () => computeMaps
        };
        useSize(props);
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $checkboxGroup: $xeCheckboxGroup }, params));
        };
        const emitModel = (value) => {
            emit('update:modelValue', value);
        };
        const emitDefaultValue = (value) => {
            emitModel(value);
            dispatchEvent('default-change', { value }, null);
        };
        const checkboxGroupMethods = {
            dispatchEvent
        };
        const checkboxGroupPrivateMethods = {
            handleChecked(params, evnt) {
                const { checked, label } = params;
                const checklist = props.modelValue || [];
                const checkIndex = checklist.indexOf(label);
                if (checked) {
                    if (checkIndex === -1) {
                        checklist.push(label);
                    }
                }
                else {
                    checklist.splice(checkIndex, 1);
                }
                emitModel(checklist);
                $xeCheckboxGroup.dispatchEvent('change', Object.assign({}, params, { checklist, value: checklist }), evnt);
                // 自动更新校验状态
                if ($xeForm && formItemInfo) {
                    $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, checklist);
                }
            }
        };
        const loadData = (datas) => {
            const { isLoaded } = internalData;
            const defaultOpts = computeDefaultOpts.value;
            const valueField = computeValueField.value;
            if (!isLoaded) {
                const { selectMode } = defaultOpts;
                if (datas.length > 0 && XEUtils.eqNull(props.modelValue)) {
                    if (selectMode === 'all') {
                        nextTick(() => {
                            emitDefaultValue(datas.map(item => item[valueField]));
                        });
                    }
                    else if (selectMode === 'first' || selectMode === 'last') {
                        const selectItem = XEUtils[selectMode](datas);
                        if (selectItem) {
                            nextTick(() => {
                                if (XEUtils.eqNull(props.modelValue)) {
                                    emitDefaultValue([selectItem[valueField]]);
                                }
                            });
                        }
                    }
                    internalData.isLoaded = true;
                }
            }
            return nextTick();
        };
        Object.assign($xeCheckboxGroup, checkboxGroupMethods, checkboxGroupPrivateMethods);
        const renderVN = () => {
            const { options } = props;
            const defaultSlot = slots.default;
            const valueField = computeValueField.value;
            const labelField = computeLabelField.value;
            const disabledField = computeDisabledField.value;
            return h('div', {
                class: 'vxe-checkbox-group'
            }, defaultSlot
                ? defaultSlot({})
                : (options
                    ? options.map(item => {
                        return h(VxeCheckboxComponent, {
                            key: item[valueField],
                            label: item[valueField],
                            content: item[labelField],
                            disabled: item[disabledField]
                        });
                    })
                    : []));
        };
        watch(() => props.options, (val) => {
            loadData(val || []);
        });
        onMounted(() => {
            nextTick(() => {
                const { options } = props;
                if (options) {
                    loadData(options);
                }
            });
        });
        onUnmounted(() => {
            XEUtils.assign(internalData, createInternalData());
        });
        provide('$xeCheckboxGroup', $xeCheckboxGroup);
        $xeCheckboxGroup.renderVN = renderVN;
        return renderVN;
    }
});
