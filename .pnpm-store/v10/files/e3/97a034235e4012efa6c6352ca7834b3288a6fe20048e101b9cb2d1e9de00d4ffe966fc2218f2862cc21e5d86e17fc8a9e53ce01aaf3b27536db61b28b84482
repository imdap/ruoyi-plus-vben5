import type { ImageWatermarkOptions } from '../types';
/**
 * ImageWatermark class
 */
declare class ImageWatermark {
    private readonly options;
    private readonly props?;
    private watermarkCanvas?;
    private layoutCanvas?;
    private readonly originalSrc?;
    private readonly backgroundImage?;
    private drew;
    /**
     * ImageWatermark constructor
     * @param args - image watermark args
     */
    constructor(args?: Partial<ImageWatermarkOptions>);
    create(): Promise<void>;
    destroy(): void;
    private getBackgroundImage;
}
export { ImageWatermark };
