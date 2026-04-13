import { ref, h, reactive } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { createEvent } from '../../ui';
export default defineVxeComponent({
    name: 'VxeSteps',
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
        const $xeSteps = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $steps: $xeSteps }, params));
        };
        const stepsMethods = {
            dispatchEvent
        };
        const stepsPrivateMethods = {};
        Object.assign($xeSteps, stepsMethods, stepsPrivateMethods);
        const renderVN = () => {
            return h('div', {
                ref: refElem,
                class: 'vxe-steps'
            }, []);
        };
        $xeSteps.renderVN = renderVN;
        return $xeSteps;
    },
    render() {
        return this.renderVN();
    }
});
