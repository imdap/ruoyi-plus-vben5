export type Comparable = number | string | boolean | undefined | null | Date;
export type ComparableFilter<T> = T extends Comparable ? T : never;
export type ComparablePropertyNames<T> = {
    [K in keyof T]: T[K] extends Comparable ? K : never;
}[keyof T];
export type ComparableProperties<T> = Pick<T, ComparablePropertyNames<T>>;
export type CompareArg<T> = ComparablePropertyNames<T> | ((t: T) => Comparable);
export type CompareFn<T> = (a: T, b: T) => number;
export declare function compareBy<T>(extract: CompareArg<T>, ...extractors: CompareArg<T>[]): CompareFn<T>;
export declare function compareBy<T>(extract: CompareArg<T>): CompareFn<T>;
export declare function compareBy<T>(extract1: CompareArg<T>, extract2: CompareArg<T>): CompareFn<T>;
export declare function compareBy<T>(extract1: CompareArg<T>, extract2: CompareArg<T>, extract3: CompareArg<T>): CompareFn<T>;
export declare function compareByRev<T>(extract: CompareArg<T>, ...extractors: CompareArg<T>[]): CompareFn<T>;
export declare function compareByRev<T>(extract: CompareArg<T>): CompareFn<T>;
export declare function compareByRev<T>(extract1: CompareArg<T>, extract2: CompareArg<T>): CompareFn<T>;
export declare function compareByRev<T>(extract1: CompareArg<T>, extract2: CompareArg<T>, extract3: CompareArg<T>): CompareFn<T>;
export declare function compareEach<T>(...compareFn: CompareFn<T>[]): CompareFn<T>;
export declare function compare<T extends Comparable>(a: T, b: T): number;
export declare function reverse<T>(fn: CompareFn<T>): CompareFn<T>;
//# sourceMappingURL=Comparable.d.ts.map