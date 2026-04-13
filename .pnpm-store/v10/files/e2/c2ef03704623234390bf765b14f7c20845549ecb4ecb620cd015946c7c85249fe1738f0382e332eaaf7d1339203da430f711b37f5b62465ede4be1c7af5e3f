import { h, onUnmounted, inject, ref, provide, onMounted, reactive } from 'vue';
import { defineVxeComponent } from '../../ui/src/comp';
import { createItem, watchItem, destroyItem, assembleItem } from './util';
import { renderer, renderEmptyElement } from '../../ui';
import { isEnableConf } from '../../ui/src/utils';
import { renderTitle, renderItemContent, renderItemErrorIcon, getItemClass, getItemContentClass } from './render';
import XEUtils from 'xe-utils';
export const formItemProps = {
    title: String,
    field: String,
    span: {
        type: [String, Number],
        default: null
    },
    align: {
        type: String,
        default: null
    },
    verticalAlign: {
        type: String,
        default: null
    },
    titleBackground: {
        type: Boolean,
        default: null
    },
    titleBold: {
        type: Boolean,
        default: null
    },
    titleAlign: {
        type: String,
        default: null
    },
    titleWidth: {
        type: [String, Number],
        default: null
    },
    titleColon: {
        type: Boolean,
        default: null
    },
    titleAsterisk: {
        type: Boolean,
        default: null
    },
    showTitle: {
        type: Boolean,
        default: true
    },
    vertical: {
        type: Boolean,
        default: null
    },
    padding: {
        type: Boolean,
        default: null
    },
    formatter: [String, Function],
    className: [String, Function],
    contentClassName: [String, Function],
    contentStyle: [Object, Function],
    titleClassName: [String, Function],
    titleStyle: [Object, Function],
    titleOverflow: {
        type: [Boolean, String],
        default: null
    },
    titlePrefix: Object,
    titleSuffix: Object,
    resetValue: { default: null },
    visibleMethod: Function,
    visible: {
        type: Boolean,
        default: null
    },
    showContent: {
        type: Boolean,
        default: null
    },
    folding: Boolean,
    collapseNode: Boolean,
    itemRender: Object,
    rules: Array,
    params: Object
};
export default defineVxeComponent({
    name: 'VxeFormItem',
    props: formItemProps,
    setup(props, { slots }) {
        const xID = XEUtils.uniqueId();
        const refElem = ref();
        const $xeForm = inject('$xeForm', {});
        const $xeFormGroup = inject('$xeFormGroup', null);
        const formItem = reactive(createItem($xeForm, props));
        formItem.slots = slots;
        const formItemInfo = { itemConfig: formItem };
        provide('xeFormItemInfo', formItemInfo);
        const renderItem = ($xeForm, item) => {
            const formProps = $xeForm.props;
            const $xeGrid = $xeForm.xeGrid;
            const { data, readonly, disabled } = formProps;
            const { visible, field, itemRender, contentStyle, showContent } = item;
            const compConf = isEnableConf(itemRender) ? renderer.get(itemRender.name) : null;
            const itemStyle = compConf ? (compConf.formItemStyle || compConf.itemStyle) : null;
            const itemContentStyle = compConf ? (compConf.formItemContentStyle || compConf.itemContentStyle) : null;
            const params = { data, disabled, readonly, field, property: field, item, $form: $xeForm, $grid: $xeGrid };
            if (visible === false) {
                return renderEmptyElement($xeFormItem);
            }
            return h('div', {
                ref: refElem,
                key: item.id,
                itemid: item.id,
                class: getItemClass($xeForm, item),
                style: XEUtils.isFunction(itemStyle) ? itemStyle(params) : itemStyle
            }, [
                renderTitle($xeForm, item),
                showContent === false
                    ? renderEmptyElement($xeFormItem)
                    : h('div', {
                        class: getItemContentClass($xeForm, item),
                        style: Object.assign({}, XEUtils.isFunction(itemContentStyle) ? itemContentStyle(params) : itemContentStyle, XEUtils.isFunction(contentStyle) ? contentStyle(params) : contentStyle)
                    }, [
                        renderItemContent($xeForm, item),
                        renderItemErrorIcon($xeForm, item)
                    ])
            ]);
        };
        const renderVN = () => {
            const customLayout = $xeForm ? $xeForm.props.customLayout : false;
            const item = formItem;
            return customLayout
                ? renderItem($xeForm, item)
                : h('div', {
                    ref: refElem
                });
        };
        const $xeFormItem = {
            xID,
            formItem,
            renderVN
        };
        watchItem(props, formItem);
        onMounted(() => {
            const elem = refElem.value;
            assembleItem($xeForm, elem, formItem, $xeFormGroup);
        });
        onUnmounted(() => {
            destroyItem($xeForm, formItem);
        });
        provide('$xeFormItem', $xeFormItem);
        provide('$xeFormGroup', null);
        return $xeFormItem;
    },
    render() {
        return this.renderVN();
    }
});
