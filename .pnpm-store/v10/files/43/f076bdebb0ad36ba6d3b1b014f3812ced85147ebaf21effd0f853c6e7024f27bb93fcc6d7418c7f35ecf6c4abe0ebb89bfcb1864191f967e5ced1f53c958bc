import { defaultNextDeserializer, defaultNextSerializer } from './defaultNext.js';
export function getDeserializer(middleware) {
    let next = defaultNextDeserializer;
    for (const des of middleware) {
        next = curryDeserialize(des, next);
    }
    return next;
}
export function getSerializer(middleware) {
    let next = defaultNextSerializer;
    for (const des of middleware) {
        next = currySerialize(des, next);
    }
    return next;
}
function curryDeserialize(middle, next) {
    return (content) => middle.deserialize(content, next);
}
function currySerialize(middle, next) {
    return (cfg) => middle.serialize(cfg, next);
}
function curryLoader(loader, next) {
    return (req) => loader.load(req, next);
}
async function defaultLoader(req) {
    const { io, deserialize } = req.context;
    const url = req.url;
    const file = await io.readFile(url);
    return deserialize(file);
}
export function getLoader(loaders) {
    let next = defaultLoader;
    for (const loader of loaders) {
        next = curryLoader(loader, next);
    }
    return next;
}
//# sourceMappingURL=middlewareHelper.js.map