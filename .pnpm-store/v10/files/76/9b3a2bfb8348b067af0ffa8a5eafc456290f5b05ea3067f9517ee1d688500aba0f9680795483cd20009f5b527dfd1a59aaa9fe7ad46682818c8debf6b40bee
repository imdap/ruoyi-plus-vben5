import { getDefaultConfigLoader } from './defaultConfigLoader.js';
export async function readSettings(filename, relativeToOrPnP, pnpSettings) {
    const loader = getDefaultConfigLoader();
    const relativeTo = typeof relativeToOrPnP === 'string' || relativeToOrPnP instanceof URL ? relativeToOrPnP : undefined;
    const pnp = pnpSettings
        ? pnpSettings
        : !(typeof relativeToOrPnP === 'string' || relativeToOrPnP instanceof URL)
            ? relativeToOrPnP
            : undefined;
    return loader.readSettingsAsync(filename, relativeTo, pnp);
}
//# sourceMappingURL=readSettings.js.map