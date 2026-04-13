import { ref, h, reactive, computed, onMounted, watch, onUnmounted } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getConfig, createEvent, globalEvents } from '../../ui';
import { toCssUnit } from '../../ui/src/dom';
import { getContentUrl } from './util';
export default defineVxeComponent({
    name: 'VxeWatermark',
    props: {
        width: String,
        height: String,
        imageUrl: String,
        rotate: {
            type: [Number, String],
            default: () => getConfig().watermark.rotate
        },
        gap: {
            type: [Array, Number, String],
            default: () => XEUtils.clone(getConfig().watermark.gap, true)
        },
        content: [String, Array],
        font: Object,
        offset: Object,
        zIndex: [String, Number]
    },
    emits: [],
    setup(props, context) {
        const { emit } = context;
        const xID = XEUtils.uniqueId();
        const refElem = ref();
        const reactData = reactive({
            markUrl: ''
        });
        const refMaps = {
            refElem
        };
        const computeFontOpts = computed(() => {
            return XEUtils.assign({}, XEUtils.clone(getConfig().watermark.font, true), props.font);
        });
        const computeWrapperStyle = computed(() => {
            const { width, height, zIndex } = props;
            const { markUrl } = reactData;
            const stys = {};
            if (width) {
                stys.width = toCssUnit(width);
            }
            if (height) {
                stys.height = toCssUnit(height);
            }
            if (markUrl) {
                stys.backgroundImage = `url(${markUrl})`;
            }
            if (zIndex) {
                stys.zIndex = zIndex;
            }
            return stys;
        });
        const computeMaps = {};
        const $xeWatermark = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $watermark: $xeWatermark }, params));
        };
        const collapsePaneMethods = {
            dispatchEvent
        };
        const updateMarkStyle = () => {
            const { content, gap, rotate, offset } = props;
            const el = refElem.value;
            const fontOpts = computeFontOpts.value;
            if (el) {
                if (content) {
                    getContentUrl(content, getComputedStyle(el).fontSize, {
                        font: fontOpts,
                        rotate,
                        gap,
                        offset
                    }).then(url => {
                        reactData.markUrl = url;
                    });
                }
            }
        };
        const collapsePanePrivateMethods = {};
        Object.assign($xeWatermark, collapsePaneMethods, collapsePanePrivateMethods);
        const renderVN = () => {
            const wrapperStyle = computeWrapperStyle.value;
            return h('div', {
                ref: refElem,
                class: 'vxe-watermark',
                style: wrapperStyle
            });
        };
        watch(() => props.imageUrl, () => {
            updateMarkStyle();
        });
        watch(() => props.content, () => {
            updateMarkStyle();
        });
        watch(() => props.gap, () => {
            updateMarkStyle();
        });
        watch(() => props.rotate, () => {
            updateMarkStyle();
        });
        watch(() => props.width, () => {
            updateMarkStyle();
        });
        watch(() => props.height, () => {
            updateMarkStyle();
        });
        watch(() => props.font, () => {
            updateMarkStyle();
        });
        onMounted(() => {
            updateMarkStyle();
            globalEvents.on($xeWatermark, 'resize', XEUtils.throttle(() => {
                updateMarkStyle();
            }, 300, { trailing: true, leading: true }));
        });
        onUnmounted(() => {
            globalEvents.off($xeWatermark, 'resize');
        });
        $xeWatermark.renderVN = renderVN;
        return $xeWatermark;
    },
    render() {
        return this.renderVN();
    }
});
