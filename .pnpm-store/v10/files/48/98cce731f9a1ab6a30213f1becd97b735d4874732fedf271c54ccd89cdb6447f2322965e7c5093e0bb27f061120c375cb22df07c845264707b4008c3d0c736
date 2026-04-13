import { ref, h, reactive, resolveComponent } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { getConfig, usePermission, useSize, createEvent, renderEmptyElement } from '../../ui';
import { getSlotVNs } from '../../ui/src/vn';
export default defineVxeComponent({
    name: 'VxeLink',
    props: {
        href: String,
        target: String,
        status: String,
        title: [String, Number],
        disabled: Boolean,
        icon: String,
        routerLink: Object,
        underline: {
            type: Boolean,
            default: () => getConfig().link.underline
        },
        /**
         * 权限码
         */
        permissionCode: [String, Number],
        content: [String, Number],
        size: {
            type: String,
            default: () => getConfig().link.size || getConfig().size
        }
    },
    emits: [
        'click'
    ],
    setup(props, context) {
        const { slots, emit } = context;
        const xID = XEUtils.uniqueId();
        const { computeSize } = useSize(props);
        const { computePermissionInfo } = usePermission(props);
        const refElem = ref();
        const reactData = reactive({});
        const refMaps = {
            refElem
        };
        const computeMaps = {};
        const $xeLink = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $link: $xeLink }, params));
        };
        const linkMethods = {
            dispatchEvent
        };
        const linkPrivateMethods = {};
        const clickEvent = (evnt) => {
            const { disabled } = props;
            if (!disabled) {
                dispatchEvent('click', {}, evnt);
            }
        };
        Object.assign($xeLink, linkMethods, linkPrivateMethods);
        const renderContent = () => {
            const { icon, content } = props;
            const defaultSlot = slots.default;
            const iconSlot = slots.icon;
            const textContent = XEUtils.toValueString(content);
            return [
                iconSlot || icon
                    ? h('span', {
                        class: 'vxe-link--icon'
                    }, iconSlot
                        ? getSlotVNs(iconSlot({}))
                        : [
                            h('i', {
                                class: icon
                            })
                        ])
                    : renderEmptyElement($xeLink),
                defaultSlot || textContent
                    ? h('span', {
                        class: 'vxe-link--content'
                    }, defaultSlot ? defaultSlot({}) : textContent)
                    : renderEmptyElement($xeLink)
            ];
        };
        const renderVN = () => {
            const { status, target, href, title, underline, disabled, routerLink } = props;
            const permissionInfo = computePermissionInfo.value;
            const vSize = computeSize.value;
            if (!permissionInfo.visible) {
                return renderEmptyElement($xeLink);
            }
            if (routerLink && !disabled) {
                return h(resolveComponent('router-link'), {
                    class: ['vxe-link', {
                            [`size--${vSize}`]: vSize,
                            [`theme--${status}`]: status,
                            'is--disabled': disabled,
                            'is--underline': underline
                        }],
                    title,
                    target,
                    to: disabled ? null : routerLink,
                    onClick: clickEvent
                }, {
                    default() {
                        return renderContent();
                    }
                });
            }
            return h('a', {
                ref: refElem,
                class: ['vxe-link', {
                        [`size--${vSize}`]: vSize,
                        [`theme--${status}`]: status,
                        'is--disabled': disabled,
                        'is--underline': underline
                    }],
                href: disabled ? null : href,
                target,
                title,
                onClick: clickEvent
            }, renderContent());
        };
        $xeLink.renderVN = renderVN;
        return $xeLink;
    },
    render() {
        return this.renderVN();
    }
});
