export interface FeatureFlag {
    name: string;
    description: string;
}
type FlagTypes = string | boolean;
/**
 * Feature Flags are used to turn on/off features.
 * These are primarily used before a feature has been fully released.
 */
export declare class FeatureFlags {
    private flags;
    private flagValues;
    constructor(flags?: FeatureFlag[]);
    register(flag: FeatureFlag): this;
    register(name: string, description: string): this;
    getFlag(flag: string): FlagTypes | undefined;
    getFlagBool(flag: string): boolean | undefined;
    setFlag(flag: string, value?: FlagTypes): this;
    getFlagInfo(flag: string): FeatureFlag | undefined;
    getFlags(): FeatureFlag[];
    getFlagValues(): Map<string, FlagTypes>;
    reset(): this;
}
export declare class UnknownFeatureFlagError extends Error {
    readonly flag: string;
    constructor(flag: string);
}
export declare function getSystemFeatureFlags(): FeatureFlags;
export {};
//# sourceMappingURL=FeatureFlags.d.ts.map