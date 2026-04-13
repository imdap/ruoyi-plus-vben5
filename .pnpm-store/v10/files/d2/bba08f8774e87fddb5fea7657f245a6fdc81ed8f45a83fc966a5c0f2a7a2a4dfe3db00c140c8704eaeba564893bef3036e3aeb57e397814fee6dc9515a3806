import { DeepNamePath } from "./namePathType.js";
import { Component } from "vue";

//#region src/form/types.d.ts
type ReducerAction = UpdateAction | ValidateAction;
type BatchTask = (key: string, callback: VoidFunction) => void;
type InternalNamePath = (string | number)[];
type NamePath<T = any> = DeepNamePath<T>;
type StoreValue = any;
type Store = Record<string, StoreValue>;
interface UpdateAction {
  type: 'updateValue';
  namePath: InternalNamePath;
  value: StoreValue;
}
interface ValidateAction {
  type: 'validateField';
  namePath: InternalNamePath;
  triggerName: string;
}
interface Meta {
  touched: boolean;
  validating: boolean;
  errors: string[];
  warnings: string[];
  name: InternalNamePath;
  validated: boolean;
}
interface InternalFieldData extends Meta {
  value: StoreValue;
}
/**
 * Used by `setFields` config
 */
interface FieldData<Values = any> extends Partial<Omit<InternalFieldData, 'name'>> {
  name: NamePath<Values>;
}
type RuleType = 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'object' | 'enum' | 'date' | 'url' | 'hex' | 'email' | 'tel';
type Validator = (rule: RuleObject, value: StoreValue, callback: (error?: string) => void) => Promise<void | any> | void;
type RuleRender = (form: FormInstance) => RuleObject;
interface ValidatorRule {
  warningOnly?: boolean;
  message?: string | Component;
  validator: Validator;
}
type TriggerType = 'change' | 'blur' | 'focus';
interface BaseRule {
  warningOnly?: boolean;
  enum?: StoreValue[];
  len?: number;
  max?: number;
  message?: string | Component;
  min?: number;
  pattern?: RegExp;
  required?: boolean;
  transform?: (value: StoreValue) => StoreValue;
  type?: RuleType;
  whitespace?: boolean;
  trigger?: TriggerType | TriggerType[];
  /** Customize rule level `validateTrigger`. Must be subset of Field `validateTrigger` */
  validateTrigger?: TriggerType | TriggerType[];
}
type AggregationRule = BaseRule & Partial<ValidatorRule>;
interface ArrayRule extends Omit<AggregationRule, 'type'> {
  type: 'array';
  defaultField?: RuleObject;
}
type RuleObject = AggregationRule | ArrayRule;
type Rule = RuleObject | RuleRender;
interface ValidateErrorEntity<Values = any> {
  message: string;
  values: Values;
  errorFields: {
    name: InternalNamePath;
    errors: string[];
  }[];
  outOfDate: boolean;
}
interface FieldEntity {
  onStoreChange: (store: Store, namePathList: InternalNamePath[] | null, info: ValuedNotifyInfo) => void;
  isFieldTouched: () => boolean;
  isFieldDirty: () => boolean;
  isFieldValidating: () => boolean;
  isListField: () => boolean;
  isList: () => boolean;
  isPreserve: () => boolean;
  validateRules: (options?: InternalValidateOptions) => Promise<RuleError[]>;
  getMeta: () => Meta;
  getNamePath: () => InternalNamePath;
  getErrors: () => string[];
  getWarnings: () => string[];
  props: {
    name?: NamePath;
    rules?: Rule[];
    dependencies?: NamePath[];
    initialValue?: any;
  };
  /**
   * Mask as invalidate.
   * This will filled when Field is removed but not updated in render yet.
   */
  INVALIDATE_NAME_PATH?: InternalNamePath;
}
interface FieldError {
  name: InternalNamePath;
  errors: string[];
  warnings: string[];
}
interface RuleError {
  errors: string[];
  rule: RuleObject;
}
interface ValidateOptions {
  /**
   * Validate only and not trigger UI and Field status update
   */
  validateOnly?: boolean;
  /**
   * Recursive validate. It will validate all the name path that contains the provided one.
   * e.g. [['a']] will validate ['a'] , ['a', 'b'] and ['a', 1].
   */
  recursive?: boolean;
  /** Validate when a field is dirty (validated or touched) */
  dirty?: boolean;
}
interface ValidateFields<Values = any> {
  (opt?: ValidateOptions): Promise<Values>;
  (nameList?: NamePath[], opt?: ValidateOptions): Promise<Values>;
}
interface InternalValidateOptions extends ValidateOptions {
  triggerName?: string;
  validateMessages?: ValidateMessages;
}
interface InternalValidateFields<Values = any> {
  (options?: InternalValidateOptions): Promise<Values>;
  (nameList?: NamePath[], options?: InternalValidateOptions): Promise<Values>;
}
interface ValueUpdateInfo {
  type: 'valueUpdate';
  source: 'internal' | 'external';
}
interface ValidateFinishInfo {
  type: 'validateFinish';
}
interface ResetInfo {
  type: 'reset';
}
interface RemoveInfo {
  type: 'remove';
}
interface SetFieldInfo {
  type: 'setField';
  data: FieldData;
}
interface DependenciesUpdateInfo {
  type: 'dependenciesUpdate';
  /**
   * Contains all the related `InternalNamePath[]`.
   * a <- b <- c : change `a`
   * relatedFields=[a, b, c]
   */
  relatedFields: InternalNamePath[];
}
type NotifyInfo = ValueUpdateInfo | ValidateFinishInfo | ResetInfo | RemoveInfo | SetFieldInfo | DependenciesUpdateInfo;
type ValuedNotifyInfo = NotifyInfo & {
  store: Store;
};
interface Callbacks<Values = any> {
  onValuesChange?: (changedValues: Partial<Values>, values: Values) => void;
  onFieldsChange?: (changedFields: FieldData[], allFields: FieldData[]) => void;
  onFinish?: (values: Values) => void;
  onFinishFailed?: (errorInfo: ValidateErrorEntity<Values>) => void;
}
type WatchCallBack = (values: Store, allValues: Store, namePathList: InternalNamePath[]) => void;
interface WatchOptions<Form extends FormInstance = FormInstance> {
  form?: Form;
  preserve?: boolean;
}
interface InternalHooks {
  dispatch: (action: ReducerAction) => void;
  initEntityValue: (entity: FieldEntity) => void;
  registerField: (entity: FieldEntity) => () => void;
  useSubscribe: (subscribable: boolean) => void;
  setInitialValues: (values: Store, init: boolean) => void;
  destroyForm: (clearOnDestroy?: boolean) => void;
  setCallbacks: (callbacks: Callbacks) => void;
  registerWatch: (callback: WatchCallBack) => () => void;
  getFields: (namePathList?: InternalNamePath[]) => FieldData[];
  setValidateMessages: (validateMessages: ValidateMessages) => void;
  setPreserve: (preserve?: boolean) => void;
  getInitialValue: (namePath: InternalNamePath) => StoreValue;
  setBatchUpdate: (fn: BatchTask) => void;
}
/** Only return partial when type is not any */
type RecursivePartial<T> = NonNullable<T> extends object ? { [P in keyof T]?: NonNullable<T[P]> extends (infer U)[] ? RecursivePartial<U>[] : NonNullable<T[P]> extends object ? RecursivePartial<T[P]> : T[P] } : T;
type FilterFunc = (meta: Meta | null) => boolean;
interface GetFieldsValueConfig {
  /**
   * @deprecated `strict` is deprecated and not working anymore
   */
  strict?: boolean;
  filter?: FilterFunc;
}
interface FormInstance<Values = any> {
  getFieldValue: (name: NamePath<Values>) => StoreValue;
  getFieldsValue: (() => Values) & ((nameList: NamePath<Values>[] | true, filterFunc?: FilterFunc) => any) & ((config: GetFieldsValueConfig) => any);
  getFieldError: (name: NamePath<Values>) => string[];
  getFieldsError: (nameList?: NamePath<Values>[]) => FieldError[];
  getFieldWarning: (name: NamePath<Values>) => string[];
  isFieldsTouched: ((nameList?: NamePath<Values>[], allFieldsTouched?: boolean) => boolean) & ((allFieldsTouched?: boolean) => boolean);
  isFieldTouched: (name: NamePath<Values>) => boolean;
  isFieldValidating: (name: NamePath<Values>) => boolean;
  isFieldsValidating: (nameList?: NamePath<Values>[]) => boolean;
  resetFields: (fields?: NamePath<Values>[]) => void;
  setFields: (fields: FieldData<Values>[]) => void;
  setFieldValue: (name: NamePath<Values>, value: any) => void;
  setFieldsValue: (values: RecursivePartial<Values>) => void;
  validateFields: ValidateFields<Values>;
  submit: () => void;
}
type FormRef<Values = any> = FormInstance<Values> & {
  nativeElement?: HTMLElement;
};
type InternalFormInstance = Omit<FormInstance, 'validateFields'> & {
  validateFields: InternalValidateFields;
  /**
   * Passed by field context props
   */
  prefixName?: InternalNamePath;
  validateTrigger?: string | string[] | false;
  /**
   * Form component should register some content into store.
   * We pass the `HOOK_MARK` as key to avoid user call the function.
   */
  getInternalHooks: (secret: string) => InternalHooks | null; /** @private Internal usage. Do not use it in your production */
  _init?: boolean;
};
type EventArgs = any[];
type ValidateMessage = string | (() => string);
interface ValidateMessages {
  default?: ValidateMessage;
  required?: ValidateMessage;
  enum?: ValidateMessage;
  whitespace?: ValidateMessage;
  date?: {
    format?: ValidateMessage;
    parse?: ValidateMessage;
    invalid?: ValidateMessage;
  };
  types?: {
    string?: ValidateMessage;
    method?: ValidateMessage;
    array?: ValidateMessage;
    object?: ValidateMessage;
    number?: ValidateMessage;
    date?: ValidateMessage;
    boolean?: ValidateMessage;
    integer?: ValidateMessage;
    float?: ValidateMessage;
    regexp?: ValidateMessage;
    email?: ValidateMessage;
    tel?: ValidateMessage;
    url?: ValidateMessage;
    hex?: ValidateMessage;
  };
  string?: {
    len?: ValidateMessage;
    min?: ValidateMessage;
    max?: ValidateMessage;
    range?: ValidateMessage;
  };
  number?: {
    len?: ValidateMessage;
    min?: ValidateMessage;
    max?: ValidateMessage;
    range?: ValidateMessage;
  };
  array?: {
    len?: ValidateMessage;
    min?: ValidateMessage;
    max?: ValidateMessage;
    range?: ValidateMessage;
  };
  pattern?: {
    mismatch?: ValidateMessage;
  };
}
//#endregion
export { BatchTask, Callbacks, EventArgs, FieldData, FieldEntity, FieldError, FilterFunc, FormInstance, FormRef, GetFieldsValueConfig, InternalFieldData, InternalFormInstance, InternalHooks, InternalNamePath, InternalValidateFields, InternalValidateOptions, Meta, NamePath, NotifyInfo, ReducerAction, Rule, RuleError, RuleObject, RuleRender, RuleType, Store, StoreValue, TriggerType, ValidateErrorEntity, ValidateFields, ValidateMessages, ValidateOptions, ValidatorRule, ValuedNotifyInfo, WatchCallBack, WatchOptions };