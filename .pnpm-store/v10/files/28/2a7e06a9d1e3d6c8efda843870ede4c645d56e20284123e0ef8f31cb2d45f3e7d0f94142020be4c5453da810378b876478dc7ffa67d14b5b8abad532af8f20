import { Ref } from 'vue';
export interface RefObject extends Function {
    current?: any;
}
declare function createRef(): any;
export declare function fillRef<T>(ref: Ref, node: T): void;
/**
 * Merge refs into one ref function to support ref passing.
 */
export declare function composeRef<T>(...refs: any[]): (node: T) => void;
export default createRef;
