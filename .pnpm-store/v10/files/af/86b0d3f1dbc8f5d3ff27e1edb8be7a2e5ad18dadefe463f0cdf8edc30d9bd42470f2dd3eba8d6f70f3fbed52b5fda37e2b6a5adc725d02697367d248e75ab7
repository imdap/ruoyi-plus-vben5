import { ref, h, reactive } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import { createEvent } from '../../ui';
import XEUtils from 'xe-utils';
export default defineVxeComponent({
    name: 'VxeLayoutHeader',
    props: {
        fixed: Boolean
    },
    emits: [],
    setup(props, context) {
        const { slots, emit } = context;
        const xID = XEUtils.uniqueId();
        const refElem = ref();
        const reactData = reactive({});
        const refMaps = {
            refElem
        };
        const computeMaps = {};
        const $xeLayoutHeader = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $layoutHeader: $xeLayoutHeader }, params));
        };
        const layoutHeaderMethods = {
            dispatchEvent
        };
        const layoutHeaderPrivateMethods = {};
        Object.assign($xeLayoutHeader, layoutHeaderMethods, layoutHeaderPrivateMethods);
        const renderVN = () => {
            const { fixed } = props;
            const defaultSlot = slots.default;
            return h('header', {
                ref: refElem,
                class: ['vxe-layout-header', {
                        'is--fixed': fixed
                    }]
            }, defaultSlot ? defaultSlot({}) : []);
        };
        $xeLayoutHeader.renderVN = renderVN;
        return $xeLayoutHeader;
    },
    render() {
        return this.renderVN();
    }
});
