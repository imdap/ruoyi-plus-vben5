/**
  * vee-validate v4.15.1
  * (c) 2025 Abdelrahman Awad
  * @license MIT
  */
var VeeValidateZod = (function (exports, zod, veeValidate) {
    'use strict';

    const isObject = (obj) => obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj);
    function isIndex(value) {
        return Number(value) >= 0;
    }
    function isObjectLike(value) {
        return typeof value === 'object' && value !== null;
    }
    function getTag(value) {
        if (value == null) {
            return value === undefined ? '[object Undefined]' : '[object Null]';
        }
        return Object.prototype.toString.call(value);
    }
    // Reference: https://github.com/lodash/lodash/blob/master/isPlainObject.js
    function isPlainObject(value) {
        if (!isObjectLike(value) || getTag(value) !== '[object Object]') {
            return false;
        }
        if (Object.getPrototypeOf(value) === null) {
            return true;
        }
        let proto = value;
        while (Object.getPrototypeOf(proto) !== null) {
            proto = Object.getPrototypeOf(proto);
        }
        return Object.getPrototypeOf(value) === proto;
    }
    function merge(target, source) {
        Object.keys(source).forEach(key => {
            if (isPlainObject(source[key]) && isPlainObject(target[key])) {
                if (!target[key]) {
                    target[key] = {};
                }
                merge(target[key], source[key]);
                return;
            }
            target[key] = source[key];
        });
        return target;
    }
    /**
     * Constructs a path with dot paths for arrays to use brackets to be compatible with vee-validate path syntax
     */
    function normalizeFormPath(path) {
        const pathArr = path.split('.');
        if (!pathArr.length) {
            return '';
        }
        let fullPath = String(pathArr[0]);
        for (let i = 1; i < pathArr.length; i++) {
            if (isIndex(pathArr[i])) {
                fullPath += `[${pathArr[i]}]`;
                continue;
            }
            fullPath += `.${pathArr[i]}`;
        }
        return fullPath;
    }

    /**
     * Transforms a Zod object schema to Yup's schema
     */
    function toTypedSchema(zodSchema, opts) {
        const schema = {
            __type: 'VVTypedSchema',
            async parse(value) {
                const result = await zodSchema.safeParseAsync(value, opts);
                if (result.success) {
                    return {
                        value: result.data,
                        errors: [],
                    };
                }
                const errors = {};
                processIssues(result.error.issues, errors);
                return {
                    errors: Object.values(errors),
                };
            },
            cast(values) {
                try {
                    return zodSchema.parse(values);
                }
                catch (_a) {
                    // Zod does not support "casting" or not validating a value, so next best thing is getting the defaults and merging them with the provided values.
                    const defaults = getDefaults(zodSchema);
                    if (isObject(defaults) && isObject(values)) {
                        return merge(defaults, values);
                    }
                    return values;
                }
            },
            describe(path) {
                try {
                    if (!path) {
                        return {
                            required: !zodSchema.isOptional(),
                            exists: true,
                        };
                    }
                    const description = getSchemaForPath(path, zodSchema);
                    if (!description) {
                        return {
                            required: false,
                            exists: false,
                        };
                    }
                    return {
                        required: !description.isOptional(),
                        exists: true,
                    };
                }
                catch (_a) {
                    return {
                        required: false,
                        exists: false,
                    };
                }
            },
        };
        return schema;
    }
    function processIssues(issues, errors) {
        issues.forEach(issue => {
            const path = normalizeFormPath(issue.path.join('.'));
            if (issue.code === 'invalid_union') {
                processIssues(issue.unionErrors.flatMap(ue => ue.issues), errors);
                if (!path) {
                    return;
                }
            }
            if (!errors[path]) {
                errors[path] = { errors: [], path };
            }
            errors[path].errors.push(issue.message);
        });
    }
    // Zod does not support extracting default values so the next best thing is manually extracting them.
    // https://github.com/colinhacks/zod/issues/1944#issuecomment-1406566175
    function getDefaults(schema) {
        if (!(schema instanceof zod.ZodObject)) {
            return undefined;
        }
        return Object.fromEntries(Object.entries(schema.shape).map(([key, value]) => {
            if (value instanceof zod.ZodDefault) {
                return [key, value._def.defaultValue()];
            }
            if (value instanceof zod.ZodObject) {
                return [key, getDefaults(value)];
            }
            return [key, undefined];
        }));
    }
    /**
     * @deprecated use toTypedSchema instead.
     */
    const toFieldValidator = toTypedSchema;
    /**
     * @deprecated use toTypedSchema instead.
     */
    const toFormValidator = toTypedSchema;
    function getSchemaForPath(path, schema) {
        if (!isObjectSchema(schema)) {
            return null;
        }
        if (veeValidate.isNotNestedPath(path)) {
            return schema.shape[veeValidate.cleanupNonNestedPath(path)];
        }
        const paths = (path || '').split(/\.|\[(\d+)\]/).filter(Boolean);
        let currentSchema = schema;
        for (let i = 0; i <= paths.length; i++) {
            const p = paths[i];
            if (!p || !currentSchema) {
                return currentSchema;
            }
            if (isObjectSchema(currentSchema)) {
                currentSchema = currentSchema.shape[p] || null;
                continue;
            }
            if (isIndex(p) && isArraySchema(currentSchema)) {
                currentSchema = currentSchema._def.type;
            }
        }
        return null;
    }
    function getDefType(schema) {
        return schema._def.typeName;
    }
    function isArraySchema(schema) {
        return getDefType(schema) === zod.ZodFirstPartyTypeKind.ZodArray;
    }
    function isObjectSchema(schema) {
        return getDefType(schema) === zod.ZodFirstPartyTypeKind.ZodObject;
    }

    exports.toFieldValidator = toFieldValidator;
    exports.toFormValidator = toFormValidator;
    exports.toTypedSchema = toTypedSchema;

    return exports;

})({}, zod, VeeValidate);
