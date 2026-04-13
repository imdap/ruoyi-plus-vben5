import { randomUUID } from 'node:crypto';
import { RPCClient } from '@cspell/rpc';
import { CSPELL_RPC_API_ENDPOINTS } from './api.js';
export class CSpellRPCClient extends RPCClient {
    constructor(config) {
        super({ randomUUID, ...config });
    }
    getApi() {
        return super.getApi(Object.keys(CSPELL_RPC_API_ENDPOINTS));
    }
}
/**
 * Create a CSpell RPC Client.
 * @param config - Client configuration
 * @returns CSpellRPCClient
 */
export function createCSpellRPCClient(config) {
    return new CSpellRPCClient(config);
}
//# sourceMappingURL=client.js.map