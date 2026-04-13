import { defineComponent, h } from 'vue';
import { getCurrComponent } from '../util/comp';
export function createWidgetASwitch(VxeUI) {
    const getWidgetASwitchConfig = (params) => {
        return {
            title: '是/否',
            icon: 'vxe-icon-switch',
            options: {}
        };
    };
    const WidgetASwitchFormComponent = defineComponent({
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
                                itemRender: { name: 'ElInput' }
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
    const WidgetASwitchViewComponent = defineComponent({
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
                return h(VxeUIFormItemComponent, {
                    class: ['vxe-form-design--widget-render-form-item'],
                    field: widget.field,
                    title: widget.title
                }, {
                    default() {
                        return h(getCurrComponent('a-switch'), {
                            checked: $formView ? $formView.getItemValue(widget) : null,
                            onChange: changeEvent,
                            'onUpdate:checked'(val) {
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
        getWidgetASwitchConfig,
        WidgetASwitchFormComponent,
        WidgetASwitchViewComponent
    };
}
