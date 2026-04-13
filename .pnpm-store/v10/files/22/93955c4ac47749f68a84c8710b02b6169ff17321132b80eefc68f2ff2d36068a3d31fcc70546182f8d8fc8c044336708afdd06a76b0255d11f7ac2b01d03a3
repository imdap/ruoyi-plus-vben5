import { ref, h, reactive, provide, computed } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getConfig, createEvent, useSize } from '../../ui';
import { toCssUnit } from '../../ui/src/dom';
export default defineVxeComponent({
    name: 'VxeRow',
    props: {
        gutter: [Number, String, Array],
        wrap: {
            type: Boolean,
            default: () => getConfig().row.wrap
        },
        vertical: Boolean,
        size: {
            type: String,
            default: () => getConfig().row.size || getConfig().size
        }
    },
    emits: [
        'click'
    ],
    setup(props, context) {
        const { slots, emit } = context;
        const xID = XEUtils.uniqueId();
        useSize(props);
        const refElem = ref();
        const reactData = reactive({});
        const refMaps = {
            refElem
        };
        const computeRowStyle = computed(() => {
            const { gutter, vertical } = props;
            const style = {};
            if (gutter) {
                let [lrGutter, tbGutter] = XEUtils.isArray(gutter) ? gutter : [gutter];
                if (vertical) {
                    tbGutter = lrGutter;
                    lrGutter = '';
                }
                if (lrGutter) {
                    const offsetSize = XEUtils.isNumber(lrGutter) ? toCssUnit(-(lrGutter / 2)) : `calc(${toCssUnit(lrGutter)} / 2 * -1)`;
                    style.marginLeft = offsetSize;
                    style.marginRight = offsetSize;
                }
                if (tbGutter) {
                    const offsetSize = XEUtils.isNumber(tbGutter) ? toCssUnit(-(tbGutter / 2)) : `calc(${toCssUnit(tbGutter)} / 2 * -1)`;
                    style.marginTop = offsetSize;
                    style.marginBottom = offsetSize;
                }
            }
            return style;
        });
        const computeMaps = {};
        const $xeRow = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const clickEvent = (evnt) => {
            dispatchEvent('click', {}, evnt);
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $row: $xeRow }, params));
        };
        const rowMethods = {
            dispatchEvent
        };
        const rowPrivateMethods = {};
        Object.assign($xeRow, rowMethods, rowPrivateMethods);
        const renderVN = () => {
            const { vertical, wrap } = props;
            const rowStyle = computeRowStyle.value;
            const defaultSlot = slots.default;
            return h('div', {
                ref: refElem,
                class: ['vxe-row', {
                        'is--vertical': vertical,
                        'is--wrap': wrap
                    }],
                style: rowStyle,
                onClick: clickEvent
            }, defaultSlot ? defaultSlot({}) : []);
        };
        provide('$xeRow', $xeRow);
        $xeRow.renderVN = renderVN;
        return $xeRow;
    },
    render() {
        return this.renderVN();
    }
});
