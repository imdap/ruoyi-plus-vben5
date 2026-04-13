import { WarningContextProps } from "../_util/warning.js";
import { SizeType } from "./SizeContext.js";
import { ColumnType } from "../table/interface.js";
import "../table/index.js";
import { Locale } from "../locale/index.js";
import { RenderEmptyHandler } from "./defaultRenderEmpty.js";
import { AlertConfig, AnchorStyleConfig, BadgeConfig, BreadcrumbConfig, ButtonConfig, CSPConfig, CalendarConfig, CardConfig, CascaderConfig, CheckboxConfig, CollapseConfig, ColorPickerConfig, ComponentStyleConfig, DatePickerConfig, DescriptionsConfig, DirectionType, DividerConfig, DrawerConfig, DropdownConfig, EmptyConfig, FlexConfig, FloatButtonConfig, FloatButtonGroupConfig, ImageConfig, InputConfig, InputNumberConfig, InputSearchConfig, MasonryConfig, MentionsConfig, MenuConfig, ModalConfig, NotificationConfig, OTPConfig, PaginationConfig, PopconfirmConfig, PopoverConfig, PopupOverflow, ProgressConfig, RadioConfig, RangePickerConfig, ResultConfig, SegmentedConfig, SelectConfig, SkeletonConfig, SliderConfig, SpaceConfig, SpinConfig, SplitterConfig, StatisticConfig, StepsConfig, SwitchStyleConfig, TableConfig, TabsConfig, TagConfig, TextAreaConfig, ThemeConfig, TimePickerConfig, TimelineConfig, TooltipConfig, TourConfig, TransferConfig, TreeConfig, TreeSelectConfig, TypographyConfig, UploadConfig, Variant, WaveConfig } from "./context.js";

//#region src/config-provider/define.d.ts
interface ConfigProviderProps {
  getTargetContainer?: () => HTMLElement | Window;
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  prefixCls?: string;
  iconPrefixCls?: string;
  renderEmpty?: RenderEmptyHandler;
  transformCellText?: (ctx: {
    text: any;
    column: ColumnType<any>;
    record: Record<string, any>;
    index: number;
  }) => any;
  csp?: CSPConfig;
  variant?: Variant;
  input?: InputConfig;
  inputNumber?: InputNumberConfig;
  textArea?: TextAreaConfig;
  mentions?: MentionsConfig;
  inputSearch?: InputSearchConfig;
  otp?: OTPConfig;
  select?: SelectConfig;
  pagination?: PaginationConfig;
  /**
   * @descCN 语言包配置，语言包可到 `antd/locale` 目录下寻找。
   * @descEN Language package setting, you can find the packages in `antd/locale`.
   */
  locale?: Locale;
  componentSize?: SizeType;
  componentDisabled?: boolean;
  /**
   * @descCN 设置布局展示方向。
   * @descEN Set direction of layout.
   * @default ltr
   */
  direction?: DirectionType;
  space?: SpaceConfig;
  splitter?: SplitterConfig;
  /**
   * @descCN 设置 `false` 时关闭虚拟滚动。
   * @descEN Close the virtual scrolling when setting `false`.
   * @default true
   */
  virtual?: boolean;
  popupMatchSelectWidth?: boolean;
  popupOverflow?: PopupOverflow;
  theme?: ThemeConfig;
  warning?: WarningContextProps;
  alert?: AlertConfig;
  anchor?: AnchorStyleConfig;
  button?: ButtonConfig;
  calendar?: CalendarConfig;
  carousel?: ComponentStyleConfig;
  cascader?: CascaderConfig;
  treeSelect?: TreeSelectConfig;
  collapse?: CollapseConfig;
  divider?: DividerConfig;
  drawer?: DrawerConfig;
  typography?: TypographyConfig;
  skeleton?: SkeletonConfig;
  spin?: SpinConfig;
  segmented?: SegmentedConfig;
  statistic?: StatisticConfig;
  steps?: StepsConfig;
  image?: ImageConfig;
  layout?: ComponentStyleConfig;
  modal?: ModalConfig;
  progress?: ProgressConfig;
  result?: ResultConfig;
  slider?: SliderConfig;
  breadcrumb?: BreadcrumbConfig;
  menu?: MenuConfig;
  floatButton?: FloatButtonConfig;
  floatButtonGroup?: FloatButtonGroupConfig;
  checkbox?: CheckboxConfig;
  descriptions?: DescriptionsConfig;
  empty?: EmptyConfig;
  badge?: BadgeConfig;
  radio?: RadioConfig;
  rate?: ComponentStyleConfig;
  switch?: SwitchStyleConfig;
  transfer?: TransferConfig;
  avatar?: ComponentStyleConfig;
  message?: ComponentStyleConfig;
  tag?: TagConfig;
  table?: TableConfig;
  card?: CardConfig;
  tabs?: TabsConfig;
  timeline?: TimelineConfig;
  timePicker?: TimePickerConfig;
  upload?: UploadConfig;
  notification?: NotificationConfig;
  tree?: TreeConfig;
  colorPicker?: ColorPickerConfig;
  datePicker?: DatePickerConfig;
  rangePicker?: RangePickerConfig;
  dropdown?: DropdownConfig;
  flex?: FlexConfig;
  masonry?: MasonryConfig;
  wave?: WaveConfig;
  tour?: TourConfig;
  tooltip?: TooltipConfig;
  popover?: PopoverConfig;
  popconfirm?: PopconfirmConfig;
}
interface ConfigProviderSlots {
  renderEmpty?: (componentName?: string) => any;
  transformCellText?: (ctx: {
    text: any;
    column: ColumnType<any>;
    record: Record<string, any>;
    index: number;
  }) => any;
  [key: string]: any;
}
interface ConfigProviderEmits {
  [key: string]: any;
}
//#endregion
export { ConfigProviderEmits, ConfigProviderProps, ConfigProviderSlots };