import { h, resolveComponent } from 'vue';
import XEUtils from 'xe-utils';
import { renderer, getComponent } from '../../ui';
import { getOnName, getModelEvent, getChangeEvent } from '../../ui/src/vn';
import { errLog } from '../../ui/src/log';
const componentDefaultModelProp = 'modelValue';
/**
 * 已废弃
 * @deprecated
 */
function getOldComponentName(name) {
    return `vxe-${`${name || ''}`.replace('$', '')}`;
}
function getDefaultComponent(renderOpts) {
    const { name } = renderOpts;
    return getComponent(name) || resolveComponent(`${name}`);
}
/**
 * 已废弃
 * @deprecated
 */
function getOldComponent({ name }) {
    return resolveComponent(getOldComponentName(name));
}
function getNativeAttrs(renderOpts) {
    let { name, attrs } = renderOpts;
    if (name === 'input') {
        attrs = Object.assign({ type: 'text' }, attrs);
    }
    return attrs;
}
function getComponentFormItemProps(renderOpts, params, value, defaultProps) {
    return XEUtils.assign({}, defaultProps, renderOpts.props, { [componentDefaultModelProp]: value });
}
/**
 * 原生事件处理
 * @param renderOpts
 * @param params
 * @param modelFunc
 * @param changeFunc
 */
function getNativeElementOns(renderOpts, params, modelFunc, changeFunc) {
    const { events } = renderOpts;
    const modelEvent = getModelEvent(renderOpts);
    const changeEvent = getChangeEvent(renderOpts);
    const isSameEvent = changeEvent === modelEvent;
    const ons = {};
    if (events) {
        XEUtils.objectEach(events, (func, key) => {
            ons[getOnName(key)] = function (...args) {
                func(params, ...args);
            };
        });
    }
    if (modelFunc) {
        ons[getOnName(modelEvent)] = function (targetEvnt) {
            modelFunc(targetEvnt);
            if (isSameEvent && changeFunc) {
                changeFunc(targetEvnt);
            }
            if (events && events[modelEvent]) {
                events[modelEvent](params, targetEvnt);
            }
        };
    }
    if (!isSameEvent && changeFunc) {
        ons[getOnName(changeEvent)] = function (...args) {
            changeFunc(...args);
            if (events && events[changeEvent]) {
                events[changeEvent](params, ...args);
            }
        };
    }
    return ons;
}
/**
 * 组件事件处理
 * @param renderOpts
 * @param params
 * @param modelFunc
 * @param changeFunc
 */
function getComponentOns(renderOpts, params, eFns, eventOns) {
    const { events } = renderOpts;
    const { model: modelFunc, change: changeFunc } = eFns || {};
    const modelEvent = getModelEvent(renderOpts);
    const changeEvent = getChangeEvent(renderOpts);
    const ons = {};
    XEUtils.objectEach(events, (func, key) => {
        ons[getOnName(key)] = function (...args) {
            if (!XEUtils.isFunction(func)) {
                errLog('vxe.error.errFunc', [`[form] ${func}`]);
            }
            func(params, ...args);
        };
    });
    if (modelFunc) {
        ons[getOnName(modelEvent)] = function (targetEvnt) {
            modelFunc(targetEvnt);
            if (events && events[modelEvent]) {
                events[modelEvent](params, targetEvnt);
            }
        };
    }
    if (changeFunc) {
        ons[getOnName(changeEvent)] = function (...args) {
            changeFunc(...args);
            if (events && events[changeEvent]) {
                events[changeEvent](params, ...args);
            }
        };
    }
    return eventOns ? Object.assign(ons, eventOns) : ons;
}
function getItemOns(renderOpts, params) {
    const { $form, data, field } = params;
    return getComponentOns(renderOpts, params, {
        model(value) {
            // 处理 model 值双向绑定
            XEUtils.set(data, field, value);
        },
        change() {
            // 处理 change 事件相关逻辑
            $form.updateStatus(params);
            if (renderOpts.changeToSubmit) {
                $form.handleSubmitEvent(new Event('change'));
            }
        }
    });
}
function getNativeItemOns(renderOpts, params) {
    const { $form, data, field } = params;
    return getNativeElementOns(renderOpts, params, (evnt) => {
        // 处理 model 值双向绑定
        const itemValue = evnt.target.value;
        XEUtils.set(data, field, itemValue);
    }, () => {
        // 处理 change 事件相关逻辑
        $form.updateStatus(params);
    });
}
function renderNativeOptgroup(renderOpts, params, renderOptionsMethods) {
    const { optionGroups, optionGroupProps = {} } = renderOpts;
    const groupOptions = optionGroupProps.options || 'options';
    const groupLabel = optionGroupProps.label || 'label';
    if (optionGroups) {
        return optionGroups.map((group, gIndex) => {
            return h('optgroup', {
                key: gIndex,
                label: group[groupLabel]
            }, renderOptionsMethods(group[groupOptions], renderOpts, params));
        });
    }
    return [];
}
/**
 * 渲染表单-项
 * 用于渲染原生的标签
 */
