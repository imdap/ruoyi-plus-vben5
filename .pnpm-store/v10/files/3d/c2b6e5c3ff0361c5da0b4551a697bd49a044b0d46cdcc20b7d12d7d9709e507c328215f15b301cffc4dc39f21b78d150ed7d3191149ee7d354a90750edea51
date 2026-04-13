import { GenerateConfig } from '../generate';
import { Locale } from '../interface';
interface ValueFormatConfig<DateType> {
    generateConfig: GenerateConfig<DateType>;
    locale: Locale;
    valueFormat?: string;
}
export declare function parseValue<DateType>(value: DateType | string | null | undefined, config: ValueFormatConfig<DateType>): DateType | null | undefined;
export declare function parseValues<DateType>(values: (DateType | string | null | undefined)[] | null | undefined, config: ValueFormatConfig<DateType>): (DateType | null | undefined)[] | null | undefined;
export declare function formatValue<DateType>(value: DateType | null | undefined, config: ValueFormatConfig<DateType>): DateType | string | null | undefined;
export declare function formatValues<DateType>(values: (DateType | null | undefined)[] | null | undefined, config: ValueFormatConfig<DateType>): (string | DateType | null | undefined)[] | null | undefined;
export {};
