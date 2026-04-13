import { ref, h, reactive, computed } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import { getSlotVNs } from '../../ui/src/vn';
import { getConfig, createEvent, useSize, renderEmptyElement } from '../../ui';
import { toCssUnit } from '../../ui/src/dom';
import VxeLoadingComponent from '../../loading/src/loading';
import XEUtils from 'xe-utils';
export default defineVxeComponent({
    name: 'VxeCard',
    props: {
        title: String,
        showTitleOverflow: {
            type: Boolean,
            default: () => getConfig().card.showTitleOverflow
        },
        width: [String, Number],
        height: [String, Number],
        border: {
            type: Boolean,
            default: () => getConfig().card.border
        },
        loading: Boolean,
        shadow: {
            type: Boolean,
            default: () => getConfig().card.shadow
        },
        padding: {
            type: Boolean,
            default: () => getConfig().card.padding
        },
        size: {
            type: String,
            default: () => getConfig().card.size || getConfig().size
        }
    },
    emits: [],
    setup(props, context) {
        const { slots, emit } = context;
        const xID = XEUtils.uniqueId();
        const refElem = ref();
        const { computeSize } = useSize(props);
        const reactData = reactive({});
        const refMaps = {
            refElem
        };
        const computeCardStyle = computed(() => {
            const { height, width } = props;
            const stys = {};
            if (width) {
                stys.width = toCssUnit(width);
            }
            if (height) {
                stys.height = toCssUnit(height);
            }
            return stys;
        });
        const computeMaps = {
            computeSize
        };
        const $xeCard = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $card: $xeCard }, params));
        };
        const cardMethods = {
            dispatchEvent
        };
        const cardPrivateMethods = {};
        Object.assign($xeCard, cardMethods, cardPrivateMethods);
        const renderVN = () => {
            const { title, border, shadow, padding, loading, showTitleOverflow } = props;
            const defaultSlot = slots.default;
            const headerSlot = slots.header;
            const titleSlot = slots.title;
            const extraSlot = slots.extra;
            const footerSlot = slots.footer;
            const leftSlot = slots.left;
            const rightSlot = slots.right;
            const vSize = computeSize.value;
            const cardStyle = computeCardStyle.value;
            return h('div', {
                ref: refElem,
                class: ['vxe-card', {
                        [`size--${vSize}`]: vSize,
                        'is--border': border,
                        'is--shadow': shadow,
                        'is--padding': padding
                    }],
                style: cardStyle
            }, [
                title || titleSlot || headerSlot
                    ? h('div', {
                        class: 'vxe-card--header'
                    }, headerSlot
                        ? getSlotVNs(headerSlot({}))
                        : [
                            h('div', {
                                class: ['vxe-card--header-title', {
                                        'is--ellipsis': showTitleOverflow
                                    }]
                            }, titleSlot ? getSlotVNs(titleSlot({})) : `${title || ''}`),
                            extraSlot
                                ? h('div', {
                                    class: 'vxe-card--header-extra'
                                }, getSlotVNs(extraSlot({})))
                                : renderEmptyElement($xeCard)
                        ])
                    : renderEmptyElement($xeCard),
                h('div', {
                    class: 'vxe-card--body'
                }, [
                    leftSlot
                        ? h('div', {
                            class: 'vxe-card--body-left'
                        }, getSlotVNs(leftSlot({})))
                        : renderEmptyElement($xeCard),
                    h('div', {
                        class: 'vxe-card--body-content'
                    }, defaultSlot ? getSlotVNs(defaultSlot({})) : []),
                    rightSlot
                        ? h('div', {
                            class: 'vxe-card--body-right'
                        }, getSlotVNs(rightSlot({})))
                        : renderEmptyElement($xeCard)
                ]),
                footerSlot
                    ? h('div', {
                        class: 'vxe-card--footer'
                    }, getSlotVNs(footerSlot({})))
                    : renderEmptyElement($xeCard),
                /**
                 * 加载中
                 */
                h(VxeLoadingComponent, {
                    class: 'vxe-card--loading',
                    modelValue: loading
                })
            ]);
        };
        $xeCard.renderVN = renderVN;
        return $xeCard;
    },
    render() {
        return this.renderVN();
    }
});
