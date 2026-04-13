import { Ref } from 'vue';
import { ErrorCorrectionLevel, ImageSettings } from '../interface';
import { QrCode } from '../libs/qrcodegen';
interface Options {
    value: string | string[];
    level: ErrorCorrectionLevel;
    minVersion: number;
    includeMargin: boolean;
    marginSize?: number;
    imageSettings?: ImageSettings;
    size: number;
    boostLevel?: boolean;
}
export declare function useQRCode(ctx: Ref<Options>): import('vue').ComputedRef<{
    cells: boolean[][];
    margin: number;
    numCells: number;
    calculatedImageSettings: {
        x: number;
        y: number;
        h: number;
        w: number;
        excavation: import('..').Excavation | null;
        opacity: number;
        crossOrigin: import('..').CrossOrigin;
    } | null;
    qrcode: QrCode;
}>;
export {};
