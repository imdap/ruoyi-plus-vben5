export interface InputHTMLAttributesType {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    type?: string;
    title?: string;
    onChange?: (e: Event) => void;
    value?: any;
}
export interface CheckboxChangeEvent {
    target: CheckboxChangeEventTarget;
    stopPropagation: () => void;
    preventDefault: () => void;
    nativeEvent: any;
}
export interface CheckboxChangeEventTarget extends CheckboxProps {
    checked: boolean;
}
export interface CheckBoxInstance {
    focus: () => void;
    blur: () => void;
    input: HTMLInputElement | null;
    nativeElement: HTMLDivElement | null;
}
export interface CheckboxProps extends Omit<InputHTMLAttributesType, 'onChange'> {
    'prefixCls'?: string;
    'onChange'?: (e: CheckboxChangeEvent) => void;
    'onUpdate:checked'?: (value: boolean) => void;
}
export declare const Checkbox: import('vue').DefineSetupFnComponent<CheckboxProps, {}, {}, CheckboxProps & {}, import('vue').PublicProps>;
export default Checkbox;
