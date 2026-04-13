export function removeDefaults(entries) {
    const newEntries = { ...entries };
    for (const key in newEntries) {
        const schema = { ...newEntries[key] };
        if ("default" in schema) {
            delete schema.default;
        }
        newEntries[key] = schema;
    }
    return newEntries;
}
//# sourceMappingURL=valibot.js.map