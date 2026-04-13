/**
 * String or binary
 */
type QrCodeGenerateData = string | Readonly<Array<number>>;
interface QrCodeGenerateOptions {
    /**
     * Error correction level
     *
     * L - Allows recovery of up to 7% data loss
     * M - Allows recovery of up to 15% data loss
     * Q - Allows recovery of up to 25% data loss
     * H - Allows recovery of up to 30% data loss
     *
     * @default 'L'
     */
    ecc?: 'L' | 'M' | 'Q' | 'H';
    /**
     * Mask pattern to use
     *
     * @default -1 (auto)
     */
    maskPattern?: number;
    /**
     * Boost the error correction level to the maximum allowed by the version and size
     */
    boostEcc?: boolean;
    /**
     * Minimum version of the QR code (1-40)
     * @default 1
     */
    minVersion?: number;
    /**
     * Maximum version of the QR code (1-40)
     * @default 40
     */
    maxVersion?: number;
    /**
     * Border around the QR code
     *
     * @default 1
     */
    border?: number;
    /**
     * Invert black and white
     */
    invert?: boolean;
    /**
     * Callback function to receive the generated QR Code
     */
    onEncoded?: (qr: QrCodeGenerateResult) => void;
}
declare enum QrCodeDataType {
    Border = -1,
    Data = 0,
    Function = 1,
    Position = 2,
    Timing = 3,
    Alignment = 4
}
interface QrCodeGenerateResult {
    /**
     * QR Code version
     */
    version: number;
    /**
     * Width and height of the QR Code array
     */
    size: number;
    /**
     * Mask pattern used
     */
    maskPattern: number;
    /**
     * Two dimensional array representing the QR Code
     *
     * `true` for black, `false` for white
     */
    data: boolean[][];
    /**
     * Data type of each module
     */
    types: QrCodeDataType[][];
}
interface QrCodeGenerateInvertableOptions extends QrCodeGenerateOptions {
    /**
     * Adds the option to invert the colour scheme of the QR code in addition to the standard options.
     */
    invert?: boolean;
}
interface QrCodeGenerateUnicodeOptions extends QrCodeGenerateInvertableOptions {
    /**
     * Character used to represent white modules in the QR code.
     */
    whiteChar?: string;
    /**
     * Character used to represent black modules in the QR code.
     */
    blackChar?: string;
}
interface QrCodeGenerateSvgOptions extends QrCodeGenerateOptions {
    /**
     * Size of each pixel
     *
     * @default 10
     */
    pixelSize?: number;
    /**
     * Color of the white module
     *
     * @default 'white'
     */
    whiteColor?: string;
    /**
     * Color of the black module
     *
     * @default 'black'
     */
    blackColor?: string;
}

/**
 * Encodes the given data into a QR code format according to the given options.
 * @param {QrCodeGenerateData} data - The data to encode, either as a string or an array of bytes. See {@link QrCodeGenerateData}.
 * @param {QrCodeGenerateOptions} [options] - QR Code generation configuration options. Optional. See {@link QrCodeGenerateOptions}.
 * @returns {QrCodeGenerateResult} The result of the QR code generation, including the QR code matrix. See {@link QrCodeGenerateResult}.
 */
declare function encode(data: QrCodeGenerateData, options?: QrCodeGenerateOptions): QrCodeGenerateResult;

/**
 * Renders a QR code as a string using the specified Unicode characters for dark(`█`) and light(`░`) modules.
 * @param {QrCodeGenerateData} data - The data to encode into the QR code. See {@link QrCodeGenerateData}.
 * @param {QrCodeGenerateUnicodeOptions} [options] - Rendering options, including characters for white and black modules. optional. See {@link QrCodeGenerateUnicodeOptions}.
 * Returns {string} A string representing the QR code, with each module replaced by the specified Unicode character.
 */
declare function renderUnicode(data: QrCodeGenerateData, options?: QrCodeGenerateUnicodeOptions): string;
/**
 * Renders a QR code as a string suitable for display on terminals using ANSI background colours.
 * @param {QrCodeGenerateData} data - The data to encode into the QR code. See {@link QrCodeGenerateData}.
 * @param {QrCodeGenerateOptions} [options] - Options to render the QR code. optional. See {@link QrCodeGenerateOptions}.
 * @returns {string} A string representing the QR code using ANSI colours, formatted for terminal display.
 */
declare function renderANSI(data: QrCodeGenerateData, options?: QrCodeGenerateOptions): string;
/**
 * Renders a QR code as a compact string using a combination of top half block(`▀`), bottom half block(`▄`), full block(`█`) and spaces to represent two lines in a single line.
 * @param {QrCodeGenerateData} data - The data to encode into the QR code. See {@link QrCodeGenerateData}.
 * @param {QrCodeGenerateOptions} [options] - Options to render the QR code in a compact form. optional. See {@link QrCodeGenerateOptions}.
 * @returns {string} A string representing the QR code in a compact format, using Unicode block characters to combine two lines per line.
 */
declare function renderUnicodeCompact(data: QrCodeGenerateData, options?: QrCodeGenerateOptions): string;

/**
 * Renders a QR code as an SVG string.
 * The function converts the input data into a QR code and then generates an SVG representation using the specified colours and pixel sizes.
 * @param {QrCodeGenerateData} data - The data to encode into the QR code. See {@link QrCodeGenerateData}.
 * @param {QrCodeGenerateSvgOptions} [options] - Options to render the QR code in SVG format, including pixel size and colours for modules. optional. See {@link QrCodeGenerateSvgOptions}.
 * @returns {string} An SVG string representing the QR code.
 */
declare function renderSVG(data: QrCodeGenerateData, options?: QrCodeGenerateSvgOptions): string;

export { QrCodeDataType, encode, renderANSI, renderSVG, renderUnicode, renderUnicodeCompact };
export type { QrCodeGenerateData, QrCodeGenerateInvertableOptions, QrCodeGenerateOptions, QrCodeGenerateResult, QrCodeGenerateSvgOptions, QrCodeGenerateUnicodeOptions };
