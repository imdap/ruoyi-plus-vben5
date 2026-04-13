import { App } from 'vue'
import { VxeUI } from './ui'

import zhCN from './language/zh-CN'

import VxeAlert from './alert'
import VxeAnchor from './anchor'
import VxeAnchorLink from './anchor-link'
import VxeAvatar from './avatar'
import VxeBacktop from './backtop'
import VxeBadge from './badge'
import VxeBreadcrumb from './breadcrumb'
import VxeBreadcrumbItem from './breadcrumb-item'
import VxeButton from './button'
import VxeButtonGroup from './button-group'
import VxeCalendar from './calendar'
import VxeCard from './card'
import VxeCarousel from './carousel'
import VxeCarouselItem from './carousel-item'
import VxeCascader from './cascader'
import VxeCheckbox from './checkbox'
import VxeCheckboxButton from './checkbox-button'
import VxeCheckboxGroup from './checkbox-group'
import VxeCol from './col'
import VxeCollapse from './collapse'
import VxeCollapsePane from './collapse-pane'
import VxeColorPicker from './color-picker'
import VxeContextMenu from './context-menu'
import VxeCountdown from './countdown'
import VxeDatePanel from './date-panel'
import VxeDatePicker from './date-picker'
import VxeDateRangePicker from './date-range-picker'
import VxeDrawer, { DrawerController } from './drawer'
import VxeEmpty from './empty'
import VxeForm from './form'
import VxeFormGather from './form-gather'
import VxeFormGroup from './form-group'
import VxeFormItem from './form-item'
import VxeIcon from './icon'
import VxeIconPicker from './icon-picker'
import VxeImage from './image'
import VxeImageGroup from './image-group'
import VxeImagePreview from './image-preview'
import VxeInput from './input'
import VxeLayoutAside from './layout-aside'
import VxeLayoutBody from './layout-body'
import VxeLayoutContainer from './layout-container'
import VxeLayoutFooter from './layout-footer'
import VxeLayoutHeader from './layout-header'
import VxeLink from './link'
import VxeList from './list'
import VxeLoading, { LoadingController } from './loading'
import VxeMenu from './menu'
import VxeModal, { ModalController } from './modal'
import VxeNoticeBar from './notice-bar'
import VxeNumberInput from './number-input'
import VxeOptgroup from './optgroup'
import VxeOption from './option'
import VxePager from './pager'
import VxePasswordInput from './password-input'
import VxePrintPageBreak from './print-page-break'
import VxePrint from './print'
import VxePulldown from './pulldown'
import VxeRadio from './radio'
import VxeRadioButton from './radio-button'
import VxeRadioGroup from './radio-group'
import VxeRate from './rate'
import VxeResult from './result'
import VxeRow from './row'
import VxeSegmented from './segmented'
import VxeSelect from './select'
import VxeSplitter from './splitter'
import VxeSplitterPanel from './splitter-panel'
import VxeSplit from './split'
import VxeSplitPane from './split-pane'
import VxeSlider from './slider'
import VxeSteps from './steps'
import VxeSwitch from './switch'
import VxeTabPane from './tab-pane'
import VxeTableSelect from './table-select'
import VxeTabs from './tabs'
import VxeTag from './tag'
import VxeTextEllipsis from './text-ellipsis'
import VxeText from './text'
import VxeTextarea from './textarea'
import VxeTimeline from './timeline'
import VxeTimelineItem from './timeline-item'
import VxeTip from './tip'
import VxeTooltip from './tooltip'
import VxeTour from './tour'
import VxeTree from './tree'
import VxeTreeSelect from './tree-select'
import VxeUpload from './upload'
import VxeWatermark, { WatermarkController } from './watermark'

import { saveLocalFile, readLocalFile } from './upload/src/util'
import { printHtml } from './print/src/util'

import type { VxeGlobalConfig } from '@vxe-ui/core'

const { setI18n, setLanguage, setTheme, setConfig } = VxeUI

