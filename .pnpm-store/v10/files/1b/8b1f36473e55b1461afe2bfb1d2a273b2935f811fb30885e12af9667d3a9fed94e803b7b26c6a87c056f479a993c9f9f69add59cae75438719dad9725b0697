/**
  * JavaScript 函数库、工具类
  * @version 3.9.1
  */
declare namespace XEUtils {




export interface SetupDefaults {
  /**
   * 全局唯一标识
   */
  keyId?: number
  /**
   * 默认树的转换配置
   * 用于 toArrayTree()、toTreeArray()
   */
  treeOptions?: {
    strict?: boolean;
    parentKey?: string;
    key?: string;
    children?: string;
    data?: string;
    [key: string]: any;
  };
  /**
   * 默认解析的日期格式
   * 用于 toDateString()
   */
  parseDateFormat?: string;
  /**
   * 默认格式化日期的规则
   * 用于 toDateString()
   */
  parseDateRules?: ToDateStringFormats;
  /**
   * 默认周视图的起始天
   * 用于 getWhatWeek()、getYearWeek()、toDateString()
   */
  firstDayOfWeek?: FirstDayOfWeek;
  /**
   * 分隔函数配置
   * 用于 commafy()
   */
  commafyOptions?: CommafyOptions;

  /**
   * 已被 parseDateRules 替换
   * @deprecated
   */
  formatStringMatchs?: any;
  /**
   * 已被 parseDateFormat 替换
   * @deprecated
   */
  formatString?: string;
  [key: string]: any;
}





/**
 * 版本信息
 */
export const version: string

/**
 * 设置全局配置
 * @param options 全局参数
 */
export function setConfig(options: SetupDefaults): SetupDefaults;

/**
 * 获取全局配置
 */
export function getConfig(): SetupDefaults;

export const VERSION: string
export function setup(options: SetupDefaults): SetupDefaults;

/**
 * 将您自己的实用函数扩展到 XEUtils
 * @param methods 函数集
 */
export function mixin(...methods: {[key: string]: any}[]): void;

export interface XEUtilsMethods {
  version: typeof version;
  setConfig: typeof setConfig;
  getConfig: typeof getConfig;
  mixin: typeof mixin;

  VERSION: typeof VERSION;
  setup: typeof setup;

