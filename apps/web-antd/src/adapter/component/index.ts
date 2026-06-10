/**
 * 通用组件共同的使用的基础组件，原先放在 adapter/form 内部，限制了使用范围，这里提取出来，方便其他地方使用
 * 可用于 vben-form、vben-modal、vben-drawer 等组件使用,
 */

import type {
  AutoCompleteProps,
  ButtonProps,
  CascaderProps,
  CheckboxGroupProps,
  CheckboxProps,
  DatePickerProps,
  DividerProps,
  InputNumberProps,
  InputProps,
  MentionsProps,
  RadioGroupProps,
  RadioProps,
  RangePickerProps,
  RateProps,
  SelectProps,
  SpaceProps,
  SwitchProps,
  TextAreaProps,
  TimePickerProps,
  TimeRangePickerProps,
  TreeSelectProps,
  UploadProps,
} from 'antdv-next';

import type { Component } from 'vue';

import type {
  ApiComponentSharedProps,
  BaseFormComponentType,
  IconPickerProps,
} from '@vben/common-ui';
import type { Recordable } from '@vben/types';

import type { TiptapProps } from '#/components/tiptap/index';
import type { BaseUploadProps } from '#/components/upload/src/props';

import { computed, defineAsyncComponent, defineComponent, h, ref } from 'vue';

import { ApiComponent, globalShareState, IconPicker } from '@vben/common-ui';
import { $t } from '@vben/locales';

const RichTextarea = defineAsyncComponent(() =>
  import('#/components/tiptap/index').then((res) => res.Tiptap),
);

const FileUpload = defineAsyncComponent(() =>
  import('#/components/upload').then((res) => res.FileUpload),
);

const ImageUpload = defineAsyncComponent(() =>
  import('#/components/upload').then((res) => res.ImageUpload),
);

const AutoComplete = defineAsyncComponent(
  () => import('antdv-next/dist/auto-complete/index'),
);
const Button = defineAsyncComponent(
  () => import('antdv-next/dist/button/index'),
);
const Cascader = defineAsyncComponent(
  () => import('antdv-next/dist/cascader/index'),
);
const Checkbox = defineAsyncComponent(
  () => import('antdv-next/dist/checkbox/index'),
);
const CheckboxGroup = defineAsyncComponent(
  () => import('antdv-next/dist/checkbox/Group'),
);
const DatePicker = defineAsyncComponent(
  () => import('antdv-next/dist/date-picker/index'),
);
const Divider = defineAsyncComponent(
  () => import('antdv-next/dist/divider/index'),
);
const Input = defineAsyncComponent(() => import('antdv-next/dist/input/index'));
const InputNumber = defineAsyncComponent(
  () => import('antdv-next/dist/input-number/index'),
);
const InputPassword = defineAsyncComponent(
  () => import('antdv-next/dist/input/Password'),
);
const Mentions = defineAsyncComponent(
  () => import('antdv-next/dist/mentions/index'),
);
const Radio = defineAsyncComponent(() => import('antdv-next/dist/radio/index'));
const RadioGroup = defineAsyncComponent(() =>
  import('antdv-next/dist/radio/index').then((res) => res.RadioGroup),
);
const RangePicker = defineAsyncComponent(() =>
  import('antdv-next/dist/date-picker/index').then(
    (res) => res.DateRangePicker,
  ),
);
const Rate = defineAsyncComponent(() => import('antdv-next/dist/rate/index'));
const Select = defineAsyncComponent(
  () => import('antdv-next/dist/select/index'),
);
const Space = defineAsyncComponent(() => import('antdv-next/dist/space/index'));
const Switch = defineAsyncComponent(
  () => import('antdv-next/dist/switch/index'),
);
const Textarea = defineAsyncComponent(
  () => import('antdv-next/dist/input/TextArea'),
);
const TimePicker = defineAsyncComponent(
  () => import('antdv-next/dist/time-picker/index'),
);
const TimeRangePicker = defineAsyncComponent(() =>
  import('antdv-next/dist/time-picker/index').then(
    (res) => res.TimeRangePicker,
  ),
);
const TreeSelect = defineAsyncComponent(
  () => import('antdv-next/dist/tree-select/index'),
);
const Upload = defineAsyncComponent(
  () => import('antdv-next/dist/upload/Upload'),
);

const withDefaultPlaceholder = (
  component: Component,
  type: 'input' | 'select',
  componentProps: Recordable<any> = {},
) => {
  return defineComponent({
    name: component.name,
    inheritAttrs: false,
    setup: (props: any, { attrs, expose, slots }) => {
      // 改为placeholder 解决在keepalive & 语言切换 & tab切换 显示不变的问题
      const computedPlaceholder = computed(
        () =>
          props?.placeholder ||
          attrs?.placeholder ||
          $t(`ui.placeholder.${type}`),
      );

      // 透传组件暴露的方法
      const innerRef = ref();
      expose(
        new Proxy(
          {},
          {
            get: (_target, key) => innerRef.value?.[key],
            has: (_target, key) => key in (innerRef.value || {}),
          },
        ),
      );
      return () =>
        h(
          component,
          {
            ...componentProps,
            placeholder: computedPlaceholder.value,
            ...props,
            ...attrs,
            ref: innerRef,
          },
          slots,
        );
    },
  });
};

