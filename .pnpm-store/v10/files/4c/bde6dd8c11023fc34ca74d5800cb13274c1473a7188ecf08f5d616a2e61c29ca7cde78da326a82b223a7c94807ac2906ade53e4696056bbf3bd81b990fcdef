import { SemanticClassNamesType, SemanticStylesType } from "../_util/hooks/useMergeSemantic.js";
import "../_util/hooks/index.js";
import { ProgressAriaProps, ProgressProps } from "../progress/progress.js";
import "../progress/index.js";
import { CSSProperties, ImgHTMLAttributes, VNodeChild } from "vue";
import { AcceptConfig, UploadRequestOption, VcFile as VcFile$1 } from "@v-c/upload";

//#region src/upload/interface.d.ts
type UploadFileStatus = 'error' | 'done' | 'uploading' | 'removed';
interface HttpRequestHeader {
  [key: string]: string;
}
interface VcFile extends VcFile$1 {
  readonly lastModifiedDate: Date;
}
interface UploadFile<T = any> extends ProgressAriaProps {
  uid: string;
  size?: number;
  name: string;
  fileName?: string;
  lastModified?: number;
  lastModifiedDate?: Date;
  url?: string;
  status?: UploadFileStatus;
  percent?: number;
  thumbUrl?: string;
  crossorigin?: ImgHTMLAttributes['crossorigin'];
  originFileObj?: VcFile;
  response?: T;
  error?: any;
  linkProps?: any;
  type?: string;
  xhr?: T;
  preview?: string;
}
interface InternalUploadFile<T = any> extends UploadFile<T> {
  originFileObj: VcFile;
}
interface UploadChangeParam<T = UploadFile> {
  file: T;
  fileList: T[];
  event?: {
    percent: number;
  };
}
interface ShowUploadListInterface<T = any> {
  extra?: VNodeChild | ((file: UploadFile<T>) => VNodeChild);
  showRemoveIcon?: boolean | ((file: UploadFile<T>) => boolean);
  showPreviewIcon?: boolean | ((file: UploadFile<T>) => boolean);
  showDownloadIcon?: boolean | ((file: UploadFile<T>) => boolean);
  removeIcon?: VNodeChild | ((file: UploadFile<T>) => VNodeChild);
  downloadIcon?: VNodeChild | ((file: UploadFile<T>) => VNodeChild);
  previewIcon?: VNodeChild | ((file: UploadFile<T>) => VNodeChild);
}
interface UploadLocale {
  uploading?: string;
  removeFile?: string;
  downloadFile?: string;
  uploadError?: string;
  previewFile?: string;
}
type UploadType = 'drag' | 'select';
type UploadListType = 'text' | 'picture' | 'picture-card' | 'picture-circle';
type UploadListProgressProps = Omit<ProgressProps, 'percent' | 'type'>;
type ItemRender<T = any> = (originNode: VNodeChild, file: UploadFile<T>, fileList: Array<UploadFile<T>>, actions: {
  download: () => void;
  preview: () => void;
  remove: () => void;
}) => VNodeChild;
type PreviewFileHandler = (file: File | Blob) => PromiseLike<string>;
type BeforeUploadValueType = void | boolean | string | Blob | File;
type UploadSemanticName = keyof UploadSemanticClassNames & keyof UploadSemanticStyles;
interface UploadSemanticClassNames {
  root?: string;
  list?: string;
  item?: string;
  trigger?: string;
}
interface UploadSemanticStyles {
  root?: CSSProperties;
  list?: CSSProperties;
  item?: CSSProperties;
  trigger?: CSSProperties;
}
type UploadClassNamesType<T = any> = SemanticClassNamesType<UploadProps<T>, UploadSemanticClassNames>;
type UploadStylesType<T = any> = SemanticStylesType<UploadProps<T>, UploadSemanticStyles>;
interface UploadProps<T = any> {
  type?: UploadType;
  name?: string;
  defaultFileList?: Array<UploadFile<T>>;
  fileList?: Array<UploadFile<T>>;
  action?: string | ((file: VcFile) => string) | ((file: VcFile) => PromiseLike<string>);
  directory?: boolean;
  data?: Record<string, unknown> | ((file: UploadFile<T>) => Record<string, unknown> | Promise<Record<string, unknown>>);
  method?: 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch';
  headers?: HttpRequestHeader;
  showUploadList?: boolean | ShowUploadListInterface<T>;
  multiple?: boolean;
  accept?: string | AcceptConfig;
  beforeUpload?: (file: VcFile, fileList: VcFile[]) => BeforeUploadValueType | Promise<BeforeUploadValueType>;
  listType?: UploadListType;
  classes?: UploadClassNamesType;
  styles?: UploadStylesType;
  rootClass?: string;
  supportServerRender?: boolean;
  disabled?: boolean;
  prefixCls?: string;
  customRequest?: (options: UploadRequestOption<T>, info: {
    /**
     * @since 5.28.0
     */
    defaultRequest: (option: UploadRequestOption<T>) => void;
  }) => void;
  withCredentials?: boolean;
  openFileDialogOnClick?: boolean;
  locale?: UploadLocale;
  id?: string;
  previewFile?: PreviewFileHandler;
  iconRender?: (file: UploadFile<T>, listType?: UploadListType) => VNodeChild;
  isImageUrl?: (file: UploadFile<T>) => boolean;
  progress?: UploadListProgressProps;
  itemRender?: ItemRender<T>;
  /** Config max count of `fileList`. Will replace current one when `maxCount` is 1 */
  maxCount?: number;
  onRemove?: (file: UploadFile<T>) => void | boolean | Promise<void | boolean>;
  onPreview?: (file: UploadFile<T>) => void;
  onDownload?: (file: UploadFile<T>) => void;
  capture?: string | boolean;
  hasControlInside?: boolean;
  pastable?: boolean;
}
interface UploadEmits<T = any> {
  'change': (info: UploadChangeParam<UploadFile<T>>) => void;
  'drop': (event: DragEvent) => void;
  'update:fileList': (fileList: UploadFile<T>[]) => void;
}
interface UploadSlots<T = any> {
  default?: () => any;
  iconRender?: (props: {
    file: UploadFile<T>;
    listType?: UploadListType;
  }) => VNodeChild;
  itemRender?: (props: {
    originNode: VNodeChild;
    file: UploadFile<T>;
    fileList: Array<UploadFile<T>>;
    actions: {
      download: () => void;
      preview: () => void;
      remove: () => void;
    };
  }) => VNodeChild;
}
interface UploadState<T = any> {
  fileList: UploadFile<T>[];
  dragState: string;
}
interface UploadListProps<T = any> {
  classes?: UploadClassNamesType;
  styles?: UploadStylesType;
  listType?: UploadListType;
  items?: Array<UploadFile<T>>;
  progress?: UploadListProgressProps;
  prefixCls?: string;
  showRemoveIcon?: boolean | ((file: UploadFile<T>) => boolean);
  showDownloadIcon?: boolean | ((file: UploadFile<T>) => boolean);
  showPreviewIcon?: boolean | ((file: UploadFile<T>) => boolean);
  removeIcon?: VNodeChild | ((file: UploadFile<T>) => VNodeChild);
  downloadIcon?: VNodeChild | ((file: UploadFile<T>) => VNodeChild);
  previewIcon?: VNodeChild | ((file: UploadFile<T>) => VNodeChild);
  extra?: VNodeChild | ((file: UploadFile<T>) => VNodeChild);
  locale: UploadLocale;
  previewFile?: PreviewFileHandler;
  iconRender?: (file: UploadFile<T>, listType?: UploadListType) => VNodeChild;
  isImageUrl?: (file: UploadFile<T>) => boolean;
  appendAction?: any;
  appendActionVisible?: boolean;
  itemRender?: ItemRender<T>;
  /**
   * @internal Only the internal remove button is provided for use
   */
  disabled?: boolean;
  onRemove?: (file: UploadFile<T>) => void | boolean;
  onPreview?: (file: UploadFile<T>) => void;
  onDownload?: (file: UploadFile<T>) => void;
}
interface UploadListEmits {}
interface UploadListSlots<T = any> {
  iconRender?: (props: {
    file: UploadFile<T>;
    listType?: UploadListType;
  }) => VNodeChild;
  itemRender?: (props: {
    originNode: VNodeChild;
    file: UploadFile<T>;
    fileList: Array<UploadFile<T>>;
    actions: {
      download: () => void;
      preview: () => void;
      remove: () => void;
    };
  }) => VNodeChild;
  removeIcon?: (props: {
    file: UploadFile<T>;
  }) => VNodeChild;
  downloadIcon?: (props: {
    file: UploadFile<T>;
  }) => VNodeChild;
  previewIcon?: (props: {
    file: UploadFile<T>;
  }) => VNodeChild;
}
//#endregion
export { HttpRequestHeader, InternalUploadFile, ItemRender, ShowUploadListInterface, UploadChangeParam, UploadClassNamesType, UploadEmits, UploadFile, UploadFileStatus, UploadListEmits, UploadListProgressProps, UploadListProps, UploadListSlots, UploadListType, UploadLocale, UploadProps, UploadSemanticClassNames, UploadSemanticName, UploadSemanticStyles, UploadSlots, UploadState, UploadStylesType, UploadType, VcFile };