function nativeItemRender(renderOpts, params) {
    const { data, field } = params;
    const { name } = renderOpts;
    const attrs = getNativeAttrs(renderOpts);
    const itemValue = XEUtils.get(data, field);
    return [
        h(`${name}`, Object.assign(Object.assign(Object.assign({ class: `vxe-default-${name}` }, attrs), { value: attrs && name === 'input' && (attrs.type === 'submit' || attrs.type === 'reset') ? null : itemValue }), getNativeItemOns(renderOpts, params)))
    ];
}
function defaultItemRender(renderOpts, params) {
    const { data, field } = params;
    const itemValue = XEUtils.get(data, field);
    return [
        h(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getComponentFormItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)))
    ];
}
/**
 * 已废弃
 * @deprecated
 */
function oldItemRender(renderOpts, params) {
    const { data, field } = params;
    const itemValue = XEUtils.get(data, field);
    return [
        h(getOldComponent(renderOpts), Object.assign(Object.assign({}, getComponentFormItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)))
    ];
}
/**
 * 已废弃
 * @deprecated
 */
function oldButtonItemRender(renderOpts, params) {
    return [
        h(resolveComponent('vxe-button'), Object.assign(Object.assign({}, getComponentFormItemProps(renderOpts, params, null)), getComponentOns(renderOpts, params)))
    ];
}
/**
 * 已废弃
 * @deprecated
 */
function oldButtonsItemRender(renderOpts, params) {
    const { children } = renderOpts;
    return children ? children.map((childRenderOpts) => oldButtonItemRender(childRenderOpts, params)[0]) : [];
}
/**
 * 渲染原生的 select 标签
 */
function renderNativeFormOptions(options, renderOpts, params) {
    const { data, field } = params;
    const { optionProps = {} } = renderOpts;
    const labelProp = optionProps.label || 'label';
    const valueProp = optionProps.value || 'value';
    const disabledProp = optionProps.disabled || 'disabled';
    const cellValue = XEUtils.get(data, field);
    if (options) {
        return options.map((item, oIndex) => {
            return h('option', {
                key: oIndex,
                value: item[valueProp],
                disabled: item[disabledProp],
                /* eslint-disable eqeqeq */
                selected: item[valueProp] == cellValue
            }, item[labelProp]);
        });
    }
    return [];
}
/**
 * 渲染表单-项
 */
function defaultFormItemRender(renderOpts, params) {
    const { data, field } = params;
    const itemValue = XEUtils.get(data, field);
    return [
        h(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getComponentFormItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)))
    ];
}
function formItemRadioAndCheckboxRender(renderOpts, params) {
    const { options, optionProps } = renderOpts;
    const { data, field } = params;
    const itemValue = XEUtils.get(data, field);
    return [
        h(getDefaultComponent(renderOpts), Object.assign(Object.assign({ options,
            optionProps }, getComponentFormItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)))
    ];
}
/**
 * 已废弃
 * @deprecated
 */
