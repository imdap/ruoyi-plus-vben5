let _nodeCrypto;
export async function getIntegrityNodeLegacy(buf) {
    const hash = (_nodeCrypto || (_nodeCrypto = await (0, eval)('import("node:crypto")'))).createHash('sha384');
    hash.update(buf);
    return `sha384-${hash.digest('base64')}`;
}
export let getIntegrity = async function getIntegrity(buf) {
    const data = typeof buf === 'string' ? new TextEncoder().encode(buf) : buf;
    const hashBuffer = await crypto.subtle.digest('SHA-384', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashBase64 = btoa(String.fromCharCode(...hashArray));
    return `sha384-${hashBase64}`;
};
if (typeof crypto === 'undefined') getIntegrity = getIntegrityNodeLegacy;


//# sourceMappingURL=integrity.js.map