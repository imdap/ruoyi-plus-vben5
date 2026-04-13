import { ref, h, reactive, computed, inject } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getConfig, createEvent, useSize } from '../../ui';
import { toCssUnit } from '../../ui/src/dom';
export default defineVxeComponent({
    name: 'VxeCol',
    props: {
        span: [Number, String],
        align: String,
        width: [Number, String],
        fill: Boolean,
        ellipsis: Boolean,
        size: {
            type: String,
            default: () => getConfig().col.size || getConfig().size
        }
    },
    emits: [],
    setup(props, context) {
        const { slots, emit } = context;
        const xID = XEUtils.uniqueId();
        useSize(props);
        const refElem = ref();
        const reactData = reactive({});
        const refMaps = {
            refElem
        };
        const $xeRow = inject('$xeRow', null);
        const computeRowGutter = computed(() => {
            if ($xeRow) {
                return $xeRow.props.gutter;
            }
            return null;
        });
        const computeRowVertical = computed(() => {
            if ($xeRow) {
                return $xeRow.props.vertical;
            }
            return null;
        });
        const computeColStyle = computed(() => {
            const { width } = props;
            const rowGutter = computeRowGutter.value;
            const rowVertical = computeRowVertical.value;
            const style = {};
            if (rowGutter) {
                let [lrGutter, tbGutter] = XEUtils.isArray(rowGutter) ? rowGutter : [rowGutter];
                if (rowVertical) {
                    tbGutter = lrGutter;
                    lrGutter = '';
                }
                if (lrGutter) {
                    const padding = XEUtils.isNumber(lrGutter) ? toCssUnit(lrGutter / 2) : `calc(${toCssUnit(lrGutter)} / 2)`;
                    style.paddingLeft = padding;
                    style.paddingRight = padding;
                }
                if (tbGutter) {
                    const padding = XEUtils.isNumber(tbGutter) ? toCssUnit(tbGutter / 2) : `calc(${toCssUnit(tbGutter)} / 2)`;
                    style.paddingTop = padding;
                    style.paddingBottom = padding;
                }
            }
            if (width) {
                style.width = toCssUnit(width);
            }
            return style;
        });
        const computeMaps = {};
        const $xeCol = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $col: $xeCol }, params));
        };
        const colMethods = {
            dispatchEvent
        };
        const colPrivateMethods = {};
        Object.assign($xeCol, colMethods, colPrivateMethods);
        const renderVN = () => {
            const { span, fill, align, width, ellipsis } = props;
            const colStyle = computeColStyle.value;
            const defaultSlot = slots.default;
            return h('div', {
                ref: refElem,
                class: ['vxe-col', span ? `span${span}` : '', align ? `align--${align}` : '', {
                        'is--span': !!span,
                        'is--width': !!width,
                        'is--fill': fill,
                        'is--ellipsis': ellipsis
                    }],
                style: colStyle
            }, [
                h('div', {
                    class: 'vxe-col--inner'
                }, defaultSlot ? defaultSlot({}) : [])
            ]);
        };
        $xeCol.renderVN = renderVN;
        return $xeCol;
    },
    render() {
        return this.renderVN();
    }
});
