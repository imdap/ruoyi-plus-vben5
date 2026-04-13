import { ComputedRef, WritableComputedRef } from 'vue'
import { VxeGlobalRendererHandles } from '../ui'
import { VxeTableDefines } from '../components/table'

export interface TableHandleExport {
  useCellView<D = any, P = Record<string, any>>(props: {
    renderOpts: VxeGlobalRendererHandles.RenderTableCellOptions | VxeGlobalRendererHandles.RenderTableEditOptions
    renderParams: VxeGlobalRendererHandles.RenderTableCellParams | VxeGlobalRendererHandles.RenderTableEditParams
  }): {
    currColumn: ComputedRef<VxeTableDefines.ColumnInfo<D>>
    currRow: ComputedRef<D>
    cellModel: WritableComputedRef<any>
    cellOptions: ComputedRef<P>
  }
}
