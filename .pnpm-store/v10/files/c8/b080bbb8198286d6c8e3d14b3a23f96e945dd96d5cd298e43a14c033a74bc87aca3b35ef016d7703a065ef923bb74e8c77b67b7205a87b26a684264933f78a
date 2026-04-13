import type { WatermarkOptions } from '../types';
declare class WatermarkCanvas {
    private readonly options;
    private readonly props?;
    private readonly canvas;
    recommendOptions: {
        image: {
            rect: {
                width: number;
                height: number;
            };
            position: {
                x: number;
                y: number;
            };
        };
        textLine: {
            data: string[];
            yOffsetValue: number;
        };
        advancedStyleParams: import("../types").AdvancedStyleParamsType;
    };
    constructor(args: Partial<WatermarkOptions>, options: WatermarkOptions);
    /**
     * Create an HD canvas.
     * @param width - width of canvas
     * @param height - height of canvas
     */
    static createCanvas(width: number, height: number): HTMLCanvasElement;
    /**
     * Clean the canvas
     * @param canvas
     */
    static clearCanvas(canvas: HTMLCanvasElement): void;
    getCanvas(): HTMLCanvasElement;
    clear(): void;
    draw(): Promise<HTMLCanvasElement>;
    private setStyle;
    private createLinearGradient;
    private createConicGradient;
    private createRadialGradient;
    private createPattern;
    private setText;
    private drawText;
    private drawImage;
    private drawMultiLineText;
    private drawRichText;
    private getImageRect;
    private getDrawImagePosition;
}
export { WatermarkCanvas };
