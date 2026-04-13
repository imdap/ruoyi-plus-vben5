import { defineComponent, h, PropType, ComponentOptions } from 'vue'
import { getCurrComponent } from '../util/comp'

import type { VxeUIExport, VxeGlobalRendererHandles } from 'vxe-pc-ui'

interface WidgetAInputFormObjVO {
  placeholder: string
}

export function createWidgetAInput (VxeUI: VxeUIExport) {
  const getWidgetAInputConfig = (params: VxeGlobalRendererHandles.CreateFormDesignWidgetConfigParams): VxeGlobalRendererHandles.CreateFormDesignWidgetConfigObj<WidgetAInputFormObjVO> => {
    return {
      title: '输入框',
      icon: 'vxe-icon-input',
      options: {
        placeholder: ''
      }
    }
  }

  const WidgetAInputFormComponent = defineComponent({
    props: {
      renderOpts: {
        type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewOptions>,
        default: () => ({})
      },
      renderParams: {
        type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewParams<WidgetAInputFormObjVO>>,
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
        const { options } = widget

        return h(VxeUIFormComponent, {
          class: 'vxe-form-design--widget-render-form-wrapper',
          vertical: true,
          span: 24,
          titleBold: true,
          titleOverflow: true,
          data: options
        }, {
          default () {
            return [
              h(VxeUIFormItemComponent, {
                title: VxeUI.getI18n('vxe.formDesign.widgetProp.name')
              }, {
                default () {
                  return h(VxeUIInputComponent, {
                    modelValue: widget.title,
                    placeholder: options.placeholder,
                    'onUpdate:modelValue' (val: any) {
                      widget.title = val
                    }
                  })
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

  const WidgetAInputViewComponent = defineComponent({
    props: {
      renderOpts: {
        type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetViewOptions>,
        default: () => ({})
      },
      renderParams: {
        type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetViewParams<WidgetAInputFormObjVO>>,
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

        return h(VxeUIFormItemComponent, {
          class: ['vxe-form-design--widget-render-form-item'],
          field: widget.field,
          title: widget.title
        }, {
          default () {
            return h(getCurrComponent('a-input') as ComponentOptions, {
              value: $formView ? $formView.getItemValue(widget) : null,
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
    getWidgetAInputConfig,
    WidgetAInputFormComponent,
    WidgetAInputViewComponent
  }
}
