import { ref, h, reactive } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getI18n, getIcon, createEvent } from '../../ui';
export default defineVxeComponent({
    name: 'VxeEmpty',
    props: {
        imageUrl: String,
        imageStyle: Object,
        icon: String,
        status: String,
        content: [String, Number]
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
        const $xeEmpty = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $empty: $xeEmpty }, params));
        };
        const collapsePaneMethods = {
            dispatchEvent
        };
        const collapsePanePrivateMethods = {};
        Object.assign($xeEmpty, collapsePaneMethods, collapsePanePrivateMethods);
        const renderVN = () => {
            const { imageUrl, imageStyle, icon, status, content } = props;
            return h('div', {
                ref: refElem,
                class: ['vxe-empty', {
                        [`theme--${status}`]: status
                    }]
            }, [
                h('div', {
                    class: 'vxe-empty--inner'
                }, [
                    imageUrl
                        ? h('div', {
                            class: 'vxe-empty--img-wrapper'
                        }, [
                            h('img', {
                                src: imageUrl,
                                style: imageStyle
                            })
                        ])
                        : h('div', {
                            class: 'vxe-empty--icon-wrapper'
                        }, [
                            h('i', {
                                class: icon || getIcon().EMPTY_DEFAULT
                            })
                        ]),
                    h('div', {
                        class: 'vxe-empty--content-wrapper'
                    }, `${content || getI18n('vxe.empty.defText')}`)
                ])
            ]);
        };
        $xeEmpty.renderVN = renderVN;
        return $xeEmpty;
    },
    render() {
        return this.renderVN();
    }
});
