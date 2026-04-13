import { ref, h, reactive, inject, watch, onMounted, onUnmounted } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import { createEvent } from '../../ui';
import { assembleCarouselItem, destroyCarouselItem } from './util';
import XEUtils from 'xe-utils';
export default defineVxeComponent({
    name: 'VxeCarouselItem',
    props: {
        name: [String, Number],
        className: String,
        url: String
    },
    emits: [],
    setup(props, context) {
        const { slots, emit } = context;
        const $xeCarousel = inject('$xeCarousel', null);
        const xID = XEUtils.uniqueId();
        const refElem = ref();
        const reactData = reactive({});
        const itemConfig = reactive({
            id: xID,
            name: props.name,
            url: props.url,
            className: props.className,
            slots
        });
        const refMaps = {
            refElem
        };
        const computeMaps = {};
        const $xeCarouselItem = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $carouselItem: $xeCarouselItem }, params));
        };
        const carouselItemMethods = {
            dispatchEvent
        };
        const carouselItemPrivateMethods = {};
        Object.assign($xeCarouselItem, carouselItemMethods, carouselItemPrivateMethods);
        const renderVN = () => {
            return h('div', {
                ref: refElem
            });
        };
        watch(() => props.name, (val) => {
            itemConfig.name = val;
        });
        watch(() => props.url, (val) => {
            itemConfig.url = val;
        });
        onMounted(() => {
            const elem = refElem.value;
            if ($xeCarousel && elem) {
                assembleCarouselItem($xeCarousel, elem, itemConfig);
            }
        });
        onUnmounted(() => {
            if ($xeCarousel) {
                destroyCarouselItem($xeCarousel, itemConfig);
            }
        });
        $xeCarouselItem.renderVN = renderVN;
        return $xeCarouselItem;
    },
    render() {
        return this.renderVN();
    }
});
