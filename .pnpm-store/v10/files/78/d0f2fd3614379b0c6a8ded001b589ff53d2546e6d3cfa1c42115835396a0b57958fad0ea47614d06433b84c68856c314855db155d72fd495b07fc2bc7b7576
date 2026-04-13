import { ref, h, reactive } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getConfig, createEvent } from '../../ui';
export default defineVxeComponent({
    name: 'VxeTour',
    props: {
        size: {
            type: String,
            default: () => getConfig().tour.size || getConfig().size
        }
    },
    emits: [],
    setup(props, context) {
        const { emit } = context;
        const xID = XEUtils.uniqueId();
        const refElem = ref();
        const reactData = reactive({});
        const refMaps = {
            refElem
        };
        const computeMaps = {};
        const $xeTour = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $tour: $xeTour }, params));
        };
        const tagMethods = {
            dispatchEvent
        };
        const tagPrivateMethods = {};
        Object.assign($xeTour, tagMethods, tagPrivateMethods);
        const renderVN = () => {
            return h('div', {
                ref: refElem,
                class: 'vxe-tour'
            });
        };
        $xeTour.renderVN = renderVN;
        return $xeTour;
    },
    render() {
        return this.renderVN();
    }
});
