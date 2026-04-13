import { ref, h, reactive, watch, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getConfig, createEvent, useSize, renderEmptyElement } from '../../ui';
import { toCssUnit } from '../../ui/src/dom';
function createReactData() {
    return {
        groupName: XEUtils.uniqueId('xe_group_'),
        selectStyle: {
            display: '',
            left: '',
            width: ''
        }
    };
}
export default defineVxeComponent({
    name: 'VxeSegmented',
    props: {
        modelValue: [String, Number],
        name: [String, Number],
        disabled: Boolean,
        options: Array,
        type: {
            type: String,
            default: () => getConfig().segmented.type
        },
        status: String,
        width: [String, Number],
        height: [String, Number],
        optionConfig: Object,
        size: {
            type: String,
            default: () => getConfig().segmented.size || getConfig().size
        }
    },
    emits: [
        'update:modelValue',
        'change'
    ],
    setup(props, context) {
        const { slots, emit } = context;
        const xID = XEUtils.uniqueId();
        const { computeSize } = useSize(props);
        const refElem = ref();
        const refWrapperElem = ref();
        const refSelectedElem = ref();
        const reactData = reactive(createReactData());
        const refMaps = {
            refElem
        };
        const computeItemType = computed(() => {
            const { type } = props;
            if (type === 'round') {
                return type;
            }
            if (type === 'inside') {
                return type;
            }
            return 'default';
        });
        const computeWrapperStyle = computed(() => {
            const { width, height } = props;
            const stys = {};
            if (width) {
                stys.width = toCssUnit(width);
            }
            if (height) {
                stys.height = toCssUnit(height);
            }
            return stys;
        });
        const computeOptionOpts = computed(() => {
            return Object.assign({}, getConfig().segmented.optionConfig, props.optionConfig);
        });
        const computeItemList = computed(() => {
            return props.options || [];
        });
        const computeSelectIndex = computed(() => {
            const { modelValue } = props;
            const itemList = computeItemList.value;
            return XEUtils.findIndexOf(itemList, item => item.value === modelValue);
        });
        const comIsFullWidth = computed(() => {
            const wrapperStyle = computeWrapperStyle.value;
            return wrapperStyle.width === '100%';
        });
        const computeMaps = {};
        const $xeSegmented = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $segmented: $xeSegmented }, params));
        };
        const emitModel = (value) => {
            emit('update:modelValue', value);
        };
        const changeEvent = (evnt, item) => {
            const value = item.value;
            emitModel(value);
            dispatchEvent('change', { value }, evnt);
            updateStyle();
        };
        const updateStyle = () => {
            nextTick(() => {
                const selectIndex = computeSelectIndex.value;
                const wrapperElem = refWrapperElem.value;
                const atStyle = {
                    display: '',
                    left: '',
                    width: ''
                };
                if (wrapperElem) {
                    const itemEl = wrapperElem.children[selectIndex];
                    if (itemEl) {
                        atStyle.display = 'block';
                        atStyle.left = toCssUnit(itemEl.offsetLeft);
                        atStyle.width = toCssUnit(itemEl.clientWidth);
                    }
                }
                reactData.selectStyle = atStyle;
            });
        };
        const tagMethods = {
            dispatchEvent
        };
        const tagPrivateMethods = {};
        Object.assign($xeSegmented, tagMethods, tagPrivateMethods);
        const renderItems = () => {
            const { modelValue, name } = props;
            const { groupName } = reactData;
            const optionOpts = computeOptionOpts.value;
            const itemList = computeItemList.value;
            const isFullWidth = comIsFullWidth.value;
            const fullItemWidth = isFullWidth ? Math.max(0, 100 / itemList.length) : 0;
            const defaultSlot = slots.default;
            const itemVNs = [];
            itemList.forEach((item, i) => {
                const { icon, width } = item;
                const itemWidth = width || optionOpts.width;
                itemVNs.push(h('label', {
                    key: i,
                    class: ['vxe-segmented--item', {
                            'is--checked': modelValue === item.value
                        }],
                    style: isFullWidth || itemWidth
                        ? {
                            width: itemWidth ? toCssUnit(itemWidth) : (fullItemWidth ? `${fullItemWidth}%` : '')
                        }
                        : undefined
                }, [
                    h('input', {
                        class: 'vxe-segmented--input',
                        type: 'radio',
                        name: name || groupName,
                        onChange(evnt) {
                            changeEvent(evnt, item);
                        }
                    }),
                    h('div', {
                        class: 'vxe-segmented--content'
                    }, [
                        icon
                            ? h('div', {
                                class: 'vxe-segmented--icon'
                            }, [
                                h('i', {
                                    class: icon
                                })
                            ])
                            : renderEmptyElement($xeSegmented),
                        h('div', {
                            class: 'vxe-segmented--label'
                        }, defaultSlot ? defaultSlot({ option: item }) : XEUtils.eqNull(item.label) ? '' : `${item.label}`)
                    ])
                ]));
            });
            return itemVNs;
        };
        const renderVN = () => {
            const { status } = props;
            const { selectStyle } = reactData;
            const itemType = computeItemType.value;
            const wrapperStyle = computeWrapperStyle.value;
            const vSize = computeSize.value;
            return h('div', {
                ref: refElem,
                class: ['vxe-segmented', `type--${itemType}`, {
                        [`size--${vSize}`]: vSize,
                        [`theme--${status}`]: status
                    }]
            }, [
                h('div', {
                    class: 'vxe-segmented--group',
                    style: wrapperStyle
                }, [
                    h('div', {
                        ref: refSelectedElem,
                        class: 'vxe-segmented--selected',
                        style: selectStyle
                    }),
                    h('div', {
                        ref: refWrapperElem,
                        class: 'vxe-segmented--inner'
                    }, renderItems())
                ])
            ]);
        };
        watch(computeSelectIndex, () => {
            updateStyle();
        });
        onMounted(() => {
            updateStyle();
        });
        onBeforeUnmount(() => {
            XEUtils.assign(reactData, createReactData());
        });
        $xeSegmented.renderVN = renderVN;
        return $xeSegmented;
    },
    render() {
        return this.renderVN();
    }
});
