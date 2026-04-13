import { h } from 'vue';
import { getCurrComponent } from '../util/comp';
import XEUtils from 'xe-utils';
/**
 * 表单 - 渲染器
 */
export function defineFormRender(VxeUI) {
    function isEmptyValue(cellValue) {
        return cellValue === null || cellValue === undefined || cellValue === '';
    }
    function getOnName(type) {
        return 'on' + type.substring(0, 1).toLocaleUpperCase() + type.substring(1);
    }
    function getModelProp(renderOpts) {
        let prop = 'value';
        switch (renderOpts.name) {
            case 'ASwitch':
                prop = 'checked';
                break;
        }
        return prop;
    }
    function getModelEvent(renderOpts) {
        let type = 'update:value';
        switch (renderOpts.name) {
            case 'ASwitch':
                type = 'update:checked';
                break;
        }
        return type;
    }
    function getChangeEvent(renderOpts) {
        return 'change';
    }
    function getItemProps(renderOpts, params, value, defaultProps) {
        return XEUtils.assign({}, defaultProps, renderOpts.props, { [getModelProp(renderOpts)]: value });
    }
    function formatText(cellValue) {
        return '' + (isEmptyValue(cellValue) ? '' : cellValue);
    }
    function getOns(renderOpts, params, inputFunc, changeFunc) {
        const { events } = renderOpts;
        const modelEvent = getModelEvent(renderOpts);
        const changeEvent = getChangeEvent(renderOpts);
        const isSameEvent = changeEvent === modelEvent;
        const ons = {};
        XEUtils.objectEach(events, (func, key) => {
            ons[getOnName(key)] = function (...args) {
                func(params, ...args);
            };
        });
        if (inputFunc) {
            ons[getOnName(modelEvent)] = function (targetEvnt) {
                inputFunc(targetEvnt);
                if (events && events[modelEvent]) {
                    events[modelEvent](params, targetEvnt);
                }
                if (isSameEvent && changeFunc) {
                    changeFunc(targetEvnt);
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
    function getItemOns(renderOpts, params) {
        const { $form, data, field } = params;
        return getOns(renderOpts, params, (value) => {
            // 处理 model 值双向绑定
            XEUtils.set(data, field, value);
        }, () => {
            // 处理 change 事件相关逻辑
            $form.updateStatus(params);
            if (renderOpts.changeToSubmit) {
                $form.handleSubmitEvent(new Event('change'));
            }
        });
    }
    function cellText(cellValue) {
        return [formatText(cellValue)];
    }
    function createFormItemRender(defaultProps) {
        return function (renderOpts, params) {
            const { data, field } = params;
            const { name } = renderOpts;
            const { attrs } = renderOpts;
            const itemValue = XEUtils.get(data, field);
            return [
                h(getCurrComponent(name), Object.assign(Object.assign(Object.assign({}, attrs), getItemProps(renderOpts, params, itemValue, defaultProps)), getItemOns(renderOpts, params)))
            ];
        };
    }
    function defaultButtonItemRender(renderOpts, params) {
        const { attrs } = renderOpts;
        const props = getItemProps(renderOpts, params, null);
        return [
            h(getCurrComponent('a-button'), Object.assign(Object.assign(Object.assign({}, attrs), props), getItemOns(renderOpts, params)), {
                default: () => cellText(renderOpts.content || props.content)
            })
        ];
    }
    function defaultButtonsItemRender(renderOpts, params) {
        const { children } = renderOpts;
        if (children) {
            return children.map((childRenderOpts) => defaultButtonItemRender(childRenderOpts, params)[0]);
        }
        return [];
    }
    /**
     *
     * 已废弃
     * @deprecated
     */
    function createOldFormItemRadioAndCheckboxRender() {
        return function (renderOpts, params) {
            const { name, options = [], optionProps = {} } = renderOpts;
            const { data, field } = params;
            const { attrs } = renderOpts;
            const labelProp = optionProps.label || 'label';
            const valueProp = optionProps.value || 'value';
            const itemValue = XEUtils.get(data, field);
            return [
                h(getCurrComponent(`${name}Group`), Object.assign(Object.assign(Object.assign({}, attrs), getItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)), {
                    default: () => {
                        return options.map((option, oIndex) => {
                            return h(getCurrComponent(name), {
                                key: oIndex,
                                value: option[valueProp],
                                disabled: option.disabled
                            }, {
                                default: () => cellText(option[labelProp])
                            });
                        });
                    }
                })
            ];
        };
    }
    VxeUI.renderer.mixin({
        AAutoComplete: {
            renderFormItemContent: createFormItemRender()
        },
        AInput: {
            renderFormItemContent: createFormItemRender()
        },
        AInputNumber: {
            renderFormItemContent: createFormItemRender()
        },
        ASelect: {
            renderFormItemContent(renderOpts, params) {
                const { options = [], optionGroups } = renderOpts;
                const { data, field } = params;
                const { attrs } = renderOpts;
                const itemValue = XEUtils.get(data, field);
                const props = getItemProps(renderOpts, params, itemValue);
                const ons = getItemOns(renderOpts, params);
                if (optionGroups) {
                    return [
                        h(getCurrComponent('a-select'), Object.assign(Object.assign(Object.assign(Object.assign({}, attrs), props), { options: optionGroups }), ons))
                    ];
                }
                return [
                    h(getCurrComponent('a-select'), Object.assign(Object.assign(Object.assign(Object.assign({}, attrs), props), { options: props.options || options }), ons))
                ];
            }
        },
        ACascader: {
            renderFormItemContent: createFormItemRender()
        },
        ADatePicker: {
            renderFormItemContent: createFormItemRender()
        },
        AMonthPicker: {
            renderFormItemContent: createFormItemRender()
        },
        ARangePicker: {
            renderFormItemContent: createFormItemRender()
        },
        AWeekPicker: {
            renderFormItemContent: createFormItemRender()
        },
        ATimePicker: {
            renderFormItemContent: createFormItemRender()
        },
        ATreeSelect: {
            renderFormItemContent: createFormItemRender()
        },
        ARate: {
            renderFormItemContent: createFormItemRender()
        },
        ASwitch: {
            renderFormItemContent: createFormItemRender()
        },
        ARadioGroup: {
            renderFormItemContent(renderOpts, params) {
                const { options = [], optionProps = {} } = renderOpts;
                const { data, field } = params;
                const { attrs } = renderOpts;
                const labelProp = optionProps.label || 'label';
                const valueProp = optionProps.value || 'value';
                const itemValue = XEUtils.get(data, field);
                return [
                    h(getCurrComponent('a-radio-group'), Object.assign(Object.assign(Object.assign({}, attrs), getItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)), {
                        default: () => {
                            return options.map((option, oIndex) => {
                                return h(getCurrComponent('a-radio'), {
                                    key: oIndex,
                                    value: option[valueProp],
                                    disabled: option.disabled
                                }, {
                                    default: () => cellText(option[labelProp])
                                });
                            });
                        }
                    })
                ];
            }
        },
        ACheckboxGroup: {
            renderFormItemContent(renderOpts, params) {
                const { options = [], optionProps = {} } = renderOpts;
                const { data, field } = params;
                const { attrs } = renderOpts;
                const labelProp = optionProps.label || 'label';
                const valueProp = optionProps.value || 'value';
                const itemValue = XEUtils.get(data, field);
                return [
                    h(getCurrComponent('a-checkbox-group'), Object.assign(Object.assign(Object.assign({}, attrs), getItemProps(renderOpts, params, itemValue)), getItemOns(renderOpts, params)), {
                        default: () => {
                            return options.map((option, oIndex) => {
                                return h(getCurrComponent('a-checkbox'), {
                                    key: oIndex,
                                    value: option[valueProp],
                                    disabled: option.disabled
                                }, {
                                    default: () => cellText(option[labelProp])
                                });
                            });
                        }
                    })
                ];
            }
        },
        AButton: {
            renderFormItemContent: defaultButtonItemRender
        },
        // 已废弃
        ARadio: {
            renderFormItemContent: createOldFormItemRadioAndCheckboxRender()
        },
        ACheckbox: {
            renderFormItemContent: createOldFormItemRadioAndCheckboxRender()
        },
        AButtons: {
            renderFormItemContent: defaultButtonsItemRender
        }
    });
}
