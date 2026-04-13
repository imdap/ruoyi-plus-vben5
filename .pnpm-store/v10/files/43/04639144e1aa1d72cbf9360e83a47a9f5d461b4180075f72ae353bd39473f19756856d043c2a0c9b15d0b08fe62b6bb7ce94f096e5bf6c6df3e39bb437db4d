import { fileURLToPath as __rspack_fileURLToPath } from "node:url";
import { Lang, parseAsync } from "@ast-grep/napi";
import { parse } from "@vue/compiler-sfc";
import * as __rspack_external_get_tsconfig_a7fa961a from "get-tsconfig";
import * as __rspack_external_listr2 from "listr2";
import * as __rspack_external_minimatch from "minimatch";
import * as __rspack_external_node_worker_threads_773e82b0 from "node:worker_threads";
import * as __rspack_external_zx from "zx";
var __webpack_modules__ = {
    "./src/index.ts?caf7" (module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.a(module, async function(__rspack_load_async_deps, __rspack_async_done) {
            try {
                __webpack_require__.r(__webpack_exports__);
                __webpack_require__.d(__webpack_exports__, {
                    analyzeGraph: ()=>_worker__rspack_import_3.d,
                    circularDepsDetect: ()=>_circle__rspack_import_0.x,
                    logger: ()=>_logger__rspack_import_1.v,
                    printCircles: ()=>_utils__rspack_import_2.jn
                });
                var _circle__rspack_import_0 = __webpack_require__("./src/circle.ts");
                var _logger__rspack_import_1 = __webpack_require__("./src/logger.ts");
                var _utils__rspack_import_2 = __webpack_require__("./src/utils.ts");
                var _worker__rspack_import_3 = __webpack_require__("./src/worker.ts?57b3");
                var __rspack_async_deps = __rspack_load_async_deps([
                    _circle__rspack_import_0,
                    _worker__rspack_import_3
                ]);
                [_circle__rspack_import_0, _worker__rspack_import_3] = __rspack_async_deps.then ? (await __rspack_async_deps)() : __rspack_async_deps;
                __rspack_async_done();
            } catch (e) {
                __rspack_async_done(e);
            }
        });
    },
    "./src/ast.ts" (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.d(__webpack_exports__, {
            t: ()=>getImportSpecifiers
        });
        var external_zx_ = __webpack_require__("zx");
        async function getImportNodes(content) {
            const sgNode = await parseAsync(Lang.Tsx, content);
            return sgNode.root().findAll({
                rule: {
                    kind: 'string_fragment',
                    any: [
                        {
                            inside: {
                                stopBy: 'end',
                                kind: 'import_statement',
                                field: 'source'
                            }
                        },
                        {
                            inside: {
                                stopBy: 'end',
                                kind: 'export_statement',
                                field: 'source'
                            }
                        },
                        {
                            inside: {
                                kind: 'string',
                                inside: {
                                    kind: 'arguments',
                                    inside: {
                                        kind: 'call_expression',
                                        has: {
                                            field: 'function',
                                            regex: '^(import|require)$'
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }
            });
        }
        async function getTypeExcludedImportNodes(content) {
            const sgNode = await parseAsync(Lang.Tsx, content);
            return sgNode.root().findAll({
                utils: {
                    'is-not-follows-type': {
                        follows: {
                            pattern: '$$UNNAMED',
                            not: {
                                regex: 'type'
                            }
                        }
                    }
                },
                rule: {
                    kind: 'string_fragment',
                    any: [
                        {
                            inside: {
                                kind: 'string',
                                inside: {
                                    kind: 'arguments',
                                    inside: {
                                        kind: 'call_expression',
                                        has: {
                                            field: 'function',
                                            regex: '^(import|require)$'
                                        }
                                    }
                                }
                            }
                        },
                        {
                            inside: {
                                stopBy: 'end',
                                kind: 'export_statement',
                                any: [
                                    {
                                        has: {
                                            kind: 'string',
                                            field: 'source',
                                            nthChild: 1
                                        }
                                    },
                                    {
                                        has: {
                                            matches: 'is-not-follows-type',
                                            any: [
                                                {
                                                    kind: 'namespace_export'
                                                },
                                                {
                                                    kind: 'export_clause',
                                                    has: {
                                                        kind: 'export_specifier',
                                                        stopBy: 'end',
                                                        not: {
                                                            regex: '^type\\s'
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            inside: {
                                kind: 'import_statement',
                                stopBy: 'end',
                                any: [
                                    {
                                        has: {
                                            kind: 'string',
                                            field: 'source',
                                            nthChild: 1
                                        }
                                    },
                                    {
                                        has: {
                                            kind: 'import_clause',
                                            matches: 'is-not-follows-type',
                                            any: [
                                                {
                                                    has: {
                                                        stopBy: 'neighbor',
                                                        any: [
                                                            {
                                                                kind: 'identifier'
                                                            },
                                                            {
                                                                kind: 'namespace_import'
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    has: {
                                                        stopBy: 'end',
                                                        kind: 'import_specifier',
                                                        not: {
                                                            regex: '^type\\s'
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            });
        }
        function getScriptContentFromVue(filename) {
            const { descriptor: result } = parse(external_zx_.fs.readFileSync(filename, 'utf-8'));
            const { script, scriptSetup } = result;
            const scriptNode = script || scriptSetup;
            return scriptNode?.content;
        }
        async function getImportSpecifiers(filePath, excludeTypes = false) {
            const fileContent = filePath.endsWith('.vue') ? getScriptContentFromVue(filePath) ?? '' : external_zx_.fs.readFileSync(filePath, 'utf8');
            const nodes = excludeTypes ? await getTypeExcludedImportNodes(fileContent) : await getImportNodes(fileContent);
            return nodes.map((node)=>node.text());
        }
    },
    "./src/circle.ts" (module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.a(module, async function(__rspack_load_async_deps, __rspack_async_done) {
            try {
                __webpack_require__.d(__webpack_exports__, {
                    x: ()=>circularDepsDetect
                });
                var get_tsconfig__rspack_import_0 = __webpack_require__("get-tsconfig");
                var listr2__rspack_import_1 = __webpack_require__("listr2");
                var minimatch__rspack_import_2 = __webpack_require__("minimatch");
                var zx__rspack_import_3 = __webpack_require__("zx");
                var _ast__rspack_import_4 = __webpack_require__("./src/ast.ts");
                var _logger__rspack_import_5 = __webpack_require__("./src/logger.ts");
                var _utils__rspack_import_6 = __webpack_require__("./src/utils.ts");
                var _worker__rspack_import_7 = __webpack_require__("./src/worker.ts?57b3");
                var __rspack_async_deps = __rspack_load_async_deps([
                    _worker__rspack_import_7
                ]);
                _worker__rspack_import_7 = (__rspack_async_deps.then ? (await __rspack_async_deps)() : __rspack_async_deps)[0];
                async function circularDepsDetect(options) {
                    let { cwd = process.cwd(), ignore = [], absolute = false, filter, excludeTypes = false } = options || {};
                    cwd = zx__rspack_import_3.path.resolve(cwd);
                    ignore = [
                        ...new Set([
                            ...ignore,
                            '**/{.git,node_modules,dist}/**'
                        ])
                    ];
                    const globPattern = `**/*.{${_utils__rspack_import_6.XO.join(',')}}`;
                    _logger__rspack_import_5.v.info(`Working directory is ${zx__rspack_import_3.chalk.underline.cyan(cwd)}`);
                    _logger__rspack_import_5.v.info(`Ignored paths: ${ignore.map((v)=>zx__rspack_import_3.chalk.yellow(v)).join(',')}`);
                    const tsconfig = [
                        'tsconfig.json',
                        'jsconfig.json'
                    ].reduceRight((config, filename)=>config ?? (0, get_tsconfig__rspack_import_0.getTsconfig)(cwd, filename), null);
                    if (tsconfig?.config.compilerOptions?.paths) _logger__rspack_import_5.v.info(`Config file detected: ${zx__rspack_import_3.chalk.cyan(tsconfig.path)}`);
                    const runner = new listr2__rspack_import_1.Listr([
                        {
                            title: `Globbing files with ${zx__rspack_import_3.chalk.underline.cyan(globPattern)}`,
                            task: async (_, task)=>task.newListr([
                                    {
                                        title: 'Wait a moment...',
                                        task: async (ctx, task)=>{
                                            const files = await (0, zx__rspack_import_3.globby)(globPattern, {
                                                absolute: true,
                                                gitignore: true,
                                                cwd,
                                                ignore
                                            });
                                            task.title = `${zx__rspack_import_3.chalk.cyan(files.length)} files were detected.`;
                                            ctx.files = files;
                                        }
                                    }
                                ])
                        },
                        {
                            title: 'Pulling out import specifiers from files...',
                            rendererOptions: {
                                outputBar: 1
                            },
                            task: async ({ files, entries }, task)=>{
                                const pathMatcher = tsconfig && (0, get_tsconfig__rspack_import_0.createPathsMatcher)(tsconfig);
                                const getRealPathOfSpecifier = (filename, specifier)=>(0, _utils__rspack_import_6.Mb)(specifier.startsWith('.') ? zx__rspack_import_3.path.resolve(zx__rspack_import_3.path.posix.dirname(filename), specifier) : pathMatcher?.(specifier)[0] ?? specifier);
                                for (const [i, filename] of files.entries()){
                                    task.output = `${i + 1}/${files.length} - ${filename}`;
                                    const relFileName = zx__rspack_import_3.path.relative(cwd, filename);
                                    const deps = [];
                                    for (const value of (await (0, _ast__rspack_import_4.t)(filename, excludeTypes))){
                                        const resolvedPath = getRealPathOfSpecifier(filename, value);
                                        resolvedPath && deps.push(resolvedPath);
                                    }
                                    entries.push(absolute ? [
                                        filename,
                                        deps
                                    ] : [
                                        relFileName,
                                        deps.map((v)=>zx__rspack_import_3.path.relative(cwd, v))
                                    ]);
                                }
                            }
                        },
                        {
                            title: 'Analyzing circular dependencies...',
                            task: async (_, task)=>task.newListr([
                                    {
                                        title: 'Wait a moment...',
                                        task: async (ctx, task)=>{
                                            let result = await (0, _worker__rspack_import_7.d)(ctx.entries);
                                            if (filter) {
                                                const matcher = minimatch__rspack_import_2.minimatch.filter(filter);
                                                result = result.filter((v)=>v.some(matcher));
                                            }
                                            task.title = `${zx__rspack_import_3.chalk.cyan(result.length)} circles were found${filter ? `, filtered with ${zx__rspack_import_3.chalk.yellow(filter)}` : ''}.`;
                                            ctx.result = result;
                                        }
                                    }
                                ])
                        }
                    ], {
                        ctx: {
                            entries: [],
                            result: [],
                            files: []
                        },
                        rendererOptions: {
                            collapseSubtasks: false,
                            timer: listr2__rspack_import_1.PRESET_TIMER
                        }
                    });
                    const { result } = await runner.run();
                    return result;
                }
                __rspack_async_done();
            } catch (e) {
                __rspack_async_done(e);
            }
        });
    },
    "./src/logger.ts" (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.d(__webpack_exports__, {
            v: ()=>logger
        });
        var zx__rspack_import_0 = __webpack_require__("zx");
        const logger = {
            info: (...args)=>console.log(zx__rspack_import_0.chalk.blue('info'), ...args),
            warn: (...args)=>console.log(zx__rspack_import_0.chalk.yellow('warn'), ...args),
            error: (...args)=>console.log(zx__rspack_import_0.chalk.red('error'), ...args)
        };
    },
    "./src/utils.ts" (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
        __webpack_require__.d(__webpack_exports__, {
            Mb: ()=>revertExtension,
            XO: ()=>extensions,
            jn: ()=>printCircles
        });
        var zx__rspack_import_0 = __webpack_require__("zx");
        const extensions = [
            'js',
            'ts',
            'jsx',
            'tsx',
            'vue',
            'mjs',
            'cjs',
            'mts',
            'cts'
        ];
        function removeTrailingSlash(str) {
            return /[/\\]$/.test(str) ? removeTrailingSlash(str.slice(0, -1)) : str;
        }
        function revertExtension(origin) {
            if (zx__rspack_import_0.fs.existsSync(origin) && !zx__rspack_import_0.fs.statSync(origin).isDirectory()) return origin;
            for (const ext of extensions)for (const result of [
                `${removeTrailingSlash(origin)}.${ext}`,
                zx__rspack_import_0.path.posix.join(origin, `index.${ext}`)
            ])if (zx__rspack_import_0.fs.existsSync(result)) return result;
        }
        function colorize(filename) {
            return zx__rspack_import_0.chalk[/\.[mc]?jsx?$/.test(filename) ? 'yellow' : /\.[mc]?tsx?$/.test(filename) ? 'blue' : /\.vue$/.test(filename) ? 'green' : 'grey'](filename);
        }
        function printCircles(circles = []) {
            console.log('\n');
            for(let i = 0; i < circles.length; i++){
                const items = circles[i];
                console.log([
                    zx__rspack_import_0.chalk.underline(`Circle.${i + 1} - ${items.length} files`),
                    ...items.map((v)=>`→ ${colorize(v)}`)
                ].join('\n'));
            }
            console.log('\n');
        }
    },
    "./src/worker.ts?57b3" (module, __webpack_exports__, __webpack_require__) {
        var __filename = __rspack_fileURLToPath(import.meta.url);
        __webpack_require__.a(module, async function(__rspack_load_async_deps, __rspack_async_done) {
            try {
                __webpack_require__.d(__webpack_exports__, {
                    d: ()=>analyzeGraph
                });
                var node_worker_threads__rspack_import_0 = __webpack_require__("node:worker_threads");
                var _wasm_bridge__rspack_import_1 = __webpack_require__("./wasm/bridge.js");
                var __rspack_async_deps = __rspack_load_async_deps([
                    _wasm_bridge__rspack_import_1
                ]);
                _wasm_bridge__rspack_import_1 = (__rspack_async_deps.then ? (await __rspack_async_deps)() : __rspack_async_deps)[0];
                function analyzeGraph(edges) {
                    return new Promise((resolve, reject)=>{
                        const worker = new node_worker_threads__rspack_import_0.Worker(__filename, {
                            workerData: edges
                        });
                        worker.on('message', (message)=>{
                            resolve(message);
                            worker.terminate();
                        });
                        worker.on('error', (error)=>{
                            reject(error);
                            worker.terminate();
                        });
                    });
                }
                if (!node_worker_threads__rspack_import_0.isMainThread && node_worker_threads__rspack_import_0.parentPort) {
                    const result = (0, _wasm_bridge__rspack_import_1.A9)(node_worker_threads__rspack_import_0.workerData);
                    node_worker_threads__rspack_import_0.parentPort.postMessage(result);
                }
                __rspack_async_done();
            } catch (e) {
                __rspack_async_done(e);
            }
        });
    },
    "get-tsconfig" (module) {
        module.exports = __rspack_external_get_tsconfig_a7fa961a;
    },
    listr2 (module) {
        module.exports = __rspack_external_listr2;
    },
    minimatch (module) {
        module.exports = __rspack_external_minimatch;
    },
    "node:worker_threads" (module) {
        module.exports = __rspack_external_node_worker_threads_773e82b0;
    },
    zx (module) {
        module.exports = __rspack_external_zx;
    },
    "./wasm/bridge.js" (__webpack_module__, __webpack_exports__, __webpack_require__) {
        __webpack_require__.a(__webpack_module__, async function(__rspack_load_async_deps, __rspack_async_done) {
            try {
                __webpack_require__.d(__webpack_exports__, {
                    A9: ()=>_bridge_bg_js__rspack_import_0.A9
                });
                var _bridge_bg_wasm__rspack_import_1 = __webpack_require__("./wasm/bridge_bg.wasm");
                var _bridge_bg_js__rspack_import_0 = __webpack_require__("./wasm/bridge_bg.js");
                var __rspack_async_deps = __rspack_load_async_deps([
                    _bridge_bg_wasm__rspack_import_1
                ]);
                _bridge_bg_wasm__rspack_import_1 = (__rspack_async_deps.then ? (await __rspack_async_deps)() : __rspack_async_deps)[0];
                (0, _bridge_bg_js__rspack_import_0.lI)(_bridge_bg_wasm__rspack_import_1);
                __rspack_async_done();
            } catch (e) {
                __rspack_async_done(e);
            }
        });
    },
    "./wasm/bridge_bg.js" (__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
        __webpack_require__.d(__webpack_exports__, {
            A9: ()=>analyze_graph,
            Dw: ()=>__wbg_iterator_27b7c8b35ab3e86b,
            FD: ()=>__wbg_isArray_51fd9e6422c0a395,
            Fw: ()=>__wbg_Error_52673b7de5a0ca89,
            HE: ()=>__wbg___wbindgen_string_get_a2a31e16edf96e42,
            O7: ()=>__wbg___wbindgen_is_function_8d400b8b1af978cd,
            OU: ()=>__wbg_call_abb4ff46ce38be40,
            Ol: ()=>__wbg___wbindgen_boolean_get_dea25b33882b895b,
            Os: ()=>__wbg_next_138a17bbf04e926c,
            Oy: ()=>__wbg_String_8f0eb39a4a4c2f66,
            P$: ()=>__wbg_length_d45040a40c570362,
            Ri: ()=>__wbg_instanceof_Uint8Array_da54ccc9d3e09434,
            Sz: ()=>__wbg___wbindgen_is_object_ce774f3490692386,
            Tt: ()=>__wbg_getRandomValues_1c61fac11405ffdc,
            UU: ()=>__wbg_done_62ea16af4ce34b24,
            Ur: ()=>__wbg___wbindgen_debug_string_adfb662ae34724b6,
            WA: ()=>__wbg_get_6b7bd52aca3f9671,
            Yh: ()=>__wbg___wbindgen_throw_dd24417ed36fc46e,
            bk: ()=>__wbindgen_object_drop_ref,
            gC: ()=>__wbg___wbindgen_jsval_loose_eq_766057600fdd1b0d,
            gP: ()=>__wbg_value_57b7b035e117f7ee,
            hi: ()=>__wbg_length_22ac23eaec9d8053,
            kH: ()=>__wbg_new_6421f6084cc5bc5a,
            lI: ()=>__wbg_set_wasm,
            me: ()=>__wbg_prototypesetcall_dfe9b766cdc1f1fd,
            nX: ()=>__wbg_instanceof_ArrayBuffer_f3320d2419cd0355,
            oe: ()=>__wbg___wbindgen_number_get_9619185a74197f95,
            of: ()=>__wbg_set_7df433eea03a5c14,
            oj: ()=>__wbg_get_af9dab7e9603ea93,
            pY: ()=>__wbindgen_cast_2241b6af4c4b2941,
            rs: ()=>__wbg_next_3cfe5c0fe2a4cc53,
            tZ: ()=>__wbg_new_25f239778d6112b9
        });
        let wasm;
        function __wbg_set_wasm(val) {
            wasm = val;
        }
        function addHeapObject(obj) {
            if (heap_next === heap.length) heap.push(heap.length + 1);
            const idx = heap_next;
            heap_next = heap[idx];
            heap[idx] = obj;
            return idx;
        }
        function debugString(val) {
            const type = typeof val;
            if ('number' == type || 'boolean' == type || null == val) return `${val}`;
            if ('string' == type) return `"${val}"`;
            if ('symbol' == type) {
                const description = val.description;
                if (null == description) return 'Symbol';
                return `Symbol(${description})`;
            }
            if ('function' == type) {
                const name = val.name;
                if ('string' == typeof name && name.length > 0) return `Function(${name})`;
                return 'Function';
            }
            if (Array.isArray(val)) {
                const length = val.length;
                let debug = '[';
                if (length > 0) debug += debugString(val[0]);
                for(let i = 1; i < length; i++)debug += ', ' + debugString(val[i]);
                debug += ']';
                return debug;
            }
            const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
            let className;
            if (!builtInMatches || !(builtInMatches.length > 1)) return toString.call(val);
            className = builtInMatches[1];
            if ('Object' == className) try {
                return 'Object(' + JSON.stringify(val) + ')';
            } catch (_) {
                return 'Object';
            }
            if (val instanceof Error) return `${val.name}: ${val.message}\n${val.stack}`;
            return className;
        }
        function dropObject(idx) {
            if (idx < 132) return;
            heap[idx] = heap_next;
            heap_next = idx;
        }
        function getArrayU8FromWasm0(ptr, len) {
            ptr >>>= 0;
            return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
        }
        let cachedDataViewMemory0 = null;
        function getDataViewMemory0() {
            if (null === cachedDataViewMemory0 || true === cachedDataViewMemory0.buffer.detached || void 0 === cachedDataViewMemory0.buffer.detached && cachedDataViewMemory0.buffer !== wasm.memory.buffer) cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
            return cachedDataViewMemory0;
        }
        function getStringFromWasm0(ptr, len) {
            ptr >>>= 0;
            return decodeText(ptr, len);
        }
        let cachedUint8ArrayMemory0 = null;
        function getUint8ArrayMemory0() {
            if (null === cachedUint8ArrayMemory0 || 0 === cachedUint8ArrayMemory0.byteLength) cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
            return cachedUint8ArrayMemory0;
        }
        function getObject(idx) {
            return heap[idx];
        }
        function handleError(f, args) {
            try {
                return f.apply(this, args);
            } catch (e) {
                wasm.__wbindgen_export3(addHeapObject(e));
            }
        }
        let heap = new Array(128).fill(void 0);
        heap.push(void 0, null, true, false);
        let heap_next = heap.length;
        function isLikeNone(x) {
            return null == x;
        }
        function passStringToWasm0(arg, malloc, realloc) {
            if (void 0 === realloc) {
                const buf = cachedTextEncoder.encode(arg);
                const ptr = malloc(buf.length, 1) >>> 0;
                getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
                WASM_VECTOR_LEN = buf.length;
                return ptr;
            }
            let len = arg.length;
            let ptr = malloc(len, 1) >>> 0;
            const mem = getUint8ArrayMemory0();
            let offset = 0;
            for(; offset < len; offset++){
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
            if (offset !== len) {
                if (0 !== offset) arg = arg.slice(offset);
                ptr = realloc(ptr, len, len = offset + 3 * arg.length, 1) >>> 0;
                const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
                const ret = cachedTextEncoder.encodeInto(arg, view);
                offset += ret.written;
                ptr = realloc(ptr, len, offset, 1) >>> 0;
            }
            WASM_VECTOR_LEN = offset;
            return ptr;
        }
        function takeObject(idx) {
            const ret = getObject(idx);
            dropObject(idx);
            return ret;
        }
        let cachedTextDecoder = new TextDecoder('utf-8', {
            ignoreBOM: true,
            fatal: true
        });
        cachedTextDecoder.decode();
        const MAX_SAFARI_DECODE_BYTES = 2146435072;
        let numBytesDecoded = 0;
        function decodeText(ptr, len) {
            numBytesDecoded += len;
            if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
                cachedTextDecoder = new TextDecoder('utf-8', {
                    ignoreBOM: true,
                    fatal: true
                });
                cachedTextDecoder.decode();
                numBytesDecoded = len;
            }
            return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
        }
        const cachedTextEncoder = new TextEncoder();
        if (!('encodeInto' in cachedTextEncoder)) cachedTextEncoder.encodeInto = function(arg, view) {
            const buf = cachedTextEncoder.encode(arg);
            view.set(buf);
            return {
                read: arg.length,
                written: buf.length
            };
        };
        let WASM_VECTOR_LEN = 0;
        function analyze_graph(edges_array) {
            try {
                const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
                wasm.analyze_graph(retptr, addHeapObject(edges_array));
                var r0 = getDataViewMemory0().getInt32(retptr + 0, true);
                var r1 = getDataViewMemory0().getInt32(retptr + 4, true);
                var r2 = getDataViewMemory0().getInt32(retptr + 8, true);
                if (r2) throw takeObject(r1);
                return takeObject(r0);
            } finally{
                wasm.__wbindgen_add_to_stack_pointer(16);
            }
        }
        function __wbg_Error_52673b7de5a0ca89(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return addHeapObject(ret);
        }
        function __wbg_String_8f0eb39a4a4c2f66(arg0, arg1) {
            const ret = String(getObject(arg1));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4, len1, true);
            getDataViewMemory0().setInt32(arg0 + 0, ptr1, true);
        }
        function __wbg___wbindgen_boolean_get_dea25b33882b895b(arg0) {
            const v = getObject(arg0);
            const ret = 'boolean' == typeof v ? v : void 0;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        }
        function __wbg___wbindgen_debug_string_adfb662ae34724b6(arg0, arg1) {
            const ret = debugString(getObject(arg1));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4, len1, true);
            getDataViewMemory0().setInt32(arg0 + 0, ptr1, true);
        }
        function __wbg___wbindgen_is_function_8d400b8b1af978cd(arg0) {
            const ret = 'function' == typeof getObject(arg0);
            return ret;
        }
        function __wbg___wbindgen_is_object_ce774f3490692386(arg0) {
            const val = getObject(arg0);
            const ret = 'object' == typeof val && null !== val;
            return ret;
        }
        function __wbg___wbindgen_jsval_loose_eq_766057600fdd1b0d(arg0, arg1) {
            const ret = getObject(arg0) == getObject(arg1);
            return ret;
        }
        function __wbg___wbindgen_number_get_9619185a74197f95(arg0, arg1) {
            const obj = getObject(arg1);
            const ret = 'number' == typeof obj ? obj : void 0;
            getDataViewMemory0().setFloat64(arg0 + 8, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 0, !isLikeNone(ret), true);
        }
        function __wbg___wbindgen_string_get_a2a31e16edf96e42(arg0, arg1) {
            const obj = getObject(arg1);
            const ret = 'string' == typeof obj ? obj : void 0;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4, len1, true);
            getDataViewMemory0().setInt32(arg0 + 0, ptr1, true);
        }
        function __wbg___wbindgen_throw_dd24417ed36fc46e(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        }
        function __wbg_call_abb4ff46ce38be40() {
            return handleError(function(arg0, arg1) {
                const ret = getObject(arg0).call(getObject(arg1));
                return addHeapObject(ret);
            }, arguments);
        }
        function __wbg_done_62ea16af4ce34b24(arg0) {
            const ret = getObject(arg0).done;
            return ret;
        }
        function __wbg_getRandomValues_1c61fac11405ffdc() {
            return handleError(function(arg0, arg1) {
                globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
            }, arguments);
        }
        function __wbg_get_6b7bd52aca3f9671(arg0, arg1) {
            const ret = getObject(arg0)[arg1 >>> 0];
            return addHeapObject(ret);
        }
        function __wbg_get_af9dab7e9603ea93() {
            return handleError(function(arg0, arg1) {
                const ret = Reflect.get(getObject(arg0), getObject(arg1));
                return addHeapObject(ret);
            }, arguments);
        }
        function __wbg_instanceof_ArrayBuffer_f3320d2419cd0355(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof ArrayBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        }
        function __wbg_instanceof_Uint8Array_da54ccc9d3e09434(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof Uint8Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        }
        function __wbg_isArray_51fd9e6422c0a395(arg0) {
            const ret = Array.isArray(getObject(arg0));
            return ret;
        }
        function __wbg_iterator_27b7c8b35ab3e86b() {
            const ret = Symbol.iterator;
            return addHeapObject(ret);
        }
        function __wbg_length_22ac23eaec9d8053(arg0) {
            const ret = getObject(arg0).length;
            return ret;
        }
        function __wbg_length_d45040a40c570362(arg0) {
            const ret = getObject(arg0).length;
            return ret;
        }
        function __wbg_new_25f239778d6112b9() {
            const ret = new Array();
            return addHeapObject(ret);
        }
        function __wbg_new_6421f6084cc5bc5a(arg0) {
            const ret = new Uint8Array(getObject(arg0));
            return addHeapObject(ret);
        }
        function __wbg_next_138a17bbf04e926c(arg0) {
            const ret = getObject(arg0).next;
            return addHeapObject(ret);
        }
        function __wbg_next_3cfe5c0fe2a4cc53() {
            return handleError(function(arg0) {
                const ret = getObject(arg0).next();
                return addHeapObject(ret);
            }, arguments);
        }
        function __wbg_prototypesetcall_dfe9b766cdc1f1fd(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), getObject(arg2));
        }
        function __wbg_set_7df433eea03a5c14(arg0, arg1, arg2) {
            getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
        }
        function __wbg_value_57b7b035e117f7ee(arg0) {
            const ret = getObject(arg0).value;
            return addHeapObject(ret);
        }
        function __wbindgen_cast_2241b6af4c4b2941(arg0, arg1) {
            const ret = getStringFromWasm0(arg0, arg1);
            return addHeapObject(ret);
        }
        function __wbindgen_object_drop_ref(arg0) {
            takeObject(arg0);
        }
    },
    "./wasm/bridge_bg.wasm" (module, exports, __webpack_require__) {
        var rspack_import_0 = __webpack_require__("./wasm/bridge_bg.js");
        module.exports = __webpack_require__.v(exports, module.id, "49d04c2e378cc19a", {
            "./bridge_bg.js": {
                __wbg_Error_52673b7de5a0ca89: rspack_import_0.Fw,
                __wbg_String_8f0eb39a4a4c2f66: rspack_import_0.Oy,
                __wbindgen_object_drop_ref: rspack_import_0.bk,
                __wbg_isArray_51fd9e6422c0a395: rspack_import_0.FD,
                __wbg_length_d45040a40c570362: rspack_import_0.P$,
                __wbg_get_6b7bd52aca3f9671: rspack_import_0.WA,
                __wbg___wbindgen_string_get_a2a31e16edf96e42: rspack_import_0.HE,
                __wbg_next_3cfe5c0fe2a4cc53: rspack_import_0.rs,
                __wbg_done_62ea16af4ce34b24: rspack_import_0.UU,
                __wbg_value_57b7b035e117f7ee: rspack_import_0.gP,
                __wbg_new_25f239778d6112b9: rspack_import_0.tZ,
                __wbg_set_7df433eea03a5c14: rspack_import_0.of,
                __wbg_getRandomValues_1c61fac11405ffdc: rspack_import_0.Tt,
                __wbg_length_22ac23eaec9d8053: rspack_import_0.hi,
                __wbg_prototypesetcall_dfe9b766cdc1f1fd: rspack_import_0.me,
                __wbg_iterator_27b7c8b35ab3e86b: rspack_import_0.Dw,
                __wbg_get_af9dab7e9603ea93: rspack_import_0.oj,
                __wbg___wbindgen_is_function_8d400b8b1af978cd: rspack_import_0.O7,
                __wbg_call_abb4ff46ce38be40: rspack_import_0.OU,
                __wbg___wbindgen_is_object_ce774f3490692386: rspack_import_0.Sz,
                __wbg_next_138a17bbf04e926c: rspack_import_0.Os,
                __wbg___wbindgen_jsval_loose_eq_766057600fdd1b0d: rspack_import_0.gC,
                __wbg___wbindgen_boolean_get_dea25b33882b895b: rspack_import_0.Ol,
                __wbg___wbindgen_number_get_9619185a74197f95: rspack_import_0.oe,
                __wbg_instanceof_Uint8Array_da54ccc9d3e09434: rspack_import_0.Ri,
                __wbg_instanceof_ArrayBuffer_f3320d2419cd0355: rspack_import_0.nX,
                __wbg_new_6421f6084cc5bc5a: rspack_import_0.kH,
                __wbg___wbindgen_throw_dd24417ed36fc46e: rspack_import_0.Yh,
                __wbg___wbindgen_debug_string_adfb662ae34724b6: rspack_import_0.Ur,
                __wbindgen_cast_2241b6af4c4b2941: rspack_import_0.pY
            }
        });
    }
};
var __webpack_module_cache__ = {};
function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (void 0 !== cachedModule) return cachedModule.exports;
    var module = __webpack_module_cache__[moduleId] = {
        id: moduleId,
        exports: {}
    };
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
}
(()=>{
    var hasSymbol = "function" == typeof Symbol;
    var rspackQueues = hasSymbol ? Symbol("rspack queues") : "__rspack_queues";
    var rspackExports = __webpack_require__.aE = hasSymbol ? Symbol("rspack exports") : "__webpack_exports__";
    var rspackError = hasSymbol ? Symbol("rspack error") : "__rspack_error";
    var rspackDone = hasSymbol ? Symbol("rspack done") : "__rspack_done";
    var rspackDefer = __webpack_require__.zS = hasSymbol ? Symbol("rspack defer") : "__rspack_defer";
    var resolveQueue = (queue)=>{
        if (queue && queue.d < 1) {
            queue.d = 1;
            queue.forEach((fn)=>fn.r--);
            queue.forEach((fn)=>fn.r-- ? fn.r++ : fn());
        }
    };
    var wrapDeps = (deps)=>deps.map((dep)=>{
            if (null !== dep && "object" == typeof dep) {
                if (!dep[rspackQueues] && dep[rspackDefer]) {
                    var asyncDeps = dep[rspackDefer];
                    var hasUnresolvedAsyncSubgraph = asyncDeps.some((id)=>{
                        var cache = __webpack_module_cache__[id];
                        return !cache || false === cache[rspackDone];
                    });
                    if (!hasUnresolvedAsyncSubgraph) return dep;
                    var d = dep;
                    dep = {
                        then (callback) {
                            Promise.all(asyncDeps.map(__webpack_require__)).then(()=>callback(d));
                        }
                    };
                }
                if (dep[rspackQueues]) return dep;
                if (dep.then) {
                    var queue = [];
                    queue.d = 0;
                    dep.then((r)=>{
                        obj[rspackExports] = r;
                        resolveQueue(queue);
                    }, (e)=>{
                        obj[rspackError] = e;
                        resolveQueue(queue);
                    });
                    var obj = {};
                    obj[rspackDefer] = false;
                    obj[rspackQueues] = (fn)=>fn(queue);
                    return obj;
                }
            }
            var ret = {};
            ret[rspackQueues] = ()=>{};
            ret[rspackExports] = dep;
            return ret;
        });
    __webpack_require__.a = (module, body, hasAwait)=>{
        var queue;
        hasAwait && ((queue = []).d = -1);
        var depQueues = new Set();
        var exports = module.exports;
        var currentDeps;
        var outerResolve;
        var reject;
        var promise = new Promise((resolve, rej)=>{
            reject = rej;
            outerResolve = resolve;
        });
        promise[rspackExports] = exports;
        promise[rspackQueues] = (fn)=>{
            queue && fn(queue), depQueues.forEach(fn), promise["catch"](()=>{});
        };
        module.exports = promise;
        var handle = (deps)=>{
            currentDeps = wrapDeps(deps);
            var fn;
            var getResult = ()=>currentDeps.map((d)=>{
                    if (d[rspackDefer]) return d;
                    if (d[rspackError]) throw d[rspackError];
                    return d[rspackExports];
                });
            var promise = new Promise((resolve)=>{
                fn = ()=>resolve(getResult);
                fn.r = 0;
                var fnQueue = (q)=>q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn)));
                currentDeps.map((dep)=>dep[rspackDefer] || dep[rspackQueues](fnQueue));
            });
            return fn.r ? promise : getResult();
        };
        var done = (err)=>(err ? reject(promise[rspackError] = err) : outerResolve(exports), resolveQueue(queue), promise[rspackDone] = true);
        body(handle, done);
        queue && queue.d < 0 && (queue.d = 0);
    };
})();
(()=>{
    __webpack_require__.d = (exports, definition)=>{
        for(var key in definition)if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key]
        });
    };
})();
(()=>{
    __webpack_require__.g = (()=>{
        if ('object' == typeof globalThis) return globalThis;
        try {
            return this || new Function('return this')();
        } catch (e) {
            if ('object' == typeof window) return window;
        }
    })();
})();
(()=>{
    __webpack_require__.o = (obj, prop)=>Object.prototype.hasOwnProperty.call(obj, prop);
})();
(()=>{
    __webpack_require__.r = (exports)=>{
        if ('undefined' != typeof Symbol && Symbol.toStringTag) Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module'
        });
        Object.defineProperty(exports, '__esModule', {
            value: true
        });
    };
})();
(()=>{
    __webpack_require__.v = function(exports, wasmModuleId, wasmModuleHash, importsObj) {
        return Promise.all([
            import('fs'),
            import('url')
        ]).then(([{ readFile }, { URL }])=>new Promise((resolve, reject)=>{
                readFile(new URL("" + wasmModuleHash.slice(0, 8) + ".module.wasm", import.meta.url), (err, buffer)=>{
                    if (err) return reject(err);
                    resolve({
                        arrayBuffer () {
                            return buffer;
                        }
                    });
                });
            })).then(function(x) {
            return x.arrayBuffer();
        }).then(function(bytes) {
            return WebAssembly.instantiate(bytes, importsObj);
        }).then(function(res) {
            return Object.assign(exports, res.instance.exports);
        });
    };
})();
(()=>{
    var scriptUrl;
    if ("string" == typeof import.meta.url) scriptUrl = import.meta.url;
    if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
    scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
    __webpack_require__.p = scriptUrl;
})();
__webpack_require__("./src/index.ts?caf7");
