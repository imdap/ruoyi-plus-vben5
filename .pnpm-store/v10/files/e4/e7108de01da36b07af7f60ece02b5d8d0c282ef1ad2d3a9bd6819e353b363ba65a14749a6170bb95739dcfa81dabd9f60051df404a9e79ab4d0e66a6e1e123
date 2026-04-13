import { defineComponent, h } from 'vue';
import { useWidgetPropDataSource } from './use';
import { getCurrComponent } from '../util/comp';
import XEUtils from 'xe-utils';
export function createWidgetASelect(VxeUI) {
    const getWidgetASelectConfig = (params) => {
        return {
            title: '下拉框',
            icon: 'vxe-icon-select',
            options: {
                placeholder: '请选择',
                options: XEUtils.range(0, 3).map((v, i) => {
                    return {
                        value: VxeUI.getI18n('vxe.formDesign.widgetProp.dataSource.defValue', [i + 1])
                    };
                })
            }
        };
    };
    const WidgetASelectFormComponent = defineComponent({
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
            const { renderDataSourceFormItem } = useWidgetPropDataSource(VxeUI, props, false);
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
                            }),
                            renderDataSourceFormItem()
                        ];
                    }
                });
            };
        }
    });
    const WidgetASelectViewComponent = defineComponent({
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
                        return h(getCurrComponent('a-select'), {
                            value: $formView ? $formView.getItemValue(widget) : null,
                            options: options.options,
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
        getWidgetASelectConfig,
        WidgetASelectFormComponent,
        WidgetASelectViewComponent
    };
}