// 严格组件类型（不含 BaseFormComponentType 的 string 扩展），用于 components 对象的类型检查
type StrictComponentType =
  | 'ApiCascader'
  | 'ApiSelect'
  | 'ApiTreeSelect'
  | 'AutoComplete'
  | 'Cascader'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'DatePicker'
  | 'DefaultButton'
  | 'Divider'
  | 'FileUpload'
  | 'IconPicker'
  | 'ImageUpload'
  | 'Input'
  | 'InputNumber'
  | 'InputPassword'
  | 'Mentions'
  | 'PrimaryButton'
  | 'Radio'
  | 'RadioGroup'
  | 'RangePicker'
  | 'Rate'
  | 'RichTextarea'
  | 'Select'
  | 'Space'
  | 'Switch'
  | 'Textarea'
  | 'TimePicker'
  | 'TimeRangePicker'
  | 'TreeSelect'
  | 'Upload';

// 这里需要自行根据业务组件库进行适配，需要用到的组件都需要在这里类型说明
export type ComponentType = BaseFormComponentType | StrictComponentType;

/**
 * 组件 Props 定义
 */
interface ComponentPropsMapDef {
  ApiCascader: ApiComponentSharedProps & CascaderProps;
  ApiSelect: ApiComponentSharedProps & SelectProps;
  ApiTreeSelect: ApiComponentSharedProps & TreeSelectProps;
  AutoComplete: AutoCompleteProps;
  Cascader: CascaderProps;
  Checkbox: CheckboxProps;
  CheckboxGroup: CheckboxGroupProps;
  DatePicker: DatePickerProps;
  DefaultButton: ButtonProps;
  Divider: DividerProps;
  FileUpload: BaseUploadProps;
  IconPicker: IconPickerProps;
  ImageUpload: BaseUploadProps;
  Input: InputProps;
  InputNumber: InputNumberProps;
  InputPassword: InputProps;
  Mentions: MentionsProps;
  PrimaryButton: ButtonProps;
  Radio: RadioProps;
  RadioGroup: RadioGroupProps;
  RangePicker: RangePickerProps;
  Rate: RateProps;
  RichTextarea: TiptapProps;
  Select: SelectProps;
  Space: SpaceProps;
  Switch: SwitchProps;
  Textarea: TextAreaProps;
  TimePicker: TimePickerProps;
  TimeRangePicker: TimeRangePickerProps;
  TreeSelect: TreeSelectProps;
  Upload: UploadProps;
}

/**
 * 与 {@link StrictComponentType} 一一对应，便于 Schema 上 `component` + `componentProps` 联动提示
 * 通过 mapped type 约束: StrictComponentType 新增成员但 ComponentPropsMapDef 未添加对应键时会编译报错
 */
export type ComponentPropsMap = {
  [K in StrictComponentType]: ComponentPropsMapDef[K];
};

async function initComponentAdapter() {
  const components: Record<StrictComponentType, Component> = {
    // 如果你的组件体积比较大，可以使用异步加载
    // Button: () =>
    // import('xxx').then((res) => res.Button),
    AutoComplete: withDefaultPlaceholder(AutoComplete, 'input'),
    ApiCascader: withDefaultPlaceholder(ApiComponent, 'select', {
      component: Cascader,
      fieldNames: { label: 'label', value: 'value', children: 'children' },
      loadingSlot: 'suffixIcon',
      modelPropName: 'value',
      visibleEvent: 'onVisibleChange',
    }),
    ApiSelect: withDefaultPlaceholder(
      {
        ...ApiComponent,
        name: 'ApiSelect',
      },
      'select',
      {
        component: Select,
        loadingSlot: 'suffixIcon',
        visibleEvent: 'onDropdownVisibleChange',
        modelPropName: 'value',
      },
    ),
    ApiTreeSelect: withDefaultPlaceholder(
      {
        ...ApiComponent,
        name: 'ApiTreeSelect',
      },
      'select',
      {
        component: TreeSelect,
        fieldNames: { label: 'label', value: 'value', children: 'children' },
        loadingSlot: 'suffixIcon',
        modelPropName: 'value',
        optionsPropName: 'treeData',
        visibleEvent: 'onVisibleChange',
      },
    ),
    Cascader: withDefaultPlaceholder(Cascader, 'select'),
    Checkbox,
    CheckboxGroup,
    DatePicker,
    // 自定义默认按钮
    DefaultButton: (props, { attrs, slots }) => {
      return h(Button, { ...props, attrs, type: 'default' }, slots);
    },
    Divider,
    IconPicker: withDefaultPlaceholder(IconPicker, 'select', {
      iconSlot: 'addonAfter',
      inputComponent: Input,
      modelValueProp: 'value',
    }),
    Input: withDefaultPlaceholder(Input, 'input'),
    InputNumber: withDefaultPlaceholder(InputNumber, 'input', {
      style: { width: '100%' },
    }),
    InputPassword: withDefaultPlaceholder(InputPassword, 'input'),
    Mentions: withDefaultPlaceholder(Mentions, 'input'),
    // 自定义主要按钮
    PrimaryButton: (props, { attrs, slots }) => {
      return h(Button, { ...props, attrs, type: 'primary' }, slots);
    },
    Radio,
    RadioGroup,
    RangePicker,
    Rate,
    Select: withDefaultPlaceholder(Select, 'select'),
    Space,
    Switch,
    Textarea: withDefaultPlaceholder(Textarea, 'input'),
    TimePicker,
    TimeRangePicker,
    TreeSelect: withDefaultPlaceholder(TreeSelect, 'select'),
    Upload,
    ImageUpload,
    FileUpload,
    RichTextarea,
  };

  // 将组件注册到全局共享状态中
  globalShareState.setComponents(components);

  // 定义全局共享状态中的消息提示
  globalShareState.defineMessage({
    // 复制成功消息提示
    copyPreferencesSuccess: (title, content) => {
      window.notification.success({
        description: content,
        title,
        placement: 'bottomRight',
      });
    },
  });
}

export { initComponentAdapter };
