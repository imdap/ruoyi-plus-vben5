import { ref, h, computed, reactive } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getConfig, createEvent, useSize, renderEmptyElement } from '../../ui';
import { toCssUnit } from '../../ui/src/dom';
export default defineVxeComponent({
    name: 'VxeAvatar',
    props: {
        count: [String, Number],
        dot: Boolean,
        content: [String, Number],
        icon: String,
        src: String,
        width: [String, Number],
        height: [String, Number],
        circle: {
            type: Boolean,
            default: () => getConfig().avatar.circle
        },
        status: {
            type: String,
            default: () => getConfig().avatar.status
        },
        size: {
            type: String,
            default: () => getConfig().avatar.size || getConfig().size
        }
    },
    emits: [],
    setup(props, context) {
        const { emit } = context;
        const xID = XEUtils.uniqueId();
        const { computeSize } = useSize(props);
        const refElem = ref();
        const reactData = reactive({});
        const refMaps = {
            refElem
        };
        const computeAvatarStyle = computed(() => {
            const { width, height } = props;
            const stys = {};
            if (width) {
                stys.width = toCssUnit(width);
            }
            if (height) {
                stys.height = toCssUnit(height);
            }
            return stys;
        });
        const computeCountNum = computed(() => {
            const { count } = props;
            return count ? XEUtils.toNumber(count) : 0;
        });
        const computeMaps = {};
        const $xeAvatar = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $avatar: $xeAvatar }, params));
        };
        const collapsePaneMethods = {
            dispatchEvent
        };
        const collapsePanePrivateMethods = {};
        Object.assign($xeAvatar, collapsePaneMethods, collapsePanePrivateMethods);
        const renderContent = () => {
            const { icon, content, src } = props;
            if (icon) {
                return h('span', {
                    class: 'vxe-avatar--icon'
                }, [
                    h('i', {
                        class: icon
                    })
                ]);
            }
            if (content) {
                return h('span', {
                    class: 'vxe-avatar--content'
                }, `${content}`);
            }
            if (src) {
                return h('img', {
                    class: 'vxe-avatar--img',
                    src
                });
            }
            return renderEmptyElement($xeAvatar);
        };
        const renderVN = () => {
            const { circle, dot, status } = props;
            const vSize = computeSize.value;
            const countNum = computeCountNum.value;
            const avatarStyle = computeAvatarStyle.value;
            return h('div', {
                ref: refElem,
                class: ['vxe-avatar', {
                        [`size--${vSize}`]: vSize,
                        [`theme--${status}`]: status,
                        'is--circle': circle,
                        'is--dot': dot
                    }],
                style: avatarStyle
            }, [
                renderContent(),
                countNum
                    ? h('span', {
                        class: 'vxe-avatar--count'
                    }, countNum > 99 ? '99+' : `${countNum}`)
                    : renderEmptyElement($xeAvatar)
            ]);
        };
        $xeAvatar.renderVN = renderVN;
        return $xeAvatar;
    },
    render() {
        return this.renderVN();
    }
});
