import { ref, h, reactive, computed } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import { getConfig, useSize, createEvent, renderEmptyElement } from '../../ui';
import VxeLoadingComponent from '../../loading';
import VxeUIBacktopComponent from '../../backtop';
import XEUtils from 'xe-utils';
function createInternalData() {
    return {};
}
function createReactData() {
    return {};
}
export default defineVxeComponent({
    name: 'VxeLayoutBody',
    props: {
        loading: Boolean,
        padding: Boolean,
        showBacktop: {
            type: Boolean,
            default: () => getConfig().layoutBody.showBacktop
        },
        backtopConfig: Object,
        size: {
            type: String,
            default: () => getConfig().layoutBody.size || getConfig().size
        }
    },
    emits: [],
    setup(props, context) {
        const { slots, emit } = context;
        const xID = XEUtils.uniqueId();
        const backtopId = `vxe_layout_body_backtop_${xID}`;
        const refElem = ref();
        const { computeSize } = useSize(props);
        const internalData = createInternalData();
        const reactData = reactive(createReactData());
        const refMaps = {
            refElem
        };
        const computeBacktopOpts = computed(() => {
            return Object.assign({}, getConfig().layoutBody.backtopConfig, props.backtopConfig, {
                target: '#' + backtopId
            });
        });
        const computeMaps = {
            computeSize
        };
        const $xeLayoutBody = {
            xID,
            props,
            context,
            internalData,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $layoutBody: $xeLayoutBody }, params));
        };
        const layoutBodyMethods = {
            dispatchEvent
        };
        const layoutBodyPrivateMethods = {};
        Object.assign($xeLayoutBody, layoutBodyMethods, layoutBodyPrivateMethods);
        const renderVN = () => {
            const { loading, padding, showBacktop } = props;
            const backtopOpts = computeBacktopOpts.value;
            const vSize = computeSize.value;
            const defaultSlot = slots.default;
            const backtopSlot = slots.backtop;
            const backtopTopSlot = slots.backtopTop || slots['backtop-top'];
            const backtopBottomSlot = slots.backtopBottom || slots['backtop-bottom'];
            const backtopScopeSlots = {};
            if (backtopSlot) {
                backtopScopeSlots.default = backtopSlot;
            }
            if (backtopTopSlot) {
                backtopScopeSlots.top = backtopTopSlot;
            }
            if (backtopBottomSlot) {
                backtopScopeSlots.bottom = backtopBottomSlot;
            }
            return h('div', {
                ref: refElem,
                class: ['vxe-layout-body', {
                        [`size--${vSize}`]: vSize,
                        'is--loading': loading,
                        'is--padding': padding
                    }]
            }, [
                h('div', {
                    id: showBacktop ? backtopId : '',
                    class: 'vxe-layout-body--inner'
                }, defaultSlot ? defaultSlot({}) : []),
                /**
                 * 加载中
                 */
                h(VxeLoadingComponent, {
                    class: 'vxe-list-view--loading',
                    modelValue: loading
                }),
                /**
                 * 回到顶部
                 */
                showBacktop
                    ? h(VxeUIBacktopComponent, backtopOpts, backtopScopeSlots)
                    : renderEmptyElement($xeLayoutBody)
            ]);
        };
        $xeLayoutBody.renderVN = renderVN;
        return $xeLayoutBody;
    },
    render() {
        return this.renderVN();
    }
});
