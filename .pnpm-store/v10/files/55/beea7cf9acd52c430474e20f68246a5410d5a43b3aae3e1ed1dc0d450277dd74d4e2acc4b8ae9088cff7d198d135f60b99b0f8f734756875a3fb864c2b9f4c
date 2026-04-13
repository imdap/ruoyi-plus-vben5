import { ref, h, reactive } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { createEvent } from '../../ui';
export default defineVxeComponent({
    name: 'VxeTimelineItem',
    props: {},
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
        const $xeTimelineItem = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $timelineItem: $xeTimelineItem }, params));
        };
        const tagMethods = {
            dispatchEvent
        };
        const tagPrivateMethods = {};
        Object.assign($xeTimelineItem, tagMethods, tagPrivateMethods);
        const renderVN = () => {
            return h('div', {
                ref: refElem,
                class: 'vxe-timeline-item'
            });
        };
        $xeTimelineItem.renderVN = renderVN;
        return $xeTimelineItem;
    },
    render() {
        return this.renderVN();
    }
});
