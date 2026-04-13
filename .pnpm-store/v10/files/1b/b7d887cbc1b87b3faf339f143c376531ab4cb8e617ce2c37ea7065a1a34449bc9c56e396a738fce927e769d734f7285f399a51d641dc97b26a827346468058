import { defineComponent, h } from 'vue';
import { getCurrComponent } from '../util/comp';
export function createWidgetADatePicker(VxeUI) {
    const getWidgetADatePickerConfig = (params) => {
        return {
            title: '日期',
            icon: 'vxe-icon-input',
            options: {
                placeholder: ''
            }
        };
    };
    const WidgetADatePickerFormComponent = defineComponent({
        props: {
            renderOpts: {
                type: Object,
                default: () => ({})
            },
            renderParams: {
                type: Object,
                default: () => ({})
            }
        },
        emits: [],
        setup(props) {
            const VxeUIFormComponent = VxeUI.getComponent('VxeForm');
            const VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem');
            const VxeUISwitchComponent = VxeUI.getComponent('VxeSwitch');
            const VxeUIInputComponent = VxeUI.getComponent('VxeInput');
            return () => {
                const { renderParams } = props;
                const { widget } = renderParams;
                return h(VxeUIFormComponent, {
                    class: 'vxe-form-design--widget-render-form-wrapper',
                    vertical: true,
                    span: 24,
                    titleBold: true,
                    titleOverflow: true,
                    data: widget.options
                }, {
                    default() {
                        return [
                            h(VxeUIFormItemComponent, {
                                title: VxeUI.getI18n('vxe.formDesign.widgetProp.name')
                            }, {
                                default() {
                                    return h(VxeUIInputComponent, {
                                        modelValue: widget.title,
                                        'onUpdate:modelValue'(val) {
                                            widget.title = val;
                                        }
                                    });
                                }
                            }),
                            h(VxeUIFormItemComponent, {
                                title: VxeUI.getI18n('vxe.formDesign.widgetProp.placeholder'),
                                field: 'placeholder',
                                itemRender: { name: 'VxeInput' }
                            }),
                            h(VxeUIFormItemComponent, {
                                title: VxeUI.getI18n('vxe.formDesign.widgetProp.required')
                            }, {
                                default() {
                                    return h(VxeUISwitchComponent, {
                                        modelValue: widget.required,
                                        'onUpdate:modelValue'(val) {
                                            widget.required = val;
                                        }
                                    });
                                }
                            })
                        ];
                    }
                });
            };
        }
    });
    const WidgetADatePickerViewComponent = defineComponent({
        props: {
            renderOpts: {
                type: Object,
                default: () => ({})
            },
            renderParams: {
                type: Object,
                default: () => ({})
            }
        },
        emits: [],
        setup(props) {
            const VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem');
            const changeEvent = () => {
                const { renderParams } = props;
                const { widget, $formView } = renderParams;
                if ($formView) {
                    const itemValue = $formView ? $formView.getItemValue(widget) : null;
                    $formView.updateWidgetStatus(widget, itemValue);
                }
            };
            return () => {
                const { renderParams } = props;
                const { widget, $formView } = renderParams;
                const { options } = widget;
                return h(VxeUIFormItemComponent, {
                    class: ['vxe-form-design--widget-render-form-item'],
                    field: widget.field,
                    title: widget.title
                }, {
                    default() {
                        return h(getCurrComponent('a-date-picker'), {
                            value: $formView ? $formView.getItemValue(widget) : null,
                            placeholder: options.placeholder,
                            onChange: changeEvent,
                            'onUpdate:value'(val) {
                                if ($formView) {
                                    $formView.setItemValue(widget, val);
                                }
                            }
                        });
                    }
                });
            };
        }
    });
    return {
        getWidgetADatePickerConfig,
        WidgetADatePickerFormComponent,
        WidgetADatePickerViewComponent
    };
}
