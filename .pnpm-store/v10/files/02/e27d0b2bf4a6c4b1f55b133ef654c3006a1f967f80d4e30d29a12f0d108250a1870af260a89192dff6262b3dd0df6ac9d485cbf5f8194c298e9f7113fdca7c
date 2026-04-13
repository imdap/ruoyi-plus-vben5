import { h } from 'vue'
import { createWidgetAInput } from './input-widget'
import { createWidgetATextarea } from './textarea-widget'
import { createWidgetAInputNumber } from './number-input-widget'
import { createWidgetADatePicker } from './date-picker-widget'
import { createWidgetASelect } from './select-widget'
import { createWidgetARadio } from './radio-widget'
import { createWidgetACheckbox } from './checkbox-widget'
import { createWidgetASwitch } from './switch-widget'

import type { VxeUIExport } from 'vxe-pc-ui'

/**
 * 表单设计器 - 渲染器
 */
export function defineFormDesignRender (VxeUI: VxeUIExport) {
  const { getWidgetAInputConfig, WidgetAInputViewComponent, WidgetAInputFormComponent } = createWidgetAInput(VxeUI)
  const { getWidgetATextareaConfig, WidgetATextareaViewComponent, WidgetATextareaFormComponent } = createWidgetATextarea(VxeUI)
  const { getWidgetAInputNumberConfig, WidgetAInputNumberViewComponent, WidgetAInputNumberFormComponent } = createWidgetAInputNumber(VxeUI)
  const { getWidgetADatePickerConfig, WidgetADatePickerViewComponent, WidgetADatePickerFormComponent } = createWidgetADatePicker(VxeUI)
  const { getWidgetASelectConfig, WidgetASelectViewComponent, WidgetASelectFormComponent } = createWidgetASelect(VxeUI)
  const { getWidgetARadioConfig, WidgetARadioViewComponent, WidgetARadioFormComponent } = createWidgetARadio(VxeUI)
  const { getWidgetACheckboxConfig, WidgetACheckboxViewComponent, WidgetACheckboxFormComponent } = createWidgetACheckbox(VxeUI)
  const { getWidgetASwitchConfig, WidgetASwitchViewComponent, WidgetASwitchFormComponent } = createWidgetASwitch(VxeUI)

  VxeUI.renderer.mixin({
    AInputWidget: {
      createFormDesignWidgetConfig: getWidgetAInputConfig,
      renderFormDesignWidgetView (renderOpts, renderParams) {
        return h(WidgetAInputViewComponent, { renderOpts, renderParams })
      },
      renderFormDesignWidgetFormView (renderOpts, renderParams) {
        return h(WidgetAInputFormComponent, { renderOpts, renderParams })
      }
    },
    ATextareaWidget: {
      createFormDesignWidgetConfig: getWidgetATextareaConfig,
      renderFormDesignWidgetView (renderOpts, renderParams) {
        return h(WidgetATextareaViewComponent, { renderOpts, renderParams })
      },
      renderFormDesignWidgetFormView (renderOpts, renderParams) {
        return h(WidgetATextareaFormComponent, { renderOpts, renderParams })
      }
    },
    ANumberInputWidget: {
      createFormDesignWidgetConfig: getWidgetAInputNumberConfig,
      renderFormDesignWidgetView (renderOpts, renderParams) {
        return h(WidgetAInputNumberViewComponent, { renderOpts, renderParams })
      },
      renderFormDesignWidgetFormView (renderOpts, renderParams) {
        return h(WidgetAInputNumberFormComponent, { renderOpts, renderParams })
      }
    },
    ADatePickerWidget: {
      createFormDesignWidgetConfig: getWidgetADatePickerConfig,
      renderFormDesignWidgetView (renderOpts, renderParams) {
        return h(WidgetADatePickerViewComponent, { renderOpts, renderParams })
      },
      renderFormDesignWidgetFormView (renderOpts, renderParams) {
        return h(WidgetADatePickerFormComponent, { renderOpts, renderParams })
      }
    },
    ASelectWidget: {
      createFormDesignWidgetConfig: getWidgetASelectConfig,
      renderFormDesignWidgetView (renderOpts, renderParams) {
        return h(WidgetASelectViewComponent, { renderOpts, renderParams })
      },
      renderFormDesignWidgetFormView (renderOpts, renderParams) {
        return h(WidgetASelectFormComponent, { renderOpts, renderParams })
      }
    },
    ARadioWidget: {
      createFormDesignWidgetConfig: getWidgetARadioConfig,
      renderFormDesignWidgetView (renderOpts, renderParams) {
        return h(WidgetARadioViewComponent, { renderOpts, renderParams })
      },
      renderFormDesignWidgetFormView (renderOpts, renderParams) {
        return h(WidgetARadioFormComponent, { renderOpts, renderParams })
      }
    },
    ACheckboxWidget: {
      createFormDesignWidgetConfig: getWidgetACheckboxConfig,
      createFormDesignWidgetFieldValue: () => [],
      renderFormDesignWidgetView (renderOpts: any, renderParams: any) {
        return h(WidgetACheckboxViewComponent, { renderOpts, renderParams })
      },
      renderFormDesignWidgetFormView (renderOpts: any, renderParams: any) {
        return h(WidgetACheckboxFormComponent, { renderOpts, renderParams })
      }
    },
    ASwitchWidget: {
      createFormDesignWidgetConfig: getWidgetASwitchConfig,
      renderFormDesignWidgetView (renderOpts, renderParams) {
        return h(WidgetASwitchViewComponent, { renderOpts, renderParams })
      },
      renderFormDesignWidgetFormView (renderOpts, renderParams) {
        return h(WidgetASwitchFormComponent, { renderOpts, renderParams })
      }
    }
  })
}
