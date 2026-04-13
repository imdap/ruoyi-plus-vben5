import { watch } from 'vue';
import { renderer } from '../../ui';
import XEUtils from 'xe-utils';
import { ItemInfo } from './itemInfo';
import { isEnableConf } from '../../ui/src/utils';
export function isFormItem(item) {
    return item instanceof ItemInfo;
}
export function createItem($xeForm, _vm) {
    return isFormItem(_vm) ? _vm : new ItemInfo($xeForm, _vm);
}
export function handleFieldOrItem($xeForm, fieldOrItem) {
    if (fieldOrItem) {
        return XEUtils.isString(fieldOrItem) ? $xeForm.getItemByField(fieldOrItem) : fieldOrItem;
    }
    return null;
}
export function isHiddenItem($xeForm, formItem) {
    const { reactData } = $xeForm;
    const { collapseAll } = reactData;
    const { folding, visible } = formItem;
    return visible === false || (folding && collapseAll);
}
export function isActiveItem($xeForm, formItem) {
    const $xeGrid = $xeForm.xeGrid;
    let { visibleMethod, itemRender, visible, field } = formItem;
    if (visible === false) {
        return visible;
    }
    const compConf = isEnableConf(itemRender) ? renderer.get(itemRender.name) : null;
    const fiVisibleMethod = compConf ? (compConf.formItemVisibleMethod || compConf.itemVisibleMethod) : null;
    if (!visibleMethod && fiVisibleMethod) {
        visibleMethod = fiVisibleMethod;
    }
    if (!visibleMethod) {
        return true;
    }
    const formProps = $xeForm.props;
    const { data } = formProps;
    return visibleMethod({ data, field, property: field, item: formItem, $form: $xeForm, $grid: $xeGrid });
}
export function watchItem(props, formItem) {
    Object.keys(props).forEach(name => {
        watch(() => props[name], (value) => {
            formItem.update(name, value);
        });
    });
}
export function assembleItem($xeForm, el, formItem, formGroup) {
    const { reactData } = $xeForm;
    const formProps = $xeForm.props;
    const { customLayout } = formProps;
    const { staticItems } = reactData;
    if (customLayout) {
        if (!staticItems.some(item => item.id === formItem.id)) {
            staticItems.push(formItem);
        }
    }
    else {
        if (el) {
            const parentElem = el.parentNode;
            const parentItem = formGroup ? formGroup.formItem : null;
            const parentItems = parentItem ? parentItem.children : staticItems;
            if (parentElem) {
                parentItems.splice(XEUtils.arrayIndexOf(parentElem.children, el), 0, formItem);
                reactData.staticItems = staticItems.slice(0);
            }
        }
    }
}
export function destroyItem($xeForm, formItem) {
    const { reactData } = $xeForm;
    const { staticItems } = reactData;
    const index = XEUtils.findIndexOf(staticItems, item => item.id === formItem.id);
    if (index > -1) {
        staticItems.splice(index, 1);
    }
    reactData.staticItems = staticItems.slice(0);
}
