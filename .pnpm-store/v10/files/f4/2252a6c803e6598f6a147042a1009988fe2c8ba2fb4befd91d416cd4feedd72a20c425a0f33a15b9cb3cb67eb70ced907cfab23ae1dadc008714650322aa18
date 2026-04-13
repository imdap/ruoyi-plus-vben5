export function createLogger() {
    var _globalThis_process_env, _globalThis_process;
    if (!((_globalThis_process = globalThis.process) === null || _globalThis_process === void 0 ? void 0 : (_globalThis_process_env = _globalThis_process.env) === null || _globalThis_process_env === void 0 ? void 0 : _globalThis_process_env.JSPM_GENERATOR_LOG)) {
        const noop = ()=>{};
        return {
            log: noop,
            logStream: async function*() {}
        };
    }
    let resolveQueue;
    let queuePromise = new Promise((resolve)=>resolveQueue = resolve);
    let queue = [];
    let startTime = Date.now();
    const logStream = async function*() {
        while(true){
            while(queue.length)yield queue.shift();
            await queuePromise;
        }
    };
    function log(type, message) {
        if (queue.length) {
            queue.push({
                type,
                message
            });
        } else {
            queue = [
                {
                    type,
                    message
                }
            ];
            const _resolveQueue = resolveQueue;
            queuePromise = new Promise((resolve)=>resolveQueue = resolve);
            _resolveQueue();
        }
    }
    (async ()=>{
        for await (const { type, message } of logStream()){
            console.log(`\x1b[1m${type}:\x1b[0m (${Date.now() - startTime}ms) ${message}`);
        }
    })();
    return {
        log,
        logStream
    };
}


//# sourceMappingURL=log.js.map