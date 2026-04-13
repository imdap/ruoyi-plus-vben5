import { getIntegrity } from '../common/integrity.js';
export { createTsAnalysis } from './ts.js';
export { createCjsAnalysis } from './cjs.js';
export async function createEsmAnalysis(imports, source, url) {
    // Change the return type to Promise<Analysis>
    if (!imports.length && systemMatch(source)) return createSystemAnalysis(source, imports, url);
    const deps = [];
    const dynamicDeps = [];
    for (const impt of imports){
        if (impt.d === -1) {
            if (!deps.includes(impt.n)) deps.push(impt.n);
            continue;
        }
        // dynamic import -> deoptimize trace all dependencies (and all their exports)
        if (impt.d >= 0) {
            if (impt.n) {
                try {
                    dynamicDeps.push(impt.n);
                } catch (e) {
                    console.warn(`TODO: Dynamic import custom expression tracing in ${url} for:\n\n${source.slice(impt.ss, impt.se)}\n`);
                }
            }
        }
    }
    const size = source.length;
    return {
        deps,
        dynamicDeps,
        cjsLazyDeps: null,
        size,
        format: 'esm',
        integrity: await getIntegrity(source)
    };
}
const leadingCommentRegex = /^\s*(\/\*[\s\S]*?\*\/|\s*\/\/[^\n]*)*/;
const registerRegex = /^\s*System\s*\.\s*register\s*\(\s*(\[[^\]]*\])\s*,\s*\(?function\s*\(\s*([^\),\s]+\s*(,\s*([^\),\s]+)\s*)?\s*)?\)/;
function systemMatch(code) {
    const commentMatch = code.match(leadingCommentRegex);
    const offset = commentMatch ? commentMatch[0].length : 0;
    return code.slice(offset).match(registerRegex);
}
export async function createSystemAnalysis(source, imports, url) {
    const [, rawDeps, contextId] = systemMatch(source) || [];
    if (!rawDeps) return createEsmAnalysis(imports, source, url);
    const deps = JSON.parse(rawDeps.replace(/'/g, '"'));
    const dynamicDeps = [];
    if (contextId) {
        const dynamicImport = `${contextId}.import(`;
        let i = -1;
        while((i = source.indexOf(dynamicImport, i + 1)) !== -1){
            const importStart = i + dynamicImport.length + 1;
            const quote = source[i + dynamicImport.length];
            if (quote === '"' || quote === "'") {
                const importEnd = source.indexOf(quote, i + dynamicImport.length + 1);
                if (importEnd !== -1) {
                    try {
                        dynamicDeps.push(JSON.parse('"' + source.slice(importStart, importEnd) + '"'));
                        continue;
                    } catch (e) {}
                }
            }
            console.warn('TODO: Dynamic import custom expression tracing.');
        }
    }
    const size = source.length;
    return {
        deps,
        dynamicDeps,
        cjsLazyDeps: null,
        size,
        format: 'system',
        integrity: await getIntegrity(source)
    };
}


//# sourceMappingURL=analysis.js.map