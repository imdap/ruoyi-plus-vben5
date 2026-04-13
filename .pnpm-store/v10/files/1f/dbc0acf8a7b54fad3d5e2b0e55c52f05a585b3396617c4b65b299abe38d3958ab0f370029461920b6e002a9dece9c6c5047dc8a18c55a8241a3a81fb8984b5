import * as json from '../common/json.js';
// @ts-ignore
import { readFileSync, writeFileSync } from 'fs';
export async function updatePjson(resolver, pjsonBase, updateFn) {
    const pjsonUrl = new URL('package.json', pjsonBase);
    let input;
    try {
        input = readFileSync(pjsonUrl).toString();
    } catch (e) {
        input = '{}\n';
    }
    let { json: pjson, style } = json.parseStyled(input);
    pjson = await updateFn(pjson) || pjson;
    const output = json.stringifyStyled(pjson, style);
    if (output === input) return false;
    writeFileSync(pjsonUrl, json.stringifyStyled(pjson, style));
    resolver.pcfgs[pjsonBase] = pjson;
    return true;
}


//# sourceMappingURL=pjson.js.map