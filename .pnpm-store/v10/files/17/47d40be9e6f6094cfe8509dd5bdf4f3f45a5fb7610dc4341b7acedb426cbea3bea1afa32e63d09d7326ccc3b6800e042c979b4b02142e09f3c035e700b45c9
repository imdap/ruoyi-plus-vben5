import { parse } from 'es-module-lexer';
import { createFilter } from '@rollup/pluginutils';
import XEUtils from 'xe-utils';
export function lazyImport(options) {
    const opts = Object.assign({
        include: ['**/*.vue', '**/*.ts', '**/*.js', '**/*.tsx', '**/*.jsx']
        //  exclude :["node_modules/**"]
    }, options);
    const filter = createFilter(opts.include, opts.exclude);
    const parseMaps = {};
    function parseResolverImport(code, resOpts) {
        const [imports] = parse(code);
        for (let i = 0; i < imports.length; i++) {
            const item = imports[i];
            if (item.n === resOpts.libraryName) {
                return item;
            }
        }
        return null;
    }
    function transformImport(id, exports, resOpts) {
        const importCodes = [];
        exports.forEach(item => {
            let importName = item.n;
            let variableCode = item.n;
            let asName = '';
            if (item.ln && item.ln !== item.n) {
                importName = item.ln;
                asName = item.n;
                variableCode = `${importName} as ${asName}`;
            }
            let jsPath = '';
            let stylePath = '';
            const parseItem = parseMaps[`${id}_${importName}`];
            if (parseItem) {
                jsPath = parseItem.jsPath;
                stylePath = parseItem.stylePath;
            }
            else {
                const libDir = resOpts.esm ? 'es' : 'lib';
                const extName = resOpts.importStyle === true ? 'css' : (resOpts.importStyle || 'css');
                const dirName = XEUtils.kebabCase(importName);
                jsPath = `import { ${variableCode} } from "${resOpts.libraryName}/${libDir}/${dirName}/index.js"`;
                stylePath = `import "${resOpts.libraryName}/${libDir}/${dirName}/style.${extName}"`;
                if (resOpts.resolve) {
                    const rest = resOpts.resolve({
                        dirName,
                        name: importName,
                        libraryName: resOpts.libraryName
                    });
                    const fromRest = rest ? rest.from : null;
                    if (fromRest) {
                        if (XEUtils.isString(fromRest)) {
                            jsPath = `import { ${variableCode} } from "${fromRest}"`;
                        }
                        else {
                            if (fromRest.jsPath) {
                                jsPath = `import { ${variableCode} } from "${fromRest.jsPath}"`;
                            }
                            if (fromRest.stylePath) {
                                stylePath = `import "${fromRest.stylePath}"`;
                            }
                        }
                    }
                }
                parseMaps[`${id}_${importName}`] = {
                    jsPath,
                    stylePath
                };
            }
            if (resOpts.importStyle) {
                importCodes.push(`${jsPath};\n${stylePath}`);
                return;
            }
            importCodes.push(`${jsPath}`);
        });
        return importCodes.join(';\n');
    }
    function toVariableExport(impCode) {
        const rest = impCode.replace(/\n/, ' ').match(/\{[a-zA-Z,_'"\s]+?\}/);
        if (rest) {
            return `export ${rest[0]}`;
        }
        return '';
    }
    return {
        name: 'vite:lazy-import',
        enforce: 'post',
        transform(code, id) {
            if (!code || !filter(id) || !Array.isArray(opts.resolvers)) {
                return null;
            }
            let isTransform = false;
            let restCode = code;
            opts.resolvers.forEach(resolver => {
                const resOpts = Object.assign({}, resolver);
                if (!resOpts.libraryName) {
                    return;
                }
                const syntaxItem = parseResolverImport(restCode, resOpts);
                if (!syntaxItem) {
                    return;
                }
                const exportCode = toVariableExport(restCode.slice(syntaxItem.ss, syntaxItem.se));
                const exports = parse(exportCode)[1];
                if (!exports.length) {
                    return;
                }
                const importCode = transformImport(id, exports, resOpts);
                isTransform = true;
                restCode = `${restCode.slice(0, syntaxItem.ss)}${importCode}${restCode.slice(syntaxItem.se)}`;
            });
            if (isTransform) {
                return {
                    code: restCode
                };
            }
            return null;
        }
    };
}
export * from './resolvers';
