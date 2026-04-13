import { ComputedRef, WritableComputedRef, VNode } from 'vue'
import { VxeGlobalRendererHandles } from '../ui'
import { VxeFormDesignDefines } from '../components/form-design'
import { VxeTableDefines } from '../components/table'

export interface FormDesignHandleExport {
  useFormView <F = VxeFormDesignDefines.DefaultSettingFormDataObjVO> (props: {
    renderOpts: VxeGlobalRendererHandles.RenderFormDesignSettingFormViewParams
    renderParams: VxeGlobalRendererHandles.RenderFormDesignSettingFormViewParams<F>
  }): VxeGlobalRendererHandles.RenderFormDesignSettingFormViewParams<F>
  useWidgetView<P = any>(props: {
    renderOpts: VxeGlobalRendererHandles.RenderFormDesignWidgetViewOptions | VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewOptions
    renderParams: VxeGlobalRendererHandles.RenderFormDesignWidgetViewParams | VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewParams
  }): {
    currWidget: ComputedRef<VxeFormDesignDefines.WidgetObjItem<P>>
    widgetOptions: ComputedRef<P>
    widgetModel: WritableComputedRef<any>
    isEditMode: ComputedRef<boolean>
    isViewMode: ComputedRef<boolean>
  }
  useWidgetName(props: {
    renderOpts: any
    renderParams: any
  }): {
    computeKebabCaseName: ComputedRef<string>
  }
  useSubtableView<D = any, P = Record<string, any>>(props: {
    renderOpts: VxeGlobalRendererHandles.RenderFormDesignWidgetSubtableEditViewOptions
    renderParams: VxeGlobalRendererHandles.RenderFormDesignWidgetSubtableEditViewParams
  }): {
    currColumn: ComputedRef<VxeTableDefines.ColumnInfo<D>>
    currRow: ComputedRef<D>
    currWidget: ComputedRef<VxeFormDesignDefines.WidgetObjItem<P>>
    widgetOptions: ComputedRef<P>
    cellModel: WritableComputedRef<any>
  }
  /**
   * 已废弃
   * @deprecated
   */
  useWidgetPropDataSource(props: {
    renderOpts: any
    renderParams: any
  }, renderConfig?: {
    isSubOption?: boolean
  }): {
    renderDataSourceFormItem(): VNode
    renderDataSourceFormItemContent(): VNode[]
  }
}
