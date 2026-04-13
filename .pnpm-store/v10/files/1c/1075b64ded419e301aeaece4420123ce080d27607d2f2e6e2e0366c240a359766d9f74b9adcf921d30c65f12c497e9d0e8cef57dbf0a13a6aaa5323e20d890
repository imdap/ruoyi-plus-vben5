import type { ChangeOptionsMode, DecodeBlindWatermarkOptions, WatermarkOptions } from '../types';
import { Watermark } from './watermark';
/**
 * BlindWatermark class
 */
declare class BlindWatermark extends Watermark {
    /**
     * BlindWatermark constructor
     * @param props - blind watermark options
     */
    constructor(props?: Partial<WatermarkOptions>);
    changeOptions(args?: Partial<WatermarkOptions>, mode?: ChangeOptionsMode, redraw?: boolean): Promise<void>;
    /**
     * Decode blind watermark.
     * @param props - decode options
     */
    static decode(props: Partial<DecodeBlindWatermarkOptions>): void;
}
export { BlindWatermark };
