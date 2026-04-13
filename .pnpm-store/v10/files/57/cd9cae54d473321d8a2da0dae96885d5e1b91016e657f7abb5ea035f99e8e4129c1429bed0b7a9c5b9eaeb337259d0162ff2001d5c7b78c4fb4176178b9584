import { defineComponent, h, PropType, ComponentOptions } from 'vue'
import { getCurrComponent } from '../util/comp'

import type { VxeUIExport, VxeGlobalRendererHandles } from 'vxe-pc-ui'

interface WidgetAInputNumberFormObjVO {
  placeholder: string
}

export function createWidgetAInputNumber (VxeUI: VxeUIExport) {
  const getWidgetAInputNumberConfig = (params: VxeGlobalRendererHandles.CreateFormDesignWidgetConfigParams): VxeGlobalRendererHandles.CreateFormDesignWidgetConfigObj<WidgetAInputNumberFormObjVO> => {
    return {
      title: '数字',
      icon: 'vxe-icon-number',
      options: {
        placeholder: '请输入'
      }
    }
  }

  const WidgetAInputNumberFormComponent = defineComponent({
    props: {
      renderOpts: {
        type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewOptions>,
        default: () => ({})
      },
      renderParams: {
        type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewParams<WidgetAInputNumberFormObjVO>>,
        default: () => ({})
      }
    },
    emits: [],
    setup (props) {
      const VxeUIFormComponent = VxeUI.getComponent('VxeForm')
      const VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem')
      const VxeUISwitchComponent = VxeUI.getComponent('VxeSwitch')
      const VxeUIInputComponent = VxeUI.getComponent('VxeInput')

      return () => {
        const { renderParams } = props
        const { widget } = renderParams

        return h(VxeUIFormComponent, {
          class: 'vxe-form-design--widget-render-form-wrapper',
          vertical: true,
          span: 24,
          titleBold: true,
          titleOverflow: true,
          data: widget.options
        }, {
          default () {
            return [
              h(VxeUIFormItemComponent, {
                title: VxeUI.getI18n('vxe.formDesign.widgetProp.name')
              }, {
                default () {
                  return h(VxeUIInputComponent, {
                    modelValue: widget.title,
                    'onUpdate:modelValue' (val: any) {
                      widget.title = val
                    }
                  })
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
                default () {
                  return h(VxeUISwitchComponent, {
                    modelValue: widget.required,
                    'onUpdate:modelValue' (val: any) {
                      widget.required = val
                    }
                  })
                }
              })
            ]
          }
        })
      }
    }
  })

  const WidgetAInputNumberViewComponent = defineComponent({
    props: {
      renderOpts: {
        type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetViewOptions>,
        default: () => ({})
      },
      renderParams: {
        type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetViewParams<WidgetAInputNumberFormObjVO>>,
        default: () => ({})
      }
    },
    emits: [],
    setup (props) {
      const VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem')

      const changeEvent = () => {
        const { renderParams } = props
        const { widget, $formView } = renderParams
        if ($formView) {
          const itemValue = $formView ? $formView.getItemValue(widget) : null
          $formView.updateWidgetStatus(widget, itemValue)
        }
      }

      return () => {
        const { renderParams } = props
        const { widget, $formView } = renderParams
        const { options } = widget

        return h(VxeUIFormItemComponent, {
          class: ['vxe-form-design--widget-render-form-item'],
          field: widget.field,
          title: widget.title
        }, {
          default () {
            return h(getCurrComponent('a-input-number') as ComponentOptions, {
              value: $formView ? $formView.getItemValue(widget) : null,
              placeholder: options.placeholder,
              onChange: changeEvent,
              'onUpdate:value' (val: any) {
                if ($formView) {
                  $formView.setItemValue(widget, val)
                }
              }
            })
          }
        })
      }
    }
  })

  return {
    getWidgetAInputNumberConfig,
    WidgetAInputNumberFormComponent,
    WidgetAInputNumberViewComponent
  }
}
