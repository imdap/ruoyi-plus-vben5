import { ref, h, reactive, provide } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import { getConfig, createEvent } from '../../ui';
import XEUtils from 'xe-utils';
import VxeBreadcrumbItemComponent from './breadcrumb-item';
export default defineVxeComponent({
    name: 'VxeBreadcrumb',
    props: {
        separator: {
            type: String,
            default: () => getConfig().breadcrumb.separator
        },
        options: Array
    },
    emits: [
        'click'
    ],
    setup(props, context) {
        const { emit, slots } = context;
        const xID = XEUtils.uniqueId();
        const refElem = ref();
        const reactData = reactive({});
        const refMaps = {
            refElem
        };
        const computeMaps = {};
        const $xeBreadcrumb = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const breadcrumbMethods = {
            dispatchEvent(type, params, evnt) {
                emit(type, createEvent(evnt, { $breadcrumb: $xeBreadcrumb }, params));
            }
        };
        const breadcrumbPrivateMethods = {
            handleClickLink(evnt, option) {
                breadcrumbMethods.dispatchEvent('click', { option }, evnt);
            }
        };
        Object.assign($xeBreadcrumb, breadcrumbMethods, breadcrumbPrivateMethods);
        const renderItems = () => {
            const { options } = props;
            if (options && options.length) {
                return options.map(item => {
                    return h(VxeBreadcrumbItemComponent, {
                        title: item.title,
                        routerLink: item.routerLink
                    });
                });
            }
            return [];
        };
        const renderVN = () => {
            const defaultSlot = slots.default;
            return h('div', {
                ref: refElem,
                class: 'vxe-breadcrumb'
            }, defaultSlot ? defaultSlot({}) : renderItems());
        };
        provide('$xeBreadcrumb', $xeBreadcrumb);
        $xeBreadcrumb.renderVN = renderVN;
        return $xeBreadcrumb;
    },
    render() {
        return this.renderVN();
    }
});
