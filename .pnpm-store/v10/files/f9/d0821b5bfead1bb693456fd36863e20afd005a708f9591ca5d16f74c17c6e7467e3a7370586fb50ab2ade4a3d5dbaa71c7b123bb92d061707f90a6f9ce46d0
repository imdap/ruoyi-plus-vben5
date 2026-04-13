import { defineComponent, h, PropType, ComponentOptions, computed } from 'vue'
import { useWidgetPropDataSource, WidgetDataSourceOptionObjVO } from './use'
import { getCurrComponent } from '../util/comp'
import XEUtils from 'xe-utils'

import type { VxeUIExport, VxeGlobalRendererHandles } from 'vxe-pc-ui'

interface WidgetARadioFormObjVO {
  options: WidgetDataSourceOptionObjVO[]
}

export function createWidgetARadio (VxeUI: VxeUIExport) {
  const getWidgetARadioConfig = (params: VxeGlobalRendererHandles.CreateFormDesignWidgetConfigParams): VxeGlobalRendererHandles.CreateFormDesignWidgetConfigObj<WidgetARadioFormObjVO> => {
    return {
      title: '单选框',
      icon: 'vxe-icon-radio-checked',
      options: {
        options: XEUtils.range(0, 3).map((v, i) => {
          return {
            value: VxeUI.getI18n('vxe.formDesign.widgetProp.dataSource.defValue', [i + 1])
          }
        })
      }
    }
  }

  const WidgetARadioFormComponent = defineComponent({
    props: {
      renderOpts: {
        type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewOptions>,
        default: () => ({})
      },
      renderParams: {
        type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewParams<WidgetARadioFormObjVO>>,
        default: () => ({})
      }
    },
    emits: [],
    setup (props) {
      const VxeUIFormComponent = VxeUI.getComponent('VxeForm')
      const VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem')
      const VxeUISwitchComponent = VxeUI.getComponent('VxeSwitch')
      const VxeUIInputComponent = VxeUI.getComponent('VxeInput')

      const { renderDataSourceFormItem } = useWidgetPropDataSource(VxeUI, props, false)

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
              }),
              renderDataSourceFormItem()
            ]
          }
        })
      }
    }
  })

  const WidgetARadioViewComponent = defineComponent({
    props: {
      renderOpts: {
        type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetViewOptions>,
        default: () => ({})
      },
      renderParams: {
        type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetViewParams<WidgetARadioFormObjVO>>,
        default: () => ({})
      }
    },
    emits: [],
    setup (props) {
      const VxeUIFormItemComponent = VxeUI.getComponent('VxeFormItem')

      const radioOptions = computed(() => {
        const { renderParams } = props
        const { widget } = renderParams
        const { options } = widget
        return options.options.map(item => {
          return {
            label: item.value,
            value: item.value
          }
        })
      })

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
            return h(getCurrComponent('a-radio-group') as ComponentOptions, {
              value: $formView ? $formView.getItemValue(widget) : null,
              options: radioOptions.value,
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
    getWidgetARadioConfig,
    WidgetARadioFormComponent,
    WidgetARadioViewComponent
  }
}
