//#region src/form/namePathType.d.ts
type BaseNamePath = string | number | boolean | (string | number | boolean)[];
/**
 * Store: The store type from `FormInstance<Store>`
 * ParentNamePath: Auto generate by nest logic. Do not fill manually.
 */
type DeepNamePath<Store = any, ParentNamePath extends any[] = []> = ParentNamePath['length'] extends 5 ? never : true extends (Store extends BaseNamePath ? true : false) ? ParentNamePath['length'] extends 0 ? Store | BaseNamePath : Store extends any[] ? [...ParentNamePath, number] : never : Store extends any[] ? [...ParentNamePath, number] | DeepNamePath<Store[number], [...ParentNamePath, number]> : keyof Store extends never ? Store : { [FieldKey in keyof Store]: Store[FieldKey] extends Function ? never : (ParentNamePath['length'] extends 0 ? FieldKey : never) | [...ParentNamePath, FieldKey] | DeepNamePath<Required<Store>[FieldKey], [...ParentNamePath, FieldKey]> }[keyof Store];
//#endregion
export { DeepNamePath };