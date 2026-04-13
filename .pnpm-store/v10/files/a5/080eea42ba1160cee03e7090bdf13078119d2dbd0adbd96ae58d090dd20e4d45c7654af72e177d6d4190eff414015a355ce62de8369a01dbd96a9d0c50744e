import { VcFile } from './interface';
interface InternalDataTransferItem extends DataTransferItem {
    isFile: boolean;
    file: (cd: (file: VcFile & {
        webkitRelativePath?: string;
    }) => void) => void;
    createReader: () => any;
    fullPath: string;
    isDirectory: boolean;
    name: string;
    path: string;
}
type InternalFile = VcFile & {
    webkitRelativePath?: string;
};
declare function traverseFileTree(files: InternalDataTransferItem[], isAccepted: (file: InternalFile) => boolean): Promise<InternalFile[]>;
export default traverseFileTree;
