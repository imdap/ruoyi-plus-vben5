import { RPCServer } from '@cspell/rpc';
import { spellCheckDocumentRPC } from './spellCheckFile.js';
export class CSpellRPCServer extends RPCServer {
    constructor(config) {
        super(config, getCSpellRPCApi());
    }
}
/**
 * Create a CSpell RPC Server that listens on the given port.
 * @param config - Server configuration.
 * @returns The CSpell RPC Server.
 */
export function createCSpellRPCServer(config) {
    return new CSpellRPCServer(config);
}
/**
 * Get the CSpell RPC API.
 *
 * @returns the api implementation.
 */
function getCSpellRPCApi() {
    return {
        spellCheckDocument: spellCheckDocumentRPC,
        sleep,
        echo,
    };
}
function echo(msg) {
    return Promise.resolve(msg);
}
function sleep(ms) {
    return new Promise((resolve) => {
        const start = performance.now();
        setTimeout(() => resolve(performance.now() - start), ms);
    });
}
//# sourceMappingURL=server.js.map