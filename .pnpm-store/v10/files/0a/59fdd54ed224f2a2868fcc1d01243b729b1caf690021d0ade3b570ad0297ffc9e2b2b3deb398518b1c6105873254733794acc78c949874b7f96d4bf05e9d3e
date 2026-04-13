import { ref, h, reactive, computed, provide } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import { toCssUnit } from '../../ui/src/dom';
import { getConfig, useSize, createEvent } from '../../ui';
import VxeLoadingComponent from '../../loading/src/loading';
import XEUtils from 'xe-utils';
export default defineVxeComponent({
    name: 'VxeLayoutAside',
    props: {
        width: [String, Number],
        collapsed: Boolean,
        collapseWidth: [String, Number],
        loading: Boolean,
        padding: Boolean,
        size: {
            type: String,
            default: () => getConfig().layoutAside.size || getConfig().size
        }
    },
    emits: [],
    setup(props, context) {
        const { slots, emit } = context;
        const xID = XEUtils.uniqueId();
        const refElem = ref();
        const { computeSize } = useSize(props);
        const reactData = reactive({});
        const refMaps = {
            refElem
        };
        const computeWrapperWidth = computed(() => {
            const { width, collapsed, collapseWidth } = props;
            if (collapsed) {
                if (collapseWidth) {
                    return toCssUnit(collapseWidth);
                }
            }
            else {
                if (width) {
                    return toCssUnit(width);
                }
            }
            return '';
        });
        const computeMaps = {
            computeSize
        };
        const $xeLayoutAside = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $layoutAside: $xeLayoutAside }, params));
        };
        const layoutAsideMethods = {
            dispatchEvent
        };
        const layoutAsidePrivateMethods = {};
        Object.assign($xeLayoutAside, layoutAsideMethods, layoutAsidePrivateMethods);
        const renderVN = () => {
            const { width, collapsed, loading, padding } = props;
            const wrapperWidth = computeWrapperWidth.value;
            const vSize = computeSize.value;
            const defaultSlot = slots.default;
            return h('aside', {
                ref: refElem,
                class: ['vxe-layout-aside', {
                        [`size--${vSize}`]: vSize,
                        'is--padding': padding,
                        'is--default-width': !width,
                        'is--collapse': collapsed,
                        'is--loading': loading
                    }],
                style: wrapperWidth
                    ? {
                        width: wrapperWidth
                    }
                    : null
            }, [
                h('div', {
                    class: 'vxe-layout-aside--inner'
                }, defaultSlot ? defaultSlot({}) : []),
                /**
                 * 加载中
                 */
                h(VxeLoadingComponent, {
                    class: 'vxe-list-view--loading',
                    modelValue: loading
                })
            ]);
        };
        provide('$xeLayoutAside', $xeLayoutAside);
        $xeLayoutAside.renderVN = renderVN;
        return $xeLayoutAside;
    },
    render() {
        return this.renderVN();
    }
});
