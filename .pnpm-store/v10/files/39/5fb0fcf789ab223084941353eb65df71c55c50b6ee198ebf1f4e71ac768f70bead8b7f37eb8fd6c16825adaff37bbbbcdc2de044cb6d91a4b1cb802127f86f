import { ref, h, reactive } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getConfig, createEvent } from '../../ui';
export default defineVxeComponent({
    name: 'VxeTimeline',
    props: {
        size: {
            type: String,
            default: () => getConfig().timeline.size || getConfig().size
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
        const $xeTimeline = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $timeline: $xeTimeline }, params));
        };
        const tagMethods = {
            dispatchEvent
        };
        const tagPrivateMethods = {};
        Object.assign($xeTimeline, tagMethods, tagPrivateMethods);
        const renderVN = () => {
            return h('div', {
                ref: refElem,
                class: 'vxe-timeline'
            });
        };
        $xeTimeline.renderVN = renderVN;
        return $xeTimeline;
    },
    render() {
        return this.renderVN();
    }
});
