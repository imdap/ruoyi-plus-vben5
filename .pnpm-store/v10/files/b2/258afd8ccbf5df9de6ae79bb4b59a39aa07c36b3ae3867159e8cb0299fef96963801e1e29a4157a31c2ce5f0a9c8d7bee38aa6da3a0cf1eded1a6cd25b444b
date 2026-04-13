import { CSSMotionProps } from '@v-c/util/dist/utils/transition';
import { FlattenNode, TreeNodeProps } from './interface';
import { TreeNodeRequiredProps } from './utils/treeUtil';
export interface MotionTreeNodeProps extends Omit<TreeNodeProps, 'domRef'> {
    active?: boolean;
    motion?: CSSMotionProps;
    motionNodes?: FlattenNode[] | null;
    motionType?: 'show' | 'hide' | null;
    onMotionStart?: () => void;
    onMotionEnd?: () => void;
    treeNodeRequiredProps: TreeNodeRequiredProps;
    treeId?: string;
}
declare const MotionTreeNode: import('vue').DefineSetupFnComponent<MotionTreeNodeProps, {}, {}, MotionTreeNodeProps & {}, import('vue').PublicProps>;
export default MotionTreeNode;
