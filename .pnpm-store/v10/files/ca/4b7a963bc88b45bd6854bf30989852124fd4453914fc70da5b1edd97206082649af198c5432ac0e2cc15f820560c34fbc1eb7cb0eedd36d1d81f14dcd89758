import { Component, CSSProperties } from 'vue';
export interface VcFile extends File {
    uid: string;
}
export type BeforeUploadFileType = File | Blob | boolean | string;
export type Action = string | ((file: VcFile) => string | PromiseLike<string>);
export interface AcceptConfig {
    format: string;
    filter?: 'native' | ((file: VcFile) => boolean);
}
export type UploadRequestMethod = 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch';
export type UploadRequestHeader = Record<string, string>;
export type UploadRequestFile = Exclude<BeforeUploadFileType, File | boolean> | VcFile;
export interface UploadRequestError extends Error {
    status?: number;
    method?: UploadRequestMethod;
    url?: string;
}
export interface UploadProgressEvent extends Partial<ProgressEvent> {
    percent?: number;
}
export interface AjaxUploaderExpose {
    abort: (file: any) => void;
}
export interface UploadRequestOption<T = any> {
    onProgress?: (event: UploadProgressEvent, file?: UploadRequestFile) => void;
    onError?: (event: UploadRequestError | ProgressEvent, body?: T) => void;
    onSuccess?: (body: T, fileOrXhr?: UploadRequestFile | XMLHttpRequest) => void;
    data?: Record<string, unknown>;
    filename?: string;
    file: UploadRequestFile;
    withCredentials?: boolean;
    action: string;
    headers?: UploadRequestHeader;
    method: UploadRequestMethod;
}
export type CustomUploadRequestOption = (option: UploadRequestOption, info: {
    defaultRequest: (option: UploadRequestOption) => {
        abort: () => void;
    } | void;
}) => void | {
    abort: () => void;
};
export interface UploadProps {
    name?: string;
    style?: CSSProperties;
    className?: string;
    disabled?: boolean;
    component?: Component | string;
    action?: Action;
    method?: UploadRequestMethod;
    directory?: boolean;
    data?: Record<string, unknown> | ((file: VcFile | string | Blob) => Record<string, unknown>);
    headers?: UploadRequestHeader;
    accept?: string | AcceptConfig;
    multiple?: boolean;
    onBatchStart?: (fileList: {
        file: VcFile;
        parsedFile: Exclude<BeforeUploadFileType, boolean> | null;
    }[]) => void;
    onStart?: (file: VcFile) => void;
    onError?: (error: Error, ret: Record<string, unknown>, file: VcFile | null) => void;
    onSuccess?: (response: Record<string, unknown>, file: VcFile | null, xhr: XMLHttpRequest) => void;
    onProgress?: (event: UploadProgressEvent, file: VcFile | null) => void;
    beforeUpload?: (file: VcFile, FileList: VcFile[]) => BeforeUploadFileType | Promise<void | BeforeUploadFileType> | void;
    customRequest?: CustomUploadRequestOption;
    withCredentials?: boolean;
    openFileDialogOnClick?: boolean;
    prefixCls?: string;
    id?: string;
    onMouseEnter?: (e: MouseEvent) => void;
    onMouseLeave?: (e: MouseEvent) => void;
    onClick?: (e: MouseEvent | KeyboardEvent) => void;
    classNames?: {
        input?: string;
    };
    styles?: {
        input?: CSSProperties;
    };
    hasControlInside?: boolean;
    pastable?: boolean;
}
