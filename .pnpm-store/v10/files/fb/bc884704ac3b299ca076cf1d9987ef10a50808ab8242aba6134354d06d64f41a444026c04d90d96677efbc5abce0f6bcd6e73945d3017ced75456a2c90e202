import { ref, h, reactive } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getConfig, createEvent } from '../../ui';
export default defineVxeComponent({
    name: 'VxeMention',
    props: {
        size: {
            type: String,
            default: () => getConfig().mention.size || getConfig().size
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
        const $xeMention = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $mention: $xeMention }, params));
        };
        const tagMethods = {
            dispatchEvent
        };
        const tagPrivateMethods = {};
        Object.assign($xeMention, tagMethods, tagPrivateMethods);
        const renderVN = () => {
            return h('div', {
                ref: refElem,
                class: 'vxe-mention'
            });
        };
        $xeMention.renderVN = renderVN;
        return $xeMention;
    },
    render() {
        return this.renderVN();
    }
});
