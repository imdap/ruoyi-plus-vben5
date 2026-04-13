import { VueNode } from '@v-c/util/dist/type';
import { Status, StepItem, StepsProps } from './Steps';
export interface StepProps {
    prefixCls?: string;
    classNames: StepsProps['classNames'];
    styles: StepsProps['styles'];
    data: StepItem;
    nextStatus?: Status;
    active?: boolean;
    index: number;
    last: boolean;
    iconRender?: StepsProps['iconRender'];
    icon?: VueNode;
    itemRender?: StepsProps['itemRender'];
    itemWrapperRender?: StepsProps['itemWrapperRender'];
    onClick?: (index: number) => void;
}
declare const Step: import('vue').DefineSetupFnComponent<StepProps, {}, {}, StepProps & {}, import('vue').PublicProps>;
export default Step;
