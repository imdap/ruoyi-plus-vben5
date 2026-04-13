import { clean } from '../../../util/util.js';
export const defaultPnPSettings = Object.freeze({});
let lastPnP = defaultPnPSettings;
/**
 * create PnPSettings object that can be used to compare to the last call.
 * This is to reduce object churn and unnecessary configuration loading.
 * @param settings - value to normalize
 * @returns
 */
export function normalizePnPSettings(settings) {
    if (equal(lastPnP, settings))
        return lastPnP;
    if (equal(defaultPnPSettings, settings))
        return defaultPnPSettings;
    const { usePnP, pnpFiles } = settings;
    return (lastPnP = clean({ usePnP, pnpFiles }));
}
function equal(a, b) {
    return (a === b ||
        (a.usePnP === b.usePnP && (a.pnpFiles === b.pnpFiles || a.pnpFiles?.join('|') === b.pnpFiles?.join('|'))));
}
//# sourceMappingURL=PnPSettings.js.map