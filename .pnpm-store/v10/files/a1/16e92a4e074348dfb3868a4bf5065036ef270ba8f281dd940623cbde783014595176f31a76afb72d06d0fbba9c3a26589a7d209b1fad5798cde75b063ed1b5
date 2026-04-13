import { CSpellConfigFileReaderWriterImpl } from './CSpellConfigFileReaderWriter.js';
import { defaultIO } from './defaultIO.js';
import { defaultLoaders } from './loaders/index.js';
import { defaultDeserializers } from './serializers/index.js';
/**
 *
 * @param deserializers - Additional deserializers to use when reading a config file. The order of the deserializers is
 *    important. The last one in the list will be the first one to be called.
 * @param io - an optional injectable IO interface. The default it to use the file system.
 * @returns
 */
export function createReaderWriter(deserializers = [], loaders = [], io = defaultIO) {
    return new CSpellConfigFileReaderWriterImpl(io, [...defaultDeserializers, ...deserializers], [...defaultLoaders, ...loaders]);
}
//# sourceMappingURL=createReaderWriter.js.map