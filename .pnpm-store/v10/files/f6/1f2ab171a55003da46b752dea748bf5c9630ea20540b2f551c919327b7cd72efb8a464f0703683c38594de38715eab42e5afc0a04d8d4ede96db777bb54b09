import { CSSProperties } from 'vue';
export interface MarkObj {
    style?: CSSProperties;
    label?: any;
}
export interface InternalMarkObj extends MarkObj {
    value: number;
}
export interface MarksProps {
    prefixCls: string;
    marks?: InternalMarkObj[];
    onClick?: (value: number) => void;
}
declare const Marks: import('vue').DefineSetupFnComponent<MarksProps, {}, {}, MarksProps & {}, import('vue').PublicProps>;
export default Marks;