const components = [
  VxeAlert,
  VxeAnchor,
  VxeAnchorLink,
  VxeAvatar,
  VxeBacktop,
  VxeBadge,
  VxeBreadcrumb,
  VxeBreadcrumbItem,
  VxeButton,
  VxeButtonGroup,
  VxeCalendar,
  VxeCard,
  VxeCarousel,
  VxeCarouselItem,
  VxeCascader,
  VxeCheckbox,
  VxeCheckboxButton,
  VxeCheckboxGroup,
  VxeCol,
  VxeCollapse,
  VxeCollapsePane,
  VxeColorPicker,
  VxeContextMenu,
  VxeCountdown,
  VxeDatePanel,
  VxeDatePicker,
  VxeDateRangePicker,
  VxeDrawer,
  VxeEmpty,
  VxeForm,
  VxeFormGather,
  VxeFormGroup,
  VxeFormItem,
  VxeIcon,
  VxeIconPicker,
  VxeImage,
  VxeImageGroup,
  VxeImagePreview,
  VxeInput,
  VxeLayoutAside,
  VxeLayoutBody,
  VxeLayoutContainer,
  VxeLayoutFooter,
  VxeLayoutHeader,
  VxeLink,
  VxeList,
  VxeLoading,
  VxeMenu,
  VxeModal,
  VxeNoticeBar,
  VxeNumberInput,
  VxeOptgroup,
  VxeOption,
  VxePager,
  VxePasswordInput,
  VxePrintPageBreak,
  VxePrint,
  VxePulldown,
  VxeRadio,
  VxeRadioButton,
  VxeRadioGroup,
  VxeRate,
  VxeResult,
  VxeRow,
  VxeSegmented,
  VxeSelect,
  VxeSplitter,
  VxeSplitterPanel,
  VxeSplit,
  VxeSplitPane,
  VxeSlider,
  VxeSteps,
  VxeSwitch,
  VxeTabPane,
  VxeTableSelect,
  VxeTabs,
  VxeTag,
  VxeTextEllipsis,
  VxeText,
  VxeTextarea,
  VxeTimeline,
  VxeTimelineItem,
  VxeTip,
  VxeTooltip,
  VxeTour,
  VxeTree,
  VxeTreeSelect,
  VxeUpload,
  VxeWatermark
]

export function install (app: App, options?: VxeGlobalConfig) {
  setConfig(options)

  components.forEach(component => app.use(component))
}

// 默认中文
const defaultLanguage = 'zh-CN'
setI18n(defaultLanguage, zhCN)
setLanguage(defaultLanguage)
setTheme('light')

// 兼容老版本
export const loading = LoadingController
export const modal = ModalController
export const drawer = DrawerController
export const watermark = WatermarkController
export const print = printHtml
export const saveFile = saveLocalFile
export const readFile = readLocalFile

export * from './ui'

// Components
export * from './alert'
export * from './anchor'
export * from './anchor-link'
export * from './avatar'
export * from './backtop'
export * from './badge'
export * from './breadcrumb'
export * from './breadcrumb-item'
export * from './button'
export * from './button-group'
export * from './calendar'
export * from './card'
export * from './carousel'
export * from './carousel-item'
export * from './cascader'
export * from './checkbox'
export * from './checkbox-button'
export * from './checkbox-group'
export * from './col'
export * from './collapse'
export * from './collapse-pane'
export * from './color-picker'
export * from './context-menu'
export * from './countdown'
export * from './date-panel'
export * from './date-picker'
export * from './date-range-picker'
export * from './drawer'
export * from './empty'
export * from './form'
export * from './form-gather'
export * from './form-group'
export * from './form-item'
export * from './icon'
export * from './icon-picker'
export * from './image'
export * from './image-group'
export * from './image-preview'
export * from './input'
export * from './layout-aside'
export * from './layout-body'
export * from './layout-container'
export * from './layout-footer'
export * from './layout-header'
export * from './link'
export * from './list'
export * from './loading'
export * from './menu'
export * from './modal'
export * from './notice-bar'
export * from './number-input'
export * from './optgroup'
export * from './option'
export * from './pager'
export * from './password-input'
export * from './print-page-break'
export * from './print'
export * from './pulldown'
export * from './radio'
export * from './radio-button'
export * from './radio-group'
export * from './rate'
export * from './result'
export * from './row'
export * from './segmented'
export * from './select'
export * from './splitter'
export * from './splitter-panel'
export * from './split'
export * from './split-pane'
export * from './slider'
export * from './steps'
export * from './switch'
export * from './tab-pane'
export * from './table-select'
export * from './tabs'
export * from './tag'
export * from './text-ellipsis'
export * from './text'
export * from './textarea'
export * from './timeline'
export * from './timeline-item'
export * from './tip'
export * from './tooltip'
export * from './tour'
export * from './tree'
export * from './tree-select'
export * from './upload'
export * from './watermark'
