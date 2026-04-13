import { ref, h, reactive, inject, onMounted, onUnmounted, createCommentVNode } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { createEvent } from '../../ui';
import { assemblePageBreak, destroyPageBreak } from './util';
export default defineVxeComponent({
    name: 'VxePrintPageBreak',
    props: {},
    emits: [],
    setup(props, context) {
        const { slots, emit } = context;
        const xID = XEUtils.uniqueId();
        const $xePrint = inject('$xePrint', null);
        const refElem = ref();
        const reactData = reactive({});
        const refMaps = {
            refElem
        };
        const computeMaps = {};
        const pageBreakConfig = reactive({
            id: xID,
            slots
        });
        const $xePrintPageBreak = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $print: $xePrint }, params));
        };
        const printPageBreakMethods = {
            dispatchEvent
        };
        const printPageBreakPrivateMethods = {};
        Object.assign($xePrintPageBreak, printPageBreakMethods, printPageBreakPrivateMethods);
        if (!$xePrint) {
            $xePrintPageBreak.renderVN = () => {
                return createCommentVNode();
            };
            return $xePrintPageBreak;
        }
        const renderVN = () => {
            return h('div', {
                ref: refElem
            });
        };
        onMounted(() => {
            const elem = refElem.value;
            if ($xePrint && elem) {
                assemblePageBreak($xePrint, elem, pageBreakConfig);
            }
        });
        onUnmounted(() => {
            if ($xePrint) {
                destroyPageBreak($xePrint, pageBreakConfig);
            }
        });
        $xePrintPageBreak.renderVN = renderVN;
        return $xePrintPageBreak;
    },
    render() {
        return this.renderVN();
    }
});
