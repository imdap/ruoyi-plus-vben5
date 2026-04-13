export function encodeBase64(data) {
    if (typeof window !== 'undefined') {
        return window.btoa(data);
    }
    return Buffer.from(data).toString('base64');
}
export function decodeBase64(data) {
    if (typeof window !== 'undefined') {
        return window.atob(data);
    }
    return Buffer.from(data, 'base64').toString('utf8');
}


//# sourceMappingURL=b64.js.map