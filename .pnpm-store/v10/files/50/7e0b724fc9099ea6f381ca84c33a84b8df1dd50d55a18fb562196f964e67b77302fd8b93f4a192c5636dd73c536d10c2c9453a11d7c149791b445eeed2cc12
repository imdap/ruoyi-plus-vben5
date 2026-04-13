import { errorCode } from './error.js';
export const ignoreENOENT = async (p, rethrow) => p.catch(er => {
    if (errorCode(er) === 'ENOENT') {
        return;
    }
    throw rethrow ?? er;
});
export const ignoreENOENTSync = (fn, rethrow) => {
    try {
        return fn();
    }
    catch (er) {
        if (errorCode(er) === 'ENOENT') {
            return;
        }
        throw rethrow ?? er;
    }
};
//# sourceMappingURL=ignore-enoent.js.map