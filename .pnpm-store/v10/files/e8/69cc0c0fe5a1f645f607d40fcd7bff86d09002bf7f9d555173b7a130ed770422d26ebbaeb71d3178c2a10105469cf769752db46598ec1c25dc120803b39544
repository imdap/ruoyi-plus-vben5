import type { ChangeOptionsMode, WatermarkOptions } from '../types';
/**
 * Watermark class
 */
declare class Watermark {
    protected options: WatermarkOptions;
    private parentElement;
    private observer?;
    private parentObserve?;
    private watermarkDom?;
    private props?;
    private layoutCanvas?;
    private watermarkCanvas?;
    private isCreating;
    /**
     * Watermark constructor
     * @param args - watermark args
     */
    constructor(args?: Partial<WatermarkOptions>);
    /**
     * Change watermark options
     * @param args
     * @param mode
     * @param redraw
     */
    changeOptions(args?: Partial<WatermarkOptions>, mode?: ChangeOptionsMode, redraw?: boolean): Promise<void>;
    /**
     * Creating a watermark.
     */
    create(): Promise<void>;
    /**
     * Delete this watermark.
     */
    destroy(): void;
    check(): Promise<boolean>;
    protected remove(): void;
    protected initConfigData(args: Partial<WatermarkOptions>, mode?: ChangeOptionsMode): void;
    private changeParentElement;
    private validateUnique;
    private validateContent;
    private checkParentElementType;
    private bindMutationObserve;
}
export { Watermark };
