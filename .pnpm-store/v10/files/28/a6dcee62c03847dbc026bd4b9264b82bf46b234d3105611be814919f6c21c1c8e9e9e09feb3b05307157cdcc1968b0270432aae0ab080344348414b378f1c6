let systemFeatureFlags;
/**
 * Feature Flags are used to turn on/off features.
 * These are primarily used before a feature has been fully released.
 */
export class FeatureFlags {
    flags;
    flagValues = new Map();
    constructor(flags = []) {
        this.flags = new Map(flags.map((f) => [f.name, f]));
    }
    register(flagOrName, description) {
        if (typeof flagOrName === 'string') {
            return this.register({ name: flagOrName, description: description || '' });
        }
        this.flags.set(flagOrName.name, flagOrName);
        return this;
    }
    getFlag(flag) {
        return this.flagValues.get(flag);
    }
    getFlagBool(flag) {
        return toBool(this.getFlag(flag));
    }
    setFlag(flag, value = true) {
        if (!this.flags.has(flag)) {
            throw new UnknownFeatureFlagError(flag);
        }
        this.flagValues.set(flag, value);
        return this;
    }
    getFlagInfo(flag) {
        return this.flags.get(flag);
    }
    getFlags() {
        return [...this.flags.values()];
    }
    getFlagValues() {
        return new Map(this.flagValues);
    }
    reset() {
        this.flagValues.clear();
        return this;
    }
}
export class UnknownFeatureFlagError extends Error {
    flag;
    constructor(flag) {
        super(`Unknown feature flag: ${flag}`);
        this.flag = flag;
    }
}
export function getSystemFeatureFlags() {
    return systemFeatureFlags || (systemFeatureFlags = new FeatureFlags());
}
const boolValues = {
    0: false,
    1: true,
    f: false,
    false: false,
    n: false,
    no: false,
    t: true,
    true: true,
    y: true,
    yes: true,
};
function toBool(value) {
    if (typeof value !== 'string')
        return value;
    return boolValues[value.toLowerCase()];
}
//# sourceMappingURL=FeatureFlags.js.map