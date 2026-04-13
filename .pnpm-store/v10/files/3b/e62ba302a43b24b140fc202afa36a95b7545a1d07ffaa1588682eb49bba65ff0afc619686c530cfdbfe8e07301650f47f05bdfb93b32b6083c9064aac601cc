# Installation
> `npm install --save @types/json-bigint`

# Summary
This package contains type definitions for json-bigint (https://github.com/sidorares/json-bigint#readme).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/json-bigint.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/json-bigint/index.d.ts)
````ts
declare const stringify: typeof JSON.stringify;
declare const parse: typeof JSON.parse;

declare function JSONBig(options?: Options): { parse: typeof parse; stringify: typeof stringify };

interface Options {
    /**
     * @default false
     */
    strict?: boolean | undefined;
    /**
     * @default false
     */
    storeAsString?: boolean | undefined;
    /**
     * @default false
     */
    alwaysParseAsBig?: boolean | undefined;
    /**
     * @default false
     */
    useNativeBigInt?: boolean | undefined;
    /**
     * @default 'error'
     */
    protoAction?: "error" | "ignore" | "preserve" | undefined;
    /**
     * @default 'error'
     */
    constructorAction?: "error" | "ignore" | "preserve" | undefined;
}

type JSONBigExport = typeof JSONBig & { parse: typeof parse; stringify: typeof stringify };

declare const _: JSONBigExport;
export = _;

````

### Additional Details
 * Last updated: Tue, 07 Nov 2023 03:09:37 GMT
 * Dependencies: none

# Credits
These definitions were written by [yamachu](https://github.com/yamachu).
