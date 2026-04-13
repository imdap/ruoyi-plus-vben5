import { ref, h, computed, reactive } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getConfig, createEvent, useSize, renderEmptyElement } from '../../ui';
export default defineVxeComponent({
    name: 'VxeBadge',
    props: {
        count: [String, Number],
        dot: Boolean,
        content: [String, Number],
        size: {
            type: String,
            default: () => getConfig().badge.size || getConfig().size
        }
    },
    emits: [],
    setup(props, context) {
        const { emit, slots } = context;
        const xID = XEUtils.uniqueId();
        const refElem = ref();
        const { computeSize } = useSize(props);
        const reactData = reactive({});
        const refMaps = {
            refElem
        };
        const computeCountNum = computed(() => {
            const { count } = props;
            return count ? XEUtils.toNumber(count) : 0;
        });
        const computeMaps = {};
        const $xeBadge = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $badge: $xeBadge }, params));
        };
        const collapsePaneMethods = {
            dispatchEvent
        };
        const collapsePanePrivateMethods = {};
        Object.assign($xeBadge, collapsePaneMethods, collapsePanePrivateMethods);
        const renderVN = () => {
            const { dot, content } = props;
            const vSize = computeSize.value;
            const countNum = computeCountNum.value;
            const defaultSlot = slots.default;
            return h('div', {
                ref: refElem,
                class: ['vxe-badge', {
                        [`size--${vSize}`]: vSize,
                        'is--dot': dot
                    }]
            }, [
                defaultSlot || content
                    ? h('div', {
                        class: 'vxe-badge--content'
                    }, defaultSlot ? defaultSlot({}) : `${content || ''}`)
                    : [],
                countNum
                    ? h('span', {
                        class: 'vxe-badge--count'
                    }, countNum > 99 ? '99+' : `${countNum}`)
                    : renderEmptyElement($xeBadge)
            ]);
        };
        $xeBadge.renderVN = renderVN;
        return $xeBadge;
    },
    render() {
        return this.renderVN();
    }
});
