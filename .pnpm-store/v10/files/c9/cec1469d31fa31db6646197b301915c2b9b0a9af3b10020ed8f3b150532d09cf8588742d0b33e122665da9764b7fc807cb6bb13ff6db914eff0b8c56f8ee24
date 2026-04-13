import { env } from "node:process";
import { TsRunner } from "synckit";
const defaultTimeout = 30000;
export function getWorkerOptions() {
    if (env.NODE_ENV === "test") {
        return {
            timeout: Number(env.SYNCKIT_TIMEOUT) || defaultTimeout,
            tsRunner: TsRunner.OXC
        };
    }
    else {
        return {
            timeout: Number(env.SYNCKIT_TIMEOUT) || defaultTimeout
        };
    }
}
//# sourceMappingURL=worker.js.map