import { ref, h, reactive, watch, inject, onMounted, onUnmounted } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import XEUtils from 'xe-utils';
import { createEvent } from '../../ui';
import { assembleTabItem, destroyTabItem } from './util';
export default defineVxeComponent({
    name: 'VxeTabPane',
    props: {
        title: [String, Number],
        name: [String, Number],
        icon: String,
        titleWidth: [String, Number],
        titleAlign: [String, Number],
        preload: Boolean,
        permissionCode: [String, Number]
    },
    emits: [],
    setup(props, context) {
        const { slots, emit } = context;
        const xID = XEUtils.uniqueId();
        const refElem = ref();
        const $xeTabs = inject('$xeTabs', null);
        const reactData = reactive({});
        const tabConfig = reactive({
            id: xID,
            title: props.title,
            name: props.name,
            icon: props.icon,
            titleWidth: props.titleWidth,
            titleAlign: props.titleAlign,
            preload: props.preload,
            permissionCode: props.permissionCode,
            slots: slots
        });
        const refMaps = {
            refElem
        };
        const computeMaps = {};
        const $xeTabPane = {
            xID,
            props,
            context,
            reactData,
            getRefMaps: () => refMaps,
            getComputeMaps: () => computeMaps
        };
        const dispatchEvent = (type, params, evnt) => {
            emit(type, createEvent(evnt, { $tabPane: $xeTabPane }, params));
        };
        const tabPaneMethods = {
            dispatchEvent
        };
        const tabPanePrivateMethods = {};
        Object.assign($xeTabPane, tabPaneMethods, tabPanePrivateMethods);
        watch(() => props.title, (val) => {
            tabConfig.title = val;
        });
        watch(() => props.name, (val) => {
            tabConfig.name = val;
        });
        watch(() => props.icon, (val) => {
            tabConfig.icon = val;
        });
        watch(() => props.permissionCode, (val) => {
            tabConfig.permissionCode = val;
        });
        onMounted(() => {
            const elem = refElem.value;
            if ($xeTabs && elem) {
                assembleTabItem($xeTabs, elem, tabConfig);
            }
        });
        onUnmounted(() => {
            if ($xeTabs) {
                destroyTabItem($xeTabs, tabConfig);
            }
        });
        const renderVN = () => {
            return h('div', {
                ref: refElem
            }, []);
        };
        $xeTabPane.renderVN = renderVN;
        return $xeTabPane;
    },
    render() {
        return this.renderVN();
    }
});
