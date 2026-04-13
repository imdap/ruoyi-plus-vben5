export function replaceTemplate(template, replacements) {
    const templateStart = '${';
    const tLen = templateStart.length;
    const templateEnd = '}';
    const parts = [];
    let lastPos = 0;
    let p = template.indexOf(templateStart, lastPos);
    if (p < 0)
        return template;
    while (p >= 0) {
        parts.push(template.substring(lastPos, p));
        lastPos = p;
        const end = template.indexOf(templateEnd, p);
        if (end < 0)
            break;
        const name = template.substring(p + tLen, end);
        if (name in replacements) {
            parts.push(replacements[name] || '');
        }
        else {
            parts.push(template.substring(p, end + 1));
        }
        lastPos = end + 1;
        p = template.indexOf(templateStart, lastPos);
    }
    parts.push(template.substring(lastPos));
    return parts.join('');
}
export function envToTemplateVars(env) {
    const vars = {};
    for (const [key, value] of Object.entries(env)) {
        vars[`env:${key}`] = value || '';
    }
    return vars;
}
//# sourceMappingURL=templates.js.map