  [propertys: string]: any;
}

/**
 * JavaScript 函数库、工具类
 */
declare let XEUtils: XEUtilsMethods



/**
 * 将一个或多个源对象复制到目标对象中
 * @param target 目标对象
 * @param source1 要从中复制属性的源对象
*/
export function assign<T, U>(target: T, source1: U): T & U;

/**
 * 将一个或多个源对象复制到目标对象中
 * @param target 目标对象
 * @param source1 要从中复制属性的源对象1
 * @param source2 要从中复制属性的源对象2
*/
export function assign<T, U, V>(target: T, source1: U, source2: V): T & U & V;

/**
 * 将一个或多个源对象复制到目标对象中
 * @param target 目标对象
 * @param source1 要从中复制属性的源对象1
 * @param source2 要从中复制属性的源对象2
 * @param source3 要从中复制属性的源对象3
*/
export function assign<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;

/**
 * 将一个或多个源对象复制到目标对象中
 * @param target 目标对象
 * @param sources 要从中复制属性的一个或多个源对象
*/
export function assign(target: any, ...sources: any[]): any;






/**
 * 指定方法后的返回值组成的新对象
 * @param obj 对象
 * @param iterate 回调
 * @param context 上下文
 */
export function objectMap<T, U>(obj: T, iterate: (item: any, key: string, obj: T) => U, context ?: any): U;
export function objectMap<U>(obj: any, iterate: (item: any, key: string, obj: any) => U, context ?: any): U;






/**
 * 对象迭代器
 * @param obj 对象
 * @param iterate 回调
 * @param context 上下文
 */
export function objectEach<T>(obj: T, iterate: (item: any, key: string, obj: T) => void, context ?: any): void;
export function objectEach(obj: any, iterate: (item: any, key: string, obj: any) => void, context ?: any): void;





/**
 * 对象迭代器,从最后开始迭代
 * @param obj 对象
 * @param iterate 回调
 * @param context 上下文
 */
export function lastObjectEach<T, C = any>(obj: T, iterate: (this: C, item: any, key: string, obj: T) => void, context?: C): void;
export function lastObjectEach<C = any>(obj: any, iterate: (this: C, item: any, key: string, obj: any) => void, context?: C): void;





/**
 * 将一个或多个源对象合并到目标对象中
 * @param target 目标对象
 * @param source1 要从中复制属性的源对象1
*/
export function merge<T, U>(target: T, source1: U): T & U;
/**
 * 将一个或多个源对象合并到目标对象中
 * @param target 目标对象
 * @param source1 要从中复制属性的源对象1
 * @param source2 要从中复制属性的源对象2
*/
export function merge<T, U, V>(target: T, source1: U, source2: V): T & U & V;

/**
 * 将一个或多个源对象合并到目标对象中
 * @param target 目标对象
 * @param source1 要从中复制属性的源对象1
 * @param source2 要从中复制属性的源对象2
 * @param source3 要从中复制属性的源对象3
*/
export function merge<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;

/**
 * 将一个或多个源对象合并到目标对象中
 * @param target 目标对象
 * @param sources 要从中复制属性的多个源对象
*/
export function merge(target: any, ...sources: any[]): any;





/**
 * 数组去重
 * @param list 数组
 * @param iterate 回调/对象属性
 * @param context 上下文
 */
export function uniq<T, C = any>(list: T[], iterate?: string | number | ((this: C, item: T, index: number, obj: T[]) => string | number), context?: C): T[];
export function uniq<C = any>(list: any, iterate?: string | number | ((this: C, item: any, index: number, obj: any) => string | number), context?: C): any[];





/**
 * 将多个数的值返回唯一的并集数组
 * @param array 数组
 */
export function union(...array: any[]): any[];







/**
 * 被 orderBy 替换
 * @deprecated
 */
export const sortBy: typeof orderBy





interface OrderBySortConfs<T, C> {
  field?: string | ((this: C, item: T, index: number, list: T[]) => any) | null;
  order?: 'asc' | 'desc' | null;
}

export type OrderByFieldConfs<T, C> = null | string | any[][] | OrderBySortConfs<T, C> | (string | OrderBySortConfs<T, C>)[] | ((this: C, item: T, index: number, list: T[]) => any);

/**
 * 将数组进行排序
 * @param array 数组
 * @param fieldConfs 排序规则
 * @param context 上下文
 */
export function orderBy<T, C = any>(array: T[], fieldConfs: OrderByFieldConfs<T, C>, context?: C): T[];





/**
 * 将一个数组随机打乱，返回一个新的数组
 * @param list 数组
  */
export function shuffle<T>(list: T[]): T[];





/**
 * 从一个数组中随机返回几个元素
 * @param array 数组
 * @example
 */
export function sample<T>(array: T[]): T;

/**
 * 从一个数组中随机返回几个元素
 * @param array 数组
 * @param number 返回个数
 * @example
 */
export function sample<T>(array: T[], number: number): T[];





/**
 * 对象中的值中的每一项运行给定函数,如果函数对任一项返回 true,则返回 true,否则返回 false
 * @param list 数组
 * @param iterate 回调
 * @param context 上下文
 */
export function some<T>(list: T[], iterate: (item: T, index: number, list: T[]) => boolean, context?: any): boolean;






/**
 * 对象中的值中的每一项运行给定函数,如果该函数对每一项都返回 true,则返回 true,否则返回 false
 * @param list 数组
 * @param iterate 回调
 * @param context 上下文
 */
export function every<T, C = any>(list: T[], iterate: (this: C, item: T, index: number, list: T[]) => boolean, context?: C): boolean;

/**
 * 对象中的值中的每一项运行给定函数,如果该函数对每一项都返回 true,则返回 true,否则返回 false
 * @param list 数组
 * @param iterate 回调
 * @param context 上下文
 */
export function every<T, C = any>(list: T, iterate: (this: C, item: any, key: string, list: T) => boolean, context?: C): boolean;





/**
 * slice ( array, start, end ) 裁剪 Arguments 或数组 array，从 start 位置开始到 end 结束，但不包括 end 本身的位置
 * @param array 对象
 * @param start 迭代器/属性
 * @param end 上下文
 */
export function slice<T>(array: T[], start: number, end?: number): T[];






/**
 * 查找匹配第一条数据
 * @param array 数组
 * @param iterate 回调
 * @param context 上下文
 */
export function filter<T, C = any>(array: T[], iterate: (this: C, item: T, index: number, list: T[]) => boolean, context?: C): T[];

/**
 * 查找匹配第一条数据
 * @param obj 数组
 * @param iterate 回调
 * @param context 上下文
 */
export function filter<T, C = any>(obj: T, iterate: (this: C, item: any, key: string, list: T) => boolean, context?: C): any;





/**
 * 从左至右遍历，匹配最近的一条数据
 * @param array 数组
 * @param iterate 回调
 * @param context 上下文
 */
export function find<T, C = any>(list: T[], iterate: (this: C, item: T, index: number, list: T[]) => boolean, context?: C): T;

/**
 * 从左至右遍历，匹配最近的一条数据
 * @param obj 对象
 * @param iterate 回调
 * @param context 上下文
 */
export function find<T, C = any>(obj: T, iterate: (this: C, item: any, key: string, obj: T) => boolean, context?: C): any;





/**
 * 从右至左遍历，匹配最近的一条数据
 * @param array 数组
 * @param iterate 回调
 * @param context 上下文
 */
export function findLast<T, C = any>(array: T[], iterate: (this: C, item: T, index: number, list: T[]) => boolean, context?: C): T;

/**
 * 从右至左遍历，匹配最近的一条数据
 * @param obj 对象
 * @param iterate 回调
 * @param context 上下文
 */
export function findLast<T, C = any>(obj: T, iterate: (this: C, item: any, key: string, obj: T) => boolean, context?: C): any;





/**
 * 查找匹配第一条数据的键
 * @param list 数组
 * @param iterate 回调
 * @param context 上下文
 */
export function findKey<T, C = any>(list: T[], iterate: (this: C, item: T, index: number, list: T[])=> boolean, context?: C): number;

/**
 * 查找匹配第一条数据的键
 * @param obj 对象
 * @param iterate 回调
 * @param context 上下文
 */
export function findKey<T, C = any>(obj: T, iterate: (this: C, item: any, key: string, obj: T)=> boolean, context?: C): any;





/**
 * 判断对象是否包含该值,成功返回 true 否则 false
 * @param obj 对象
 * @param val 值
 */
export function includes(obj: any, val: any): boolean;





/**
 * 返回数组第一个索引值
 * @param list 数组
 * @param val 值
 */
export function arrayIndexOf<T>(list: ArrayLike<T>, val: any): number;
export function arrayIndexOf(list: any[], val: any): number;





/**
 * 从最后开始的索引值,返回数组第一个索引值
 * @param list 数组
 * @param val 值
 */
export function arrayLastIndexOf<T>(list: ArrayLike<T>, val: any): number;
export function arrayLastIndexOf(list: any[], val: any): number;





/**
 * 指定方法后的返回值组成的新数组
 * @param list 数组
 * @param iterate 回调
 * @param context 上下文
 */
export function map<T, U, C = any>(list: T[], iterate: (this: C, item: T, index: number, list: T[]) => U, context?: C): U[];






/**
 * 接收一个函数作为累加器，数组中的每个值（从左到右）开始合并，最终为一个值
 * @param array 数组
 * @param iterate 回调
 * @param initialValue 默认值
 * @example
 */
export function reduce<T, U>(array: T[], iterate?: (previous: U, item: T, index: number, list: T[]) => U, initialValue?: U): U;





/**
 * 复制数组的一部分到同一数组中的另一个位置,数组大小不变
 * @param array 数组
 * @param target 从该位置开始替换数据
 */
export function copyWithin<T>(array: T[], target: number): T[];

/**
 * 复制数组的一部分到同一数组中的另一个位置,数组大小不变
 * @param array 数组
 * @param target 从该位置开始替换数据
 * @param start 从该位置开始读取数据，默认为 0 。如果为负值，表示倒数
 * @param end 到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数
 */
export function copyWithin<T>(array: T[], target: number, start: Number, end?: number): T[];





/**
 * 将一个数组分割成大小的组。如果数组不能被平均分配，那么最后一块将是剩下的元素
 * @param array 数组
 * @param size 每组大小
 */
export function chunk<T>(array: T[] | undefined, size: number): T[][];





/**
 * 将每个数组中相应位置的值合并在一起
 * @param arrays 多个数组
 */
export function zip(...arrays: any[]): any[];





/**
 * 与 zip 相反
 * @param arrays 数组
 */
export function unzip(arrays: any[]): any[];





/**
 * 将每个数组中相应位置的值合并在一起
 * @param props 键数组
 * @param values 值数组
 * @example
 */
export function zipObject(props: any[], values: any[]): any;





/**
 * 将一个多维数组铺平
 * @param list 数组
 * @param deep 是否深层
 */
export function flatten<T>(list: T[][], deep?: boolean): T[];

/**
 * 将一个多维数组铺平
 * @param list 数组
 * @param deep 是否深层
 */
export function flatten(list: any[], deep?: boolean): any[];





/**
 * 将对象或者伪数组转为新数组
 * @param list 对象/数组
 */
export function toArray<T>(list: T[]): T[];
export function toArray(list: any): any[];





/**
 * 判断数组是否包含另一数组
 * @param array1 数组
 * @param array2 数组
 */
export function includeArrays(array1: any[], array2: any[]): boolean;





/**
 * 获取数组对象中某属性值，返回一个数组
 * @param array 数组
 * @param key 键
 * @example
 */
export function pluck(array: any[], key: string | number): any[];





/**
 * 在list的每个元素上执行方法,任何传递的额外参数都会在调用方法的时候传递给它
 * @param list 数组
 * @param path
 * @example
 */
export function invoke(list: any[], path: string[] | string | ((this: any, ...args: any[]) => any)): any[];





/**
 * 数组迭代器
 * @param list 对象
 * @param iterate 回调
 * @param context 上下文
 */
export function arrayEach<T, C = any>(list: T[] | ArrayLike<T>, iterate: (this: C, item: T, index: number, list: T[]) => void, context?: C): void;
export function arrayEach<C = any>(obj: any[], iterate: (this: C, item: any, index: number, obj: any) => void, context?: C): void;





/**
 * 数组迭代器,从最后开始迭代
 * @param list 对象
 * @param iterate 回调
 * @param context 上下文
 */
export function lastArrayEach<T, C = any>(list: T[], iterate: (this: C, item: T, index: number, list: T[]) => void, context?: C): void;
export function lastArrayEach<T, C = any>(list: T, iterate: (this: C, item: any, index: number, list: T) => void, context?: C): void;
export function lastArrayEach<C = any>(list: any[], iterate: (this: C, item: any, index: number, list: any[]) => void, context?: C): void;
export function lastArrayEach<C = any>(list: any, iterate: (this: C, item: any, index: number, list: any) => void, context?: C): void;







export interface ToArrayTreeOptions<T> {
  strict?: boolean;
  key?: string;
  parentKey?: string;
  children?: string;
  mapChildren?: string;
  sortKey?: OrderByFieldConfs<T, any>;
  data?: string;
  /**
   * 已废弃，被 sortKey: { ...,order: 'desc' } 替换
   * @deprecated
   */
  reverse?: boolean;
}

/**
 * 将一个带层级的数据列表转成树结构
 * @param {Array} list 数组
 * @param {Object} options {strict: false, parentKey: 'parentId', key: 'id', children: 'children', mapChildren: '', data: 'data'}
 */
export function toArrayTree<T>(list: T[], options?: ToArrayTreeOptions<T>): T[];
export function toArrayTree(list: any, options?: ToArrayTreeOptions<any>): any[];





export interface ToTreeArrayOptions {
  key?: string;
  parentKey?: string;
  children?: string;
  data?: string;
  updated?: boolean
  clear?: boolean;
}

/**
 * 将一个树结构转成数组列表
 * @param {Array} list 数组
 * @param {Object} options { key: 'id', parentKey: 'parentId', children: 'children', data: 'data', clear: false }
 */
export function toTreeArray<T>(list: T[], options?: ToTreeArrayOptions): T[];
export function toTreeArray(list: any, options?: ToTreeArrayOptions): any[];





export interface FindTerrResult<T = any> {
  index: number;
  item: T;
  path: Array<string>;
  items: T[];
  parent: T;
  nodes: T[];
}

export interface FindTreeOptions {
  children?: string;
}

/**
 * 从树结构中查找匹配第一条数据的键、值、路径
 * @param {Object} list 数组
 * @param {Function} iterate(item, index, items, path, parent, nodes) 回调
 * @param {Object} options {children: 'children'}
 * @param {Object} context 上下文
 */
export function findTree<T, C = any>(list: T[], iterate: (this: C, item: T, index: number, items: T[], path: string[], parent: T, nodes: T[]) => boolean, options?: FindTreeOptions, context?: C): FindTerrResult<T>;





export interface EachTreeOptions {
  children?: string;
}

/**
 * 从树结构中遍历数据的键、值、路径
 * @param {Object} list 数组
 * @param {Function} iterate(item, index, items, path, parent, nodes) 回调
 * @param {Object} options {children: 'children'}
 * @param {Object} context 上下文
 */
export function eachTree<T, C = any>(list: T[], iterate: (this: C, item: T, index: number, items: T[], path: string[], parent: T, nodes: T[]) => void, options?: EachTreeOptions, context?: C): void;
export function eachTree<C = any>(list: any[], iterate: (this: C, item: any, index: number, items: any[], path: string[], parent: any, nodes: any[]) => void, options?: EachTreeOptions, context?: C): void;
export function eachTree<C = any>(list: any, iterate: (this: C, item: any, index: number, items: any, path: string[], parent: any, nodes: any) => void, options?: EachTreeOptions, context?: C): void;





export interface MapTreeOptions {
  children?: string;
  mapChildren?: string;
}

/**
 * 从树结构中指定方法后的返回值组成的新数组
 * @param {Object} obj 对象/数组
 * @param {Function} iterate(item, index, items, path, parent, nodes) 回调
 * @param {Object} options {children: 'children', mapChildren: 'children}
 * @param {Object} context 上下文
 */
export function mapTree<T, U, C = any>(array: T[], iterate: (this: C, item: T, index: number, items: T[], path: string[], parent: T, nodes: T[]) => U, options?: MapTreeOptions, context?: C): U[];
export function mapTree<U, C = any>(array: any[], iterate: (this: C, item: any, index: number, items: any[], path: string[], parent: any, nodes: any[]) => U, options?: MapTreeOptions, context?: C): U[];
export function mapTree<U, C = any>(array: any, iterate: (this: C, item: any, index: number, items: any, path: string[], parent: any, nodes: any) => U, options?: MapTreeOptions, context?: C): U[];






export interface FilterTreeOptions {
  children?: string;
}

/**
 * 从树结构中根据回调过滤数据
 * @param {Object} list 数组
 * @param {Function} iterate(item, index, items, path, parent) 回调
 * @param {Object} options {children: 'children'}
 * @param {Object} context 上下文
 */
export function filterTree<T, C = any>(list: T[], iterate: (this: C, item: T, index: number, items: T[], path: string[], parent: T, nodes: T[]) => boolean, options?: FilterTreeOptions, context?: C): T[];





export interface SearchTreeOptions {
  isEvery?: boolean
  children?: string;
  mapChildren?: string;
  original?: boolean;
  data?: string;
}

/**
 * 从树结构中根据回调查找数据
 * @param {Object} list 对象/数组
 * @param {Function} iterate(item, index, items, path, parent, nodes) 回调
 * @param {Object} options {children: 'children'}
 * @param {Object} context 上下文
 */
export function searchTree<T>(list: T[], iterate: (item: T, index: number, items: T[], path: string[], parent: T, nodes: T[]) => boolean, options?: SearchTreeOptions, context?: any): T[];
export function searchTree(list: any[], iterate: (item: any, index: number, items: any[], path: string[], parent: any, nodes: any[]) => boolean, options?: SearchTreeOptions, context?: any): any[];
export function searchTree(list: any, iterate: (item: any, index: number, items: any, path: string, parent: any, nodes: any) => boolean, options?: SearchTreeOptions, context?: any): any[];





/**
 * 判断对象自身属性中是否具有指定的属性
 * @param obj 对象
 * @param key 键值
 */
export function hasOwnProp(obj: any, key: string | number): boolean;





/**
 * 判断是否 undefined 和 null
 * @param obj 对象
 */
export function eqNull(obj: any): obj is null | undefined;





/**
 * 判断是否非数值
 * @param val 值
 */
export function isNaN(val: any): boolean;





/**
 * 判断是否为有限数值
 * @param val 值
 */
export function isFinite(val: any): val is number;





/**
 * 判断 Undefined
 * @param val 值
 */
export function isUndefined(val: any): val is undefined;





/**
 * 判断是否数组
 * @param val 值
 */
export function isArray(val: any): val is any[];





/**
 * 判断是否小数
 * @param val 值
 */
export function isFloat(val: any): val is number;





/**
 * 判断是否整数
 * @param val 值
 */
export function isInteger(val: any): val is number;





/**
 * 判断是否方法
 * @param val 值
 */
export function isFunction(val: any): val is Function;





/**
 * 判断是否 Boolean 对象
 * @param val 值
 */
export function isBoolean(val: any): val is boolean;





/**
 * 判断是否String对象
 * @param val 值
 */
export function isString(val: any): val is string;





/**
 * 判断是否 Number 对象
 * @param val 值
 */
export function isNumber(val: any): val is number;





/**
 * 判断是否 RegExp 对象
 * @param val 值
 */
export function isRegExp(val: any): val is RegExp;





/**
 * 判断是否 Object 对象
 * @param val 值
 */
export function isObject(val: any): val is object;





/**
 * 判断是否是一个对象
 * @param val 值
 */
export function isPlainObject(val: any): val is object;





/**
 * 判断是否 Date 对象
 * @param val 值
 */
export function isDate(val: any): val is Date;





/**
 * 判断是否 Error 对象
 * @param val 值
 */
export function isError(val: any): val is Error;





/**
 * 判断是否 TypeError 对象
 * @param val 值
 */
export function isTypeError(val: any): val is TypeError;





/**
 * 判断是否为空对象
 * @param val 值
 */
export function isEmpty(val: any): boolean;





/**
 * 判断是否为 Null
 * @param val 值
 */
export function isNull(val: any): val is null;





/**
 * 判断是否 Symbol 对象
 * @param val 值
 */
export function isSymbol(val: any): val is symbol;





/**
 * 判断是否 Arguments 对象
 * @param val 值
 */
export function isArguments(val: any): val is IArguments;





/**
 * 判断是否 Element 对象
 * @param val 值
 */
export function isElement(val: any): val is Element;





/**
 * 判断是否 Document 对象
 * @param val 值
 */
export function isDocument(val: any): val is Document;





/**
 * 判断是否 Window 对象
 * @param val 值
 */
export function isWindow(val: any): val is Window;





/**
 * 判断是否 FormData 对象
 * @param val 值
 */
export function isFormData(val: any): val is FormData;





/**
 * 判断是否 Map 对象
 * @param val 值
 */
export function isMap(val: any): val is Map<any, any>;





/**
 * 判断是否 WeakMap 对象
 * @param val 值
 */
export function isWeakMap(val: any): val is WeakMap<any, any>;





/**
 * 判断是否 Set 对象
 * @param val 值
 */
export function isSet(val: any): val is Set<any>;





/**
 * 判断是否 WeakSet 对象
 * @param val 值
 */
export function isWeakSet(val: any): val is WeakSet<any>;





/**
 * 判断是否闰年
 * @param date 日期
 */
export function isLeapYear(date: Date | number | string): boolean;
export function isLeapYear(date: any): boolean;





/**
 * 判断属性中的键和值是否包含在对象中
 * @param obj 对象
 * @param source 值
 */
export function isMatch(obj: any, source: any): boolean;





/**
 * 深度比较两个对象之间的值是否相等
 * @param obj1 值1
 * @param obj2 值2
 */
export function isEqual(obj1: any, obj2: any): boolean;





/**
 * 深度比较两个对象之间的值是否相等，使用自定义比较函数
 * @param obj1 值1
 * @param obj2 值2
 */
export function isEqualWith(obj1: any, obj2: any): boolean;

/**
 * 深度比较两个对象之间的值是否相等，使用自定义比较函数
 * @param obj1 值1
 * @param obj2 值2
 * @param func 自定义函数
 */
export function isEqualWith<T, U>(obj1: T, obj2: U, func: (val1: any, val2: any, key: any, obj1: T, obj2: U) => any): boolean;





/**
 * 获取对象类型
 * @param obj 对象
 */
export function getType(obj: any): string;





/**
 * 获取一个全局唯一标识
 * @param prefix 自定义前缀
 */
export function uniqueId(prefix?: string | number | null | undefined): string;





/**
 * 返回对象的长度
 * @param obj 对象
 */
export function getSize(obj: any): number;





/**
 * 返回对象第一个索引值
 * @param obj 对象
 * @param val 值
 */
export function indexOf(obj: any, val: any): number;





/**
 * 从最后开始的索引值,返回对象第一个索引值
 * @param obj 对象
 * @param val 值
 */
export function lastIndexOf(obj: any[], val: any): number;
export function lastIndexOf(obj: any, val: any): number;





/**
 * 返回对象第一个索引值
 * @param list 数组
 * @param iterate 迭代器
 * @param context 上下文
 */
export function findIndexOf<T, C = any>(list: T[], iterate: (this: C, item: T, index: any, obj: T[]) => boolean, context?: C): number;

/**
 * 返回对象第一个索引值
 * @param obj 对象
 * @param iterate 迭代器
 * @param context 上下文
 */
export function findIndexOf<T, C = any>(obj: T, iterate: (this: C, item: any, key: string, obj: T) => boolean, context?: C): number;





/**
 * 从最后开始的索引值,返回对象第一个索引值
 * @param list 数组
 * @param iterate 迭代器
 * @param context 上下文
 */
export function findLastIndexOf<T, C = any>(list: T[], iterate: (this: C, item: T, index: number, list: T[]) => boolean, context?: C): number;

/**
 * 从最后开始的索引值,返回对象第一个索引值
 * @param obj 对象
 * @param iterate 迭代器
 * @param context 上下文
 */
export function findLastIndexOf<C = any>(obj: any, iterate: (this: C, item: any, key: string, obj: any) => boolean, context?: C): number;





/**
 * 字符串转 JSON
 * @param str 字符串
 */
export function toStringJSON(str: string | null | undefined): any;
export function toStringJSON(str: any): any;





/**
 * JSON 转字符串
 * @param obj 对象
 */
export function toJSONString(obj: any): string;





/**
 * 获取对象所有属性
 * @param obj 对象
 */
export function keys(obj: any): string[];





/**
 * 获取对象所有值
 * @param obj 对象
 */
export function values<T>(obj: { [s: string]: T } | T[]): T[];
export function values(obj: any): any[];





/**
 * 获取对象所有属性、值
 * @param obj 对象
 */
export function entries(obj: any): any[];





/**
 * 根据 keys 过滤指定的属性值，返回一个新的对象
 * @param obj 对象
 * @param array 数组或字符串或方法
 */
export function pick(obj: any, array: string[]): any;





/**
 * 根据 keys 排除指定的属性值，返回一个新的对象
 * @param obj 对象
 * @param array 数组或字符串或方法
 */
export function omit(obj: any, array: string[]): any;





/**
 * 获取对象第一个值
 * @param list 数组
 */
export function first<T>(list: T[] | ArrayLike<T>): T;
export function first(obj: any): any;





/**
 * 获取对象最后一个值
 * @param list 数组
 */
export function last<T>(list: T[] | ArrayLike<T>): T;

/**
 * 获取对象最后一个值
 * @param obj 对象
 */
export function last(obj: any): any;





/**
 * 通用迭代器
 * @param list 对象
 * @param iterate 回调
 * @param context 上下文
 */
export function each<T, C = any>(list: T[] | ArrayLike<T>, iterate: (this: C, item: T, index: number, list: T[]) => void, context?: CSSKeyframeRule): void;

/**
 * 通用迭代器
 * @param obj 对象
 * @param iterate 回调
 * @param context 上下文
 */
export function each<T, C = any>(obj: T, iterate: (this: C, item: any, key: string, obj: T) => void, context?: C): void;





/**
 * 已废弃，被 some, every 替换
 * @deprecated
 */
export function forOf<C = any>(obj: any, iterate: (this: C, item: any, index: any, obj: any) => boolean, context?: C): void;





/**
 * 已废弃
 * @deprecated
 */
export function lastForOf<C = any>(obj: any, iterate: (this: C, item: any, index: any, obj: any) => boolean, context?: C): void;





/**
 * 通用迭代器,从最后开始迭代
 * @param list 对象
 * @param iterate 回调
 * @param context 上下文
 */
export function lastEach<T, C = any>(list: T[], iterate: (this: C, item: T, index: number, list: T) => void, context?: C): void;
export function lastEach<T, C = any>(obj: T, iterate: (this: C, item: any, key: string, obj: T) => void, context?: C): void;
export function lastEach<C = any>(obj: any[], iterate: (this: C, item: any, key: string, obj: any[]) => void, context?: C): void;
export function lastEach<C = any>(obj: any, iterate: (this: C, item: any, key: string, obj: any) => void, context?: C): void;





/**
 * 检查键、路径是否是该对象的属性
 * @param obj 对象
 * @param property 键、路径
 */
export function has(obj: any, property: undefined | null | number | number[] | string | string[]): boolean;





/**
 * 获取对象的属性的值，如果值为 undefined，则返回默认值
 * @param obj 对象
 * @param property 键、路径
 * @param defaultValue 默认值
 */
export function get<T extends object, K extends keyof T>(obj: T, property: undefined | null | number | number[] | string | string[], defaultValue?: any): T[K];
export function get(obj: any, property: undefined | null | number | number[] | string | string[], defaultValue?: any): any;





/**
 * 设置对象属性上的值。如果属性不存在则创建它
 * @param obj 对象
 * @param property 键、路径
 * @param value 值
 */
export function set(obj: any, property: string | string[], value: any): any;





/**
 * 集合分组,默认使用键值分组,如果有 iterate 则使用结果进行分组
 * @param list 对象
 * @param iterate 回调/对象属性
 * @param context 上下文
 */
export function groupBy<T, C = any>(list: T[], iterate: string | number | ((this: C, item: T, index: number, obj: T[]) => string | number), context?: C): { [key: string]: T[] };

/**
 * 集合分组,默认使用键值分组,如果有 iterate 则使用结果进行分组
 * @param obj 对象
 * @param iterate 回调/对象属性
 * @param context 上下文
 */
export function groupBy<T, C = any>(obj: T, iterate: string | number | ((this: C, item: any, key: string, obj: T) => string | number), context?: C): { [key: string]: any[] };





/**
 * 集合分组统计,返回各组中对象的数量统计
 * @param list 对象
 * @param iterate 回调/属性
 * @param context 上下文
 */
export function countBy<T, C = any>(list: T[], iterate: string | number | ((this: C, item: T, index: number, list: T[]) => string | number), context?: C): { [key: string]: number };

/**
 * 集合分组统计,返回各组中对象的数量统计
 * @param obj 对象
 * @param iterate 回调/属性
 * @param context 上下文
 */
export function countBy<T, C = any>(obj: T, iterate: string | number | ((this: C, item: any, key: string, obj: T) => string | number), context?: C): { [key: string]: number };





/**
 * 浅拷贝/深拷贝
 * @param obj 对象
 */
export function clone<T>(obj: T): T;

/**
 * 浅拷贝/深拷贝
 * @param obj 对象
 * @param deep 是否深拷贝
 */
export function clone<T>(obj: T, deep: boolean): T;





/**
 * 清空对象; defs如果不传（清空所有属性）、如果传对象（清空并继承)、如果传值(给所有赋值)
 * @param obj 对象
 */
export function clear<T>(obj: T): T;

/**
 * 清空对象; defs如果不传（清空所有属性）、如果传对象（清空并继承)、如果传值(给所有赋值)
 * @param obj 对象
 * @param defs 默认值
 */
export function clear<T>(obj: T, defs: any): T;

/**
 * 清空对象; defs如果不传（清空所有属性）、如果传对象（清空并继承)、如果传值(给所有赋值)
 * @param obj 对象
 * @param defs 默认值
 * @param assigns 值
 */
export function clear<T, U>(obj: T, defs: any, assigns: U): T & U;





/**
 * 移除对象属性
 * @param list 对象
 * @param iterate 迭代器/值
 */
export function remove<T, C>(list: T[], iterate: number | string | ((this: C, item: T, index: number, list: T[]) => boolean), context?: C): T[];

/**
 * 移除对象属性
 * @param obj 对象
 * @param iterate 迭代器/值
 */
export function remove<C>(obj: any, iterate: number | string | ((this: C, item: any, key: string, obj: any) => boolean), context?: C): any;





/**
 * 序号列表生成函数
 * @param start 起始值
 * @param stop 结束值
 */
export function range(start: number, stop: number): number[];

/**
 * 序号列表生成函数
 * @param start 起始值
 * @param stop 结束值
 * @param step 自增值
 */
export function range(start: number, stop: number, step: number): number[];





/**
 * 将一个或者多个对象值解构到目标对象
 * @param obj 对象
 * @param target 目标
 */
export function destructuring<T>(obj: T, ...target: any[]): T;





/**
 * 获取一个指定范围内随机数
 * @param min 最小值
 * @param max 最大值
 */
export function random(min: number, max: number): number;





/**
 * 获取最小值
 * @param array 数组
 * @param iterate 回调/属性
 */
export function min<T>(list: T[], iterate?: string | number | ((item: T, index: number, list: T[]) => number | string)): T | null | undefined;





/**
 * 获取最大值
 * @param list 数组
 * @param iterate 回调/属性
 */
export function max<T>(list: T[], iterate?: string | number | ((item: T, index: number, list: T[]) => number | string)): T | null | undefined;





export interface CommafyOptions {
  /**
   * 分割位数，默认3
   */
  spaceNumber?: number;
  /**
   * 分隔符，默认','
   */
  separator?: string;
  /**
   * 只对 number 类型有效，小数位数,默认null
   */
  digits?: number;
  /**
   * 只对 number 类型有效，四舍五入，默认true
   */
  round?: boolean;
  /**
   * 只对 number 类型有效，向上舍入
   */
  ceil?: boolean;
  /**
   * 只对 number 类型有效，向下舍入
   */
  floor?: boolean;
}

/**
 * 数值千分位分隔符、小数点
 * @param num 数值/字符串
 * @param options 可选参数
 */
export function commafy(num: string | number, options?: CommafyOptions): string;





/**
 * 对数字进行四舍五入
 * @param num 数值/字符串
 * @param digits 小数保留位数
 */
export function round(num: number, digits?: number): number;
export function round(num: any, digits?: number): number;





/**
 * 将数值向上舍入
 * @param num 数值/字符串
 */
export function ceil(num: string | number): number;

/**
 * 将数值向上舍入
 * @param num 数值/字符串
 * @param digits 小数保留位数
 */
export function ceil(num: string | number, digits: number): number;





/**
 * 将数值向下舍入
 * @param num 数值/字符串
 * @param digits 小数保留位数
 */
export function floor(num: string | number, digits?: number): number;





/**
 * 将数值四舍五入并格式化为固定小数位的字符串
 * @param num 数值/字符串
 * @param digits 小数保留位数
 */
export function toFixed(num: number | string | null, digits?: number): string;
export function toFixed(num: any, digits?: number): string;





/**
 * 转数值
 * @param num 数值/字符串
 */
export function toNumber(num: number | string | null | undefined): number;
export function toNumber(num: any): number;





/**
 * 数值转字符串，科学计数转字符串
 * @param num 数值
 */
export function toNumberString(num: number | string | null | undefined): string;
export function toNumberString(num: any): string;





/**
 * 转整数
 * @param num 数值/字符串
 */
export function toInteger(num: number | string | null): number;
export function toInteger(num: any): number;





/**
 * 加法运算
 * @param num1 数值1
 * @param num2 数值2
 */
export function add(num1: number, num2: number): number;





/**
 * 减法运算
 * @param num1 数值1
 * @param num2 数值2
 */
export function subtract(num1: number, num2: number): number;
export function subtract(num1: any, num2: any): number;





/**
 * 乘法运算
 * @param num1 数值1
 * @param num2 数值2
 */
export function multiply(num1: number, num2: number): number;
export function multiply(num1: any, num2: any): number;





/**
 * 除法运算
 * @param num1 数值1
 * @param num2 数值2
 */
export function divide(num1: number, num2: number): number;





/**
 * 求和函数，将数值相加
 * @param obj 对象/数组
 * @param iterate 回调
 * @param context 上下文
 */
export function sum<T, C = any>(obj: T[], iterate?: string | number | ((this: C, item: T, index: number, list: T[]) => number), context?: C): number;





/**
 * 求平均值函数
 * @param array 对象/数组
 * @param iterate 回调
 * @param context 上下文
 */
export function mean<T>(obj: T[], iterate?: string | number | ((item: T, index: number, list: T[]) => any), context?: any): number;





/**
 * 返回当前时间戳
 */
export function now(): number;





/**
 * 将日期转为时间戳
 * @param date 字符串/日期/时间戳
 * @param format 解析格式 yyyy MM dd HH mm ss SSS
 */
export function timestamp(date: string | Date | number, format?: string | null | undefined): number;
export function timestamp(date: any, format?: string | null | undefined): number;





/**
 * 判断是否有效的Date对象
 * @param val 值
 */
export function isValidDate(val: any): val is Date;





/**
 * 判断两个日期是否相同
 * @param date1 日期
 * @param date2 日期
 * @param format 对比格式
 */
export function isDateSame(date1: Date | number | string, date2: Date | number | string, format?: string | null): boolean;
export function isDateSame(date1: any, date2: any, format?: string | null): boolean;





/**
 * 任意格式字符串转为日期
 * @param str 字符串/日期/时间戳
 */
export function toStringDate(str: string | Date | number | null | undefined): Date;
export function toStringDate(str: any): Date;

/**
 * 任意格式字符串转为日期
 * @param str 字符串/日期/时间戳
 * @param format 解析格式 yyyy MM dd HH mm ss SSS
 */
export function toStringDate(str: string | Date | number | null | undefined, format: string | null | undefined): Date;
export function toStringDate(str: any, format: string | null | undefined): Date;







export type ToDateStringFormats = {
  /**
   * 用于格式化季度
   * 例如：[null, '第一季度', '第二季度', '第三季度', '第四季度']
   */
  q?: string[] | {
    1: string
    2: string
    3: string
    4: string
  } | ((value: string | number, match: string, date: Date) => string);
  /**
   * 用于格式化周
   * 例如：['日', '一', '二', '三', '四', '五', '六']
   */
  E?: string[] | {
    0: string
    1: string
    2: string
    3: string
    4: string
    5: string
    6: string
  } | ((value: string | number, match: string, date: Date) => string);
}

export interface ToDateStringOptions {
  /**
   * 默认周视图的起始天
   */
  firstDay?: FirstDayOfWeek;
  /**
   * 自定义格式化模板
   */
  formats?: ToDateStringFormats
}

/**
 * 日期格式化为任意格式字符串，转义符号 []
 * @param date 字符串/日期/时间戳
 */
export function toDateString(date: string | Date | number): string;
export function toDateString(date: any): string;

/**
 * 日期格式化为任意格式字符串，转义符号 []
 * @param date 字符串/日期/时间戳
 * @param format 格式化 默认：yyyy-MM-dd HH:mm:ss.SSS
 */
export function toDateString(date: string | Date | number, format: string | null | undefined): string;
export function toDateString(date: any, format: string | null | undefined): string;

/**
 * 日期格式化为任意格式字符串，转义符号 []
 * @param date 字符串/日期/时间戳
 * @param format 格式化 默认：yyyy-MM-dd HH:mm:ss.SSS
 * @param options 可选参数
 */
export function toDateString(date: string | Date | number, format: string | null | undefined, options: ToDateStringOptions): string;
export function toDateString(date: any, format: string | null | undefined, options: ToDateStringOptions): string;





/**
 * 返回前几年或后几年的日期
 * @param date 字符串/日期/时间戳
 * @param year 年(默认当前年)、前几个年(数值)、后几个年(数值)
 */
export function getWhatYear(date: string | Date | number, offset: number): Date;

/**
 * 返回前几年或后几年的日期，可以指定年初(first)、年末(last)、月份(0~11)，默认当前
 * @param date 字符串/日期/时间戳
 * @param year 年(默认当前年)、前几个年(数值)、后几个年(数值)
 * @param month 获取哪月：年初(first)、年末(last)、指定月份（0-11）
 */
export function getWhatYear(date: string | Date | number, offset: number, month: number | 'first' | 'last'): Date;





/**
 * 返回前几季度或后几季度的日期
 * @param date 字符串/日期/时间戳
 * @param offset 季度偏移量(默认0)、前几个季度、后几个季度
 */
export function getWhatQuarter(date: string | Date | number, offset: number): Date;

/**
 * 返回前几季度或后几季度的日期，可以指定月初(first)、月末(last)、天数，默认当前
 * @param date 字符串/日期/时间戳
 * @param offset 季度偏移量(默认当前季度)、前几个季度、后几个季度
 * @param day 获取哪天：月初(first)、月末(last)、指定天数(数值)
 */
export function getWhatQuarter(date: string | Date | number, offset: number, day: number | 'first' | 'last'): Date;





/**
 * 返回前几月或后几月的日期
 * @param date 字符串/日期/时间戳
 * @param offsetMonth 月偏移量(默认0)、前几个月、后几个月
 */
export function getWhatMonth(date: string | Date | number, offset: number): Date;

/**
 * 返回前几月或后几月的日期，可以指定月初(first)、月末(last)、天数，默认当前
 * @param date 字符串/日期/时间戳
 * @param offsetMonth 月偏移量(默认默认当前月)、前几个月、后几个月
 * @param offsetDay 获取哪天：月初(first)、月末(last)、指定天数(数值)
 */
export function getWhatMonth(date: string | Date | number, offset: number, day: number | 'first' | 'last'): Date;





export type FirstDayOfWeek = 0 | 1 | 2 | 3 | 4 |5 | 6

/**
 * 返回前几周或后几周的日期
 * @param date 字符串/日期/时间戳
 * @param offsetWeek 周偏移量(默认当前周)、前几周、后几周
 */
export function getWhatWeek(date: string | Date | number, offsetWeek?: FirstDayOfWeek): Date;

/**
 * 返回前几周或后几周的日期,可以指定星期几(0~6)，默认当前
 * @param date 字符串/日期/时间戳
 * @param offsetWeek 获取周偏移量（默认0当前周、前几周、后几周）
 * @param offsetDay 获取星期几（星期天0、星期一1、星期二2、星期三3、星期四4、星期五5、星期六6）
 * @param firstDay 周视图的起始天，默认星期一
 */
export function getWhatWeek(date: string | Date | number, offsetWeek?: number, offsetDay?: FirstDayOfWeek, firstDay?: FirstDayOfWeek): Date;





/**
 * 返回前几天或后几天的日期
 * @param date 字符串/日期/时间戳
 * @param offset 指定小时(null默认当前分)、0时(first)、23时(last)
 */
export function getWhatDay(date: string | Date | number, offset: number): Date;

/**
 * 返回前几天或后几天的日期
 * @param date 字符串/日期/时间戳
 * @param offset 天偏移量(默认0)、前几天、后几天
 * @param mode 指定小时(null默认当前分)、0时(first)、23时(last)
 */
export function getWhatDay(date: string | Date | number, offset: number, mode: 'first' | 'last'): Date;





/**
 * 返回前几小时或后几小时的日期
 * @param date 字符串/日期/时间戳
 * @param offset 小时偏移量(默认0)、前几小时、后几小时
 */
export function getWhatHours(date: string | Date | number, offset: number): Date;

/**
 * 返回前几小时或后几小时的日期
 * @param date 字符串/日期/时间戳
 * @param offset 小时偏移量(默认0)、前几小时、后几小时
 * @param mode 指定分钟(null默认当前分)、0分(first)、59分(last)
 */
export function getWhatHours(date: string | Date | number, offset: number, mode: 'first' | 'last'): Date;





/**
 * 返回前几分钟或后几分钟的日期
 * @param date 字符串/日期/时间戳
 * @param offset 分钟偏移量(默认0)、前几分钟、后几分钟
 */
export function getWhatMinutes(date: string | Date | number, offset: number): Date;

/**
 * 返回前几分钟或后几分钟的日期
 * @param date 字符串/日期/时间戳
 * @param offset 分钟偏移量(默认0)、前几分钟、后几分钟
 * @param mode 指定秒(null默认当前秒)、0秒(first)、59秒(last)
 */
export function getWhatMinutes(date: string | Date | number, offset: number, mode: 'first' | 'last'): Date;





/**
 * 返回前几秒或后几秒的日期
 * @param date 字符串/日期/时间戳
 * @param offset 秒偏移量(默认0)、前几秒、后几秒
 */
export function getWhatSeconds(date: string | Date | number, offset: number): Date;

/**
 * 返回前几秒或后几秒的日期
 * @param date 字符串/日期/时间戳
 * @param offset 秒偏移量(默认0)、前几秒、后几秒
 * @param mode 指定毫秒(null默认当前毫秒)、0毫秒(first)、59毫秒(last)
 */
export function getWhatSeconds(date: string | Date | number, offset: number, mode: 'first' | 'last'): Date;





/**
 * 返回某个年份的第几天
 * @param date 字符串/日期/时间戳
 */
export function getYearDay(date: string | Date | number): number;







/**
 * 返回某个年份的第几周
 * @param date 字符串/日期/时间戳
 * @param firstDay 从年初的星期几为起始开始周开始算，默认星期一
 */
export function getYearWeek(date: string | Date | number, firstDay?: FirstDayOfWeek): number;







/**
 * 返回某个月份的第几周
 * @param date 字符串/日期/时间戳
 * @param firstDay 周视图的起始天，默认星期一
 */
export function getMonthWeek(date: string | Date | number, firstDay?: FirstDayOfWeek): number;





/**
 * 返回某个年份的天数,可以指定前几个年或后几个年，默认当前
 * @param date 字符串/日期/时间戳
 * @param offset 年偏移量(默认0)、前几个年、后几个年
 */
export function getDayOfYear(date: string | Date | number, offset: number): Date;





/**
 * 返回某个月份的天数,可以指定前几个月或后几个月，默认当前
 * @param date 字符串/日期/时间戳
 * @param offset 月偏移量(默认0)、前几个月、后几个月
 */
export function getDayOfMonth(date: string | Date | number, offset: number): number;





export interface DateDiffResult {
  /**
   * 是否计算完成（如果结束日期小于开始日期 status 为 fasle）
   */
  status: boolean;
  /**
   * 已废弃，请使用 status
   * @deprecated
   */
  done: boolean;
  /**
   * 相差多少毫秒
   */
  time: Number;
  /**
   * 年
   */
  yyyy: number;
  /**
   * 月
   */
  MM: number;
  /**
   * 日
   */
  dd: number;
  /**
   * 时
   */
  HH: number;
  /**
   * 分
   */
  mm: number;
  /**
   * 秒
   */
  ss: number;
  /**
   * 毫秒
   */
  S: number;
}

/**
 * 返回两个日期之间差距,如果结束日期小于开始日期 done 为 fasle
 * @param startDate 开始日期
 * @param endDate 结束日期或当期日期
 */
export function getDateDiff(startDate: string | Date | number, endDate: string | Date | number): DateDiffResult;

/**
 * 返回两个日期之间差距,如果结束日期小于开始日期 done 为 fasle
 * @param startDate 开始日期
 * @param endDate 结束日期或当期日期
 */
export function getDateDiff(startDate: string | Date | number, endDate: string | Date | number): DateDiffResult;





/**
 * 去除字符串左右两边的空格
 * @param str 字符串
 */
export function trim(str: string): string;
export function trim(str: any): string;





/**
 * 去除字符串左边的空格
 * @param str 字符串
 */
export function trimLeft(str: string): string;
export function trimLeft(str: any): string;





/**
 * 去除字符串右边的空格
 * @param str 字符串
 */
export function trimRight(str: string): string;
export function trimRight(str: any): string;





/**
 * 转义HTML字符串，替换&, <, >, ", ', \`字符
 * @param str 字符串
 */
export function escape(str: string): string;





/**
 * 反转 escape
 * @param str 字符串
 */
export function unescape(str: string): string;
export function unescape(str: any): string;





/**
 * 将带字符串转成驼峰字符串,例如： project-name 转为 projectName
 * @param str 字符串
 */
export function camelCase(str: string): string;





/**
 * 将带驼峰字符串转成字符串,例如： projectName 转为 project-name
 * @param str 字符串
 */
export function kebabCase(str: string): string;
export function kebabCase(str: any): string;





/**
 * 将字符串重复 n 次
 * @param str 字符串
 * @param count 次数
 */
export function repeat(str: string, count: number): string;
export function repeat(str: any, count: number): string;





/**
 * 用指定字符从前面开始补全字符串
 * @param str 字符串
 * @param targetLength 结果长度
 * @param padString 补全字符
 */
export function padStart(str: string, targetLength: number, padString?: string): string;
export function padStart(str: any, targetLength: number, padString?: any): string;





/**
 * 用指定字符从后面开始补全字符串
 * @param str 字符串
 * @param targetLength 结果长度
 * @param padString 补全字符
 */
export function padEnd(str: string, targetLength: number, padString?: string): string;
export function padEnd(str: any, targetLength: number, padString?: any): string;





/**
 * 判断字符串是否在源字符串的头部
 * @param str 字符串
 * @param val 值
 * @param startIndex 开始索引
 */
export function startsWith(str: number | string | null, val: string, startIndex?: number): string;





/**
 * 判断字符串是否在源字符串的头部
 * @param str 字符串
 * @param val 值
 */
export function endsWith(str: string, val: string): string;

/**
 * 判断字符串是否在源字符串的头部
 * @param str 字符串
 * @param val 值
 * @param startIndex 开始索引
 */
export function endsWith(str: string, val: string, startIndex: number): string;





/**
 * 解析动态字符串模板
 * @param str 字符串模板
 * @param args 对象
 */
export function template(str: string, args: any | any[]): string;
export function template(str: any, args: any | any[]): string;
export function template(str: string, args: any | any[], options: { tmplRE?: RegExp }): string;
export function template(str: any, args: any | any[], options: { tmplRE?: RegExp }): string;





/**
 * 字符串格式化占位符
 * @param { string } str 
 * @param { object | any[] } obj 
 */
export function toFormatString(str: string | null, list: any[]): string;
export function toFormatString(str: any, obj: any): string;





/**
 * 转字符串
 * @param obj 值
 */
export function toString(obj: any): string;





/**
 * 转字符串
 * @param obj 值
 */
 export function toValueString(obj: number | string | any[] | null | undefined): string;
 export function toValueString(obj: any): string;
 
 


/**
 * 返回一个获取对象属性的函数
 * @param path 键值
 */
export function property(path: string | null): Function;





/**
 * 创建一个绑定上下文的函数
 * @param callback 回调
 * @param context 上下文
 * @param params 额外的参数
 */
export function bind<C = any>(callback: (this: C, ...args: any[]) => any, context?: C, ...params: any[]): (this: any, ...args: any[]) => any;





/**
 * 创建一个只能调用一次的函数,只会返回第一次执行后的结果
 * @param callback 回调
 * @param context 上下文
 * @param params 额外的参数
 */
export function once<S, C = any>(callback: (this: S, ...args: any[]) => any, context?: C, ...params: any[]): (this: S | C, ...args: any[]) => any;





/**
 * 创建一个函数, 调用次数超过 count 次之后执行回调并将所有结果记住后返回
 * @param count 次数
 * @param callback 回调
 * @param context 上下文
 */
export function after<C = any>(count: number, callback: (this: C, ...args: any[]) => any, context?: C): (this: any,...args: any[]) => any;





/**
 * 创建一个函数, 调用次数不超过 count 次之前执行回调并将所有结果记住后返回
 * @param count 次数
 * @param callback 回调
 * @param context 上下文
 */
export function before<C = any>(count: number, callback: (this: C, rests: any[], ...args: any[]) => any, context?: C): (this: any, ...args: any[]) => any;





export interface ThrottleOptions {
  /**
   * 是否在之前执行
   */
  leading?: boolean;
  /**
   * 是否在之后执行
   */
  trailing?: boolean;
}

/**
 * 节流函数；当被调用 n 毫秒后才会执行，如果在这时间内又被调用则至少每隔 n 秒毫秒调用一次该函数
 * @param callback 回调
 * @param wait 毫秒
 * @param options 可选参数
 */
export function throttle<C = any>(callback: (this: C, ...args: any[]) => any, wait: number, options?: ThrottleOptions): (this: C, ...args: any[]) => any;





export interface DebounceOptions {
  /**
   * 是否在之前执行
   */
  leading?: boolean;
  /**
   * 是否在之后执行
   */
  trailing?: boolean;
}

/**
 * 函数去抖；当被调用 n 毫秒后才会执行，如果在这时间内又被调用则将重新计算执行时间
 * @param callback 回调
 * @param wait 毫秒
 * @param options 可选参数
 */
export function debounce<C = any>(callback: (this: C, ...args: any[]) => any, wait: number, options?: DebounceOptions): (this: C, ...args: any[]) => any;





/**
 * 该方法和 setTimeout 一样的效果，区别就是支持上下文和额外参数
 * @param callback 回调
 * @param wait 延迟毫秒
 * @param params 额外的参数
 */
export function delay(callback: (...args: any[]) => any, wait: number, ...params: any[]): number;





export interface XEUrl {
  /**
   * 获取完整的地址
   */
  href: string;
  /**
   * 获取 #Hash 的完整字符串
   */
  hash: string;
  /**
   * 获取主机信息
   */
  host: string;
  /**
   * 主机主机名
   */
  hostname: string;
  /**
   * 获取地址的协议类型
   */
  protocol: string;
  /**
   * 获取端口信息
   */
  port: string;
  /**
   * 查询字符串
   */
  search: string;
  /**
   * 获取路径字符串
   */
  pathname: string;
  /**
   * 获取 #hash 键值
   */
  origin: string;
  /**
   * 获取 #hash 键值，不包括参数
   */
  hashKey: string;
  /**
   * 获取 #hash 对象参数
   */
  hashQuery: any;
  /**
   * 获取查询对象参数
   */
  searchQuery: any;
}

/**
 * 解析 URL 参数
 * @param ulr 字符串
 */
export function parseUrl(ulr: string): XEUrl;
export function parseUrl(ulr: any): XEUrl;





/**
 * 序列化查询参数
 * @param query 查询参数
 */
export function serialize(query: any): string;





/**
 * 反序列化查询参数
 * @param str 字符串
 */
export function unserialize(str: string): any;
export function unserialize(str: any): any;





/**
 * 获取上下文路径
 */
export function getBaseURL(): string;







/**
 * 获取地址栏信息
 */
export function locat(): XEUrl;





export interface XEBrowse {
  /**
   * 判断是否 NodeJs 环境
   */
  isNode: boolean;
  /**
   * 判断是否有 document 元素
   */
  isDoc: boolean;
  /**
   * 判断是否 Edge 浏览器
   */
  edge: boolean;
  /**
   * 判断是否 Firefox 浏览器
   */
  firefox: boolean;
  /**
   * 判断是否 IE 浏览器
   */
  msie: boolean;
  /**
   * 判断是否 Safari 浏览器
   */
  safari: boolean;
  /**
   * 判断是否移动端
   */
  isMobile: boolean;
  /**
   * 判断是否 PC 端
   */
  isPC: boolean;
  /**
   * 判断浏览器是否支持 LocalStorage
   */
  isLocalStorage: boolean;
  /**
   * 判断浏览器是否支持 SessionStorage
   */
  isSessionStorage: boolean;
  /**
   * 判断浏览器是否 -webkit 内核
   */
  '-webkit': boolean;
  /**
   * 判断浏览器是否 -moz 内核
   */
  '-moz': boolean;
  /**
   * 判断浏览器是否 -ms 内核
   */
  '-ms': boolean;
  /**
   * 判断浏览器是否 -o 内核
   */
  '-o': boolean;
}

/**
 * 获取浏览器信息
 */
export function browse(): XEBrowse;





export interface CookieOptions {
  /**
   * 键
   */
  name?: string;
  /**
   * 值
   */
  value?: string;
  /**
   * 路径
   */
  path?: string;
  /**
   * 作用域
   */
  domain?: string;
  /**
   * 设置为安全的,只能用https协议
   */
  secure?: string;
  /**
   * 过期时间,可以指定日期或者字符串，默认天
   */
  expires?: string;
}

/**
 * Cookie 操作函数
 */
export function CookieFunc(): XECookie;

/**
 * Cookie 操作函数
 * @param name 键/数组/对象
 */
export function CookieFunc(name: string): XECookie;

/**
 * Cookie 操作函数
 * @param name 键/数组/对象
 * @param value 值
 */
export function CookieFunc(name: string, value: any): XECookie;

/**
 * Cookie 操作函数
 * @param name 键/数组/对象
 * @param value 值
 * @param options 可选参数
 */
export function CookieFunc(name: string, value: any, options: CookieOptions): XECookie;

export type XECookie = typeof CookieFunc & {
  /**
   * 根据 name 判断 Cookie 是否存在
   * @param name 键
   */
  has(name: string): boolean;

  /**
   * 添加 Cookie
   * @param name 键
   * @param value 值
   * @param options 可选参数
   */
  set(name: string, value: any, options?: CookieOptions): XECookie;

  /**
   * 根据 name 获取 Cookie
   * @param name 键
   */
  get(name: string): string;

  /**
   * 根据 name 删除 Cookie
   * @param name 键
   * @param options 可选参数
   */
  remove(name: string, options?: CookieOptions): number;

  /**
   * 获取 Cookie 所有键
   */
  keys(): any[];

  /**
   * 获取所有 Cookie
   */
  getJSON(): any;
}

export const cookie: XECookie





}
