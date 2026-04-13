import { ref, h, reactive } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import { getConfig, useSize, createEvent } from '../../ui';
import XEUtils from 'xe-utils';
export default defineVxeComponent({
    name: 'VxeLayoutContainer',
    props: {
        vertical: Boolean,
        size: {
            type: String,
            default: () => getConfig().layoutContainer.size || getConfig().size
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
        const computeMaps = {
            computeSize
        };
        const $xeLayoutContainer = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $layoutContainer: $xeLayoutContainer }, params));
        };
        const layoutContainerMethods = {
            dispatchEvent
        };
        const layoutContainerPrivateMethods = {};
        Object.assign($xeLayoutContainer, layoutContainerMethods, layoutContainerPrivateMethods);
        const renderVN = () => {
            const { vertical } = props;
            const vSize = computeSize.value;
            const defaultSlot = slots.default;
            return h('div', {
                ref: refElem,
                class: ['vxe-layout-container', {
                        [`size--${vSize}`]: vSize,
                        'is--vertical': vertical
                    }]
            }, defaultSlot ? defaultSlot({}) : []);
        };
        $xeLayoutContainer.renderVN = renderVN;
        return $xeLayoutContainer;
    },
    render() {
        return this.renderVN();
    }
});
