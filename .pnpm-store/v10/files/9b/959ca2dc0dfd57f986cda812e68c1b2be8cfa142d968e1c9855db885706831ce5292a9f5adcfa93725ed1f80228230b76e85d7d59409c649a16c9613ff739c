import { ref, h, reactive } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import { createEvent } from '../../ui';
import XEUtils from 'xe-utils';
export default defineVxeComponent({
    name: 'VxeLayoutFooter',
    props: {
        fixed: Boolean,
        align: String
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
        const $xeLayoutFooter = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $layoutFooter: $xeLayoutFooter }, params));
        };
        const layoutFooterMethods = {
            dispatchEvent
        };
        const layoutFooterPrivateMethods = {};
        Object.assign($xeLayoutFooter, layoutFooterMethods, layoutFooterPrivateMethods);
        const renderVN = () => {
            const { fixed, align } = props;
            const defaultSlot = slots.default;
            return h('footer', {
                ref: refElem,
                class: ['vxe-layout-footer', align ? `align--${align}` : '', {
                        'is--fixed': fixed
                    }]
            }, defaultSlot ? defaultSlot({}) : []);
        };
        $xeLayoutFooter.renderVN = renderVN;
        return $xeLayoutFooter;
    },
    render() {
        return this.renderVN();
    }
});
