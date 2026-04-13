import { ref, h, reactive } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getIcon, createEvent, renderEmptyElement } from '../../ui';
export default defineVxeComponent({
    name: 'VxeResult',
    props: {
        imageUrl: String,
        imageStyle: Object,
        icon: String,
        type: [String, Number],
        status: [String, Number],
        title: [String, Number],
        content: [String, Number]
    },
    emits: [],
    setup(props, context) {
        const { emit, slots } = context;
        const xID = XEUtils.uniqueId();
        const refElem = ref();
        const reactData = reactive({});
        const refMaps = {
            refElem
        };
        const computeMaps = {};
        const $xeResult = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $result: $xeResult }, params));
        };
        const collapsePaneMethods = {
            dispatchEvent
        };
        const collapsePanePrivateMethods = {};
        Object.assign($xeResult, collapsePaneMethods, collapsePanePrivateMethods);
        const renderVN = () => {
            const { imageUrl, imageStyle, icon, title, type, content } = props;
            const status = props.status || type;
            const slotExtra = slots.extra;
            return h('div', {
                ref: 'refElem',
                class: ['vxe-result', {
                        [`theme--${status}`]: status
                    }]
            }, [
                h('div', {
                    class: 'vxe-result--inner'
                }, [
                    imageUrl
                        ? h('div', {
                            class: 'vxe-result--img-wrapper'
                        }, [
                            h('img', {
                                src: imageUrl,
                                style: imageStyle
                            })
                        ])
                        : h('div', {
                            class: 'vxe-result--icon-wrapper'
                        }, [
                            h('i', {
                                class: [icon, type ? getIcon()[`RESULT_${type}`.toLocaleUpperCase()] : '']
                            })
                        ]),
                    h('div', {
                        class: 'vxe-result--title-wrapper'
                    }, `${title || ''}`),
                    h('div', {
                        class: 'vxe-result--content-wrapper'
                    }, `${content || ''}`),
                    slotExtra
                        ? h('div', {
                            class: 'vxe-result--extra-wrapper'
                        }, slotExtra({}))
                        : renderEmptyElement($xeResult)
                ])
            ]);
        };
        $xeResult.renderVN = renderVN;
        return $xeResult;
    },
    render() {
        return this.renderVN();
    }
});
