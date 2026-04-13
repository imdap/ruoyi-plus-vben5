import { InternalUploadFile, UploadFile, VcFile } from "./interface.js";

//#region src/upload/utils.d.ts
declare function file2Obj(file: VcFile): InternalUploadFile;
/** Upload fileList. Replace file if exist or just push into it. */
declare function updateFileList(file: UploadFile, fileList: (UploadFile | Readonly<UploadFile>)[]): (UploadFile<any> | Readonly<UploadFile<any>>)[];
declare function getFileItem(file: VcFile, fileList: (UploadFile | Readonly<UploadFile>)[]): UploadFile<any> | Readonly<UploadFile<any>> | undefined;
declare function removeFileItem(file: UploadFile, fileList: (UploadFile | Readonly<UploadFile>)[]): (UploadFile<any> | Readonly<UploadFile<any>>)[] | null;
declare function isImageUrl(file: UploadFile): boolean;
declare function previewImage(file: File | Blob): Promise<string>;
//#endregion
export { file2Obj, getFileItem, isImageUrl, previewImage, removeFileItem, updateFileList };