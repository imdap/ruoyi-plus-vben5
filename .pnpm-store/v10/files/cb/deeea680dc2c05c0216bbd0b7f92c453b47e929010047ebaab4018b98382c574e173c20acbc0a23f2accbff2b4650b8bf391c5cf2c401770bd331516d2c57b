import { ref, h, reactive, watch, provide, inject, onMounted, onUnmounted } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import { createEvent } from '../../ui';
import { assembleSplitterItem, destroySplitterItem } from './util';
import XEUtils from 'xe-utils';
export default defineVxeComponent({
    name: 'VxeSplitterPanel',
    props: {
        name: [Number, String],
        width: [Number, String],
        height: [Number, String],
        minWidth: {
            type: [Number, String],
            default: () => null
        },
        minHeight: {
            type: [Number, String],
            default: () => null
        },
        // 已废弃
        showAction: Boolean
    },
    emits: [],
    setup(props, context) {
        const { emit, slots } = context;
        const xID = XEUtils.uniqueId();
        const $xeSplitter = inject('$xeSplitter', null);
        const refElem = ref();
        const paneConfig = reactive({
            id: xID,
            name: props.name,
            width: props.width,
            height: props.height,
            minWidth: props.minWidth,
            minHeight: props.minHeight,
            showAction: props.showAction,
            isExpand: true,
            renderWidth: 0,
            resizeWidth: 0,
            foldWidth: 0,
            renderHeight: 0,
            resizeHeight: 0,
            foldHeight: 0,
            slots: slots
        });
        const reactData = reactive({});
        const internalData = {};
        const computeMaps = {};
        const refMaps = {
            refElem
        };
        const $xeSplitterItem = {
            xID,
            props,
            context,
            reactData,
            internalData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $splitterPanel: $xeSplitterItem }, params));
        };
        const splitterPanelMethods = {
            dispatchEvent
        };
        const splitterPanelPrivateMethods = {};
        Object.assign($xeSplitterItem, splitterPanelMethods, splitterPanelPrivateMethods);
        const renderVN = () => {
            return h('div', {
                ref: refElem
            });
        };
        watch(() => props.name, (val) => {
            paneConfig.name = val;
        });
        watch(() => props.width, (val) => {
            paneConfig.width = val;
        });
        watch(() => props.height, (val) => {
            paneConfig.height = val;
        });
        watch(() => props.minWidth, (val) => {
            paneConfig.minWidth = val;
        });
        watch(() => props.minHeight, (val) => {
            paneConfig.minHeight = val;
        });
        watch(() => props.showAction, (val) => {
            paneConfig.showAction = val;
        });
        onMounted(() => {
            const elem = refElem.value;
            if ($xeSplitter && elem) {
                assembleSplitterItem($xeSplitter, elem, paneConfig);
            }
        });
        onUnmounted(() => {
            if ($xeSplitter) {
                destroySplitterItem($xeSplitter, paneConfig);
            }
        });
        provide('$xeSplitterItem', $xeSplitterItem);
        $xeSplitterItem.renderVN = renderVN;
        return $xeSplitterItem;
    },
    render() {
        return this.renderVN();
    }
});
