import assert from 'assert';
import { Buffer } from 'buffer';
import { Readable } from 'stream';
import { getNodeFetch } from '../helpers/node_fetch_imports.js';
async function createNFCResponseClass() {
    const { NodeFetchResponse } = await getNodeFetch();
    const responseInternalSymbol = Object.getOwnPropertySymbols(new NodeFetchResponse())[1];
    assert(responseInternalSymbol, 'Failed to get node-fetch responseInternalSymbol');
    return class NFCResponse extends NodeFetchResponse {
        ejectFromCache;
        returnedFromCache;
        isCacheMiss;
        static serializeMetaFromNodeFetchResponse(response) {
            const metaData = {
                url: response.url,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers.raw(),
                size: response.size,
                counter: response[responseInternalSymbol].counter,
            };
            return metaData;
        }
        static cacheMissResponse(url) {
            return new NFCResponse(Readable.from(Buffer.alloc(0)), {
                url,
                status: 504,
                statusText: 'Gateway Timeout',
                headers: {},
                size: 0,
                counter: 0,
            }, async () => undefined, false, true);
        }
        constructor(bodyStream, metaData, ejectFromCache, returnedFromCache, isCacheMiss = false) {
            super(Readable.from(bodyStream), metaData);
            this.ejectFromCache = ejectFromCache;
            this.returnedFromCache = returnedFromCache;
            this.isCacheMiss = isCacheMiss;
        }
    };
}
let cachedClass;
export async function getNFCResponseClass() {
    if (!cachedClass) {
        cachedClass = await createNFCResponseClass();
    }
    return cachedClass;
}
//# sourceMappingURL=response.js.map