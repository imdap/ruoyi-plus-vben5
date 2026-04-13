import fs from 'node:fs/promises';
import path from 'node:path';
import envPaths from 'env-paths';
import { xdgConfig } from 'xdg-basedir';
import { isDefined } from '../util/util.js';
const packageName = 'cspell';
export const legacyLocationDir = xdgConfig ? path.join(xdgConfig, 'configstore') : undefined;
export const cspellGlobalLocationDir = envPaths(packageName, { suffix: '' }).config;
export const defaultConfigFileName = 'cspell.json';
const searchOrder = [cspellGlobalLocationDir, legacyLocationDir].filter(isDefined);
export class GlobalConfigStore {
    #foundLocation;
    #baseFilename;
    constructor(filename = defaultConfigFileName) {
        this.#baseFilename = filename;
    }
    async #readConfigFile(location) {
        try {
            const json = await fs.readFile(location, 'utf8');
            return { filename: location, config: JSON.parse(json) };
        }
        catch {
            return undefined;
        }
    }
    async readConfigFile() {
        if (this.#foundLocation) {
            const found = await this.#readConfigFile(this.#foundLocation);
            if (found)
                return found;
        }
        const firstFile = path.resolve(cspellGlobalLocationDir, this.#baseFilename);
        const possibleLocations = new Set([
            firstFile,
            ...searchOrder.map((p) => path.resolve(p, defaultConfigFileName)),
        ]);
        for (const filename of possibleLocations) {
            const found = await this.#readConfigFile(filename);
            if (found) {
                this.#foundLocation = found.filename;
                return found;
            }
        }
        return undefined;
    }
    async writeConfigFile(cfg) {
        this.#foundLocation ??= path.join(cspellGlobalLocationDir, this.#baseFilename);
        await fs.mkdir(path.dirname(this.#foundLocation), { recursive: true });
        await fs.writeFile(this.#foundLocation, JSON.stringify(cfg, undefined, 2) + '\n');
        return this.#foundLocation;
    }
    get location() {
        return this.#foundLocation;
    }
    static create() {
        return new this();
    }
    static defaultLocation = path.join(cspellGlobalLocationDir, defaultConfigFileName);
}
//# sourceMappingURL=cfgStore.js.map