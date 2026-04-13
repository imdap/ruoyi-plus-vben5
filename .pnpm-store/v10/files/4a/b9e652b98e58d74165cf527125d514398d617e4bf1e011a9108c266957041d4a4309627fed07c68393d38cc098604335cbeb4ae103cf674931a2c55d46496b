export interface Unit<ValueType = number | string> {
    label: any;
    value: ValueType;
    disabled?: boolean;
}
export interface TimeColumnProps {
    units: Unit[];
    value?: number | string;
    optionalValue?: number | string;
    type: 'hour' | 'minute' | 'second' | 'millisecond' | 'meridiem';
    onChange: (value: number | string) => void;
    onHover: (value: number | string) => void;
    onDblClick?: VoidFunction;
    changeOnScroll?: boolean;
}
declare const TimeColumn: import('vue').DefineSetupFnComponent<TimeColumnProps, {}, {}, TimeColumnProps & {}, import('vue').PublicProps>;
export default TimeColumn;