function oldFormItemRadioAndCheckboxRender(renderOpts, params) {
    const { name, options, optionProps = {} } = renderOpts;
    const { data, field } = params;
    const labelProp = optionProps.label || 'label';
    const valueProp = optionProps.value || 'value';
    const disabledProp = optionProps.disabled || 'disabled';
    const itemValue = XEUtils.get(data, field);
    const compName = getOldComponentName(name);
    // 如果是分组
    if (options) {
        return [
            h(resolveComponent(`${compName}-group`), Object.assign(Object.assign({}, getComponentFormItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)), {
                default: () => {
                    return options.map((item, index) => {
                        return h(resolveComponent(compName), {
                            key: index,
                            label: item[valueProp],
                            content: item[labelProp],
                            disabled: item[disabledProp]
                        });
                    });
                }
            })
        ];
    }
    return [
        h(resolveComponent(compName), Object.assign(Object.assign({}, getComponentFormItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)))
    ];
}
/**
 * 表单 - 渲染器
 */
renderer.mixin({
    input: {
        formItemAutoFocus: 'input',
        renderFormItemContent: nativeItemRender
    },
    textarea: {
        formItemAutoFocus: 'textarea',
        renderFormItemContent: nativeItemRender
    },
    select: {
        formItemAutoFocus: 'input',
        renderFormItemContent(renderOpts, params) {
            return [
                h('select', Object.assign(Object.assign({ class: 'vxe-default-select' }, getNativeAttrs(renderOpts)), getNativeItemOns(renderOpts, params)), renderOpts.optionGroups ? renderNativeOptgroup(renderOpts, params, renderNativeFormOptions) : renderNativeFormOptions(renderOpts.options, renderOpts, params))
            ];
        }
    },
    VxeInput: {
        formItemAutoFocus: 'input',
        renderFormItemContent: defaultItemRender
    },
    VxeNumberInput: {
        formItemAutoFocus: 'input',
        renderFormItemContent: defaultItemRender
    },
    VxePasswordInput: {
        formItemAutoFocus: 'input',
        renderFormItemContent: defaultItemRender
    },
    VxeTextarea: {
        formItemAutoFocus: 'textarea',
        renderFormItemContent: defaultItemRender
    },
    VxeDatePicker: {
        formItemAutoFocus: 'input',
        renderFormItemContent: defaultItemRender
    },
    VxeDateRangePicker: {
        formItemAutoFocus: 'input',
        renderFormItemContent(renderOpts, params) {
            const { startField, endField } = renderOpts;
            const { $form, data, field } = params;
            const itemValue = XEUtils.get(data, field);
            const seProps = {};
            const seOs = {};
            if (startField && endField) {
                seProps.startValue = XEUtils.get(data, startField);
                seProps.endValue = XEUtils.get(data, endField);
                seOs['onUpdate:startValue'] = (value) => {
                    if (startField) {
                        XEUtils.set(data, startField, value);
                    }
                };
                seOs['onUpdate:endValue'] = (value) => {
                    if (endField) {
                        XEUtils.set(data, endField, value);
                    }
                };
            }
            return [
                h(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getComponentFormItemProps(renderOpts, params, itemValue, seProps)), getComponentOns(renderOpts, params, {
                    model(value) {
                        // 处理 model 值双向绑定
                        XEUtils.set(data, field, value);
                    },
                    change({ $event, isFinish }) {
                        // 处理 change 事件相关逻辑
                        $form.updateStatus(params);
                        if (renderOpts.changeToSubmit && isFinish) {
                            $form.handleSubmitEvent($event);
                        }
                    }
                }, seOs)))
            ];
        }
    },
    VxeButton: {
        renderFormItemContent: defaultFormItemRender
    },
    VxeButtonGroup: {
        renderFormItemContent(renderOpts, params) {
            const { options } = renderOpts;
            const { data, field } = params;
            const itemValue = XEUtils.get(data, field);
            return [
                h(getDefaultComponent(renderOpts), Object.assign(Object.assign({ options }, getComponentFormItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)))
            ];
        }
    },
    VxeSelect: {
        formItemAutoFocus: 'input',
        renderFormItemContent(renderOpts, params) {
            const { data, field } = params;
            const { options, optionProps, optionGroups, optionGroupProps } = renderOpts;
            const itemValue = XEUtils.get(data, field);
            return [
                h(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getComponentFormItemProps(renderOpts, params, itemValue, { options, optionProps, optionGroups, optionGroupProps })), getItemOns(renderOpts, params)))
            ];
        }
    },
    VxeTreeSelect: {
        formItemAutoFocus: 'input',
        renderFormItemContent(renderOpts, params) {
            const { data, field } = params;
            const { options, optionProps } = renderOpts;
            const itemValue = XEUtils.get(data, field);
            return [
                h(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getComponentFormItemProps(renderOpts, params, itemValue, { options, optionProps })), getItemOns(renderOpts, params)))
            ];
        }
    },
    VxeTableSelect: {
        formItemAutoFocus: 'input',
        renderFormItemContent(renderOpts, params) {
            const { data, field } = params;
            const { options, optionProps } = renderOpts;
            const itemValue = XEUtils.get(data, field);
            return [
                h(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getComponentFormItemProps(renderOpts, params, itemValue, { options, optionProps })), getItemOns(renderOpts, params)))
            ];
        }
    },
    VxeColorPicker: {
        formItemAutoFocus: 'input',
        renderFormItemContent(renderOpts, params) {
            const { data, field } = params;
            const { options } = renderOpts;
            const itemValue = XEUtils.get(data, field);
            return [
                h(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getComponentFormItemProps(renderOpts, params, itemValue, { colors: options })), getItemOns(renderOpts, params)))
            ];
        }
    },
    VxeIconPicker: {
        formItemAutoFocus: 'input',
        renderFormItemContent(renderOpts, params) {
            const { data, field } = params;
            const { options } = renderOpts;
            const itemValue = XEUtils.get(data, field);
            return [
                h(getDefaultComponent(renderOpts), Object.assign(Object.assign({}, getComponentFormItemProps(renderOpts, params, itemValue, { icons: options })), getItemOns(renderOpts, params)))
            ];
        }
    },
    VxeRadio: {
        renderFormItemContent: defaultFormItemRender
    },
    VxeRadioGroup: {
        renderFormItemContent: formItemRadioAndCheckboxRender
    },
    VxeCheckbox: {
        renderFormItemContent: defaultFormItemRender
    },
    VxeCheckboxGroup: {
        renderFormItemContent: formItemRadioAndCheckboxRender
    },
    VxeSwitch: {
        renderFormItemContent: defaultItemRender
    },
    VxeRate: {
        renderFormItemContent: defaultItemRender
    },
    VxeSlider: {
        renderFormItemContent: defaultItemRender
    },
    VxeImage: {
        renderFormItemContent(renderOpts, params) {
            const { data, field } = params;
            const { props } = renderOpts;
            const itemValue = XEUtils.get(data, field);
            return [
                h(getDefaultComponent(renderOpts), Object.assign(Object.assign(Object.assign({}, props), { src: itemValue }), getItemOns(renderOpts, params)))
            ];
        }
    },
    VxeImageGroup: {
        renderFormItemContent(renderOpts, params) {
            const { data, field } = params;
            const { props } = renderOpts;
            const itemValue = XEUtils.get(data, field);
            return [
                h(getDefaultComponent(renderOpts), Object.assign(Object.assign(Object.assign({}, props), { urlList: itemValue }), getItemOns(renderOpts, params)))
            ];
        }
    },
    VxeUpload: {
        renderFormItemContent: defaultItemRender
    },
    // 以下已废弃
    $input: {
        formItemAutoFocus: 'input',
        renderFormItemContent: oldItemRender
    },
    $textarea: {
        formItemAutoFocus: 'textarea',
        renderFormItemContent: oldItemRender
    },
    $button: {
        renderFormItemContent: oldButtonItemRender
    },
    $buttons: {
        renderFormItemContent: oldButtonsItemRender
    },
    $select: {
        formItemAutoFocus: 'input',
        renderFormItemContent(renderOpts, params) {
            const { data, field } = params;
            const { options, optionProps, optionGroups, optionGroupProps } = renderOpts;
            const itemValue = XEUtils.get(data, field);
            return [
                h(getOldComponent(renderOpts), Object.assign(Object.assign({}, getComponentFormItemProps(renderOpts, params, itemValue, { options, optionProps, optionGroups, optionGroupProps })), getItemOns(renderOpts, params)))
            ];
        }
    },
    $radio: {
        renderFormItemContent: oldFormItemRadioAndCheckboxRender
    },
    $checkbox: {
        renderFormItemContent: oldFormItemRadioAndCheckboxRender
    },
    $switch: {
        renderFormItemContent: oldItemRender
    }
    // 以上已废弃
});
