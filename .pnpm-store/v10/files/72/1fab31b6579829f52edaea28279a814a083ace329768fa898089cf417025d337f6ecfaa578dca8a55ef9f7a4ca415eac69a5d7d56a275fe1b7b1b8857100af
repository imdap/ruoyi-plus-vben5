export type VcType = 'etag' | 'chunkHash' | 'versionJson';
export interface VersionPollingOptions {
    vcType?: VcType;
    htmlFileUrl?: string;
    chunkName?: string;
    versionFileUrl?: string;
    eventTriggerList?: string[];
    pollingInterval?: number;
    silent?: boolean;
    silentPollingInterval?: boolean;
    silentPageVisibility?: boolean;
    onUpdate: (self: VersionPolling, info?: object) => void;
}
export type WorkerGlobalData = Pick<VersionPollingOptions, 'vcType' | 'htmlFileUrl' | 'chunkName' | 'versionFileUrl' | 'pollingInterval' | 'silentPollingInterval'>;
export type VersionControl = {
    versionFlag: string;
    start: () => Promise<void>;
    check: () => Promise<void>;
    fetchEtag: () => Promise<{
        versionFlag: string;
    }>;
    fetchChunkHash: () => Promise<{
        versionFlag: string;
    }>;
    fetchVersionFile: () => Promise<{
        versionFlag: string;
        versionInfo?: object;
    }>;
    pausePolling: () => void;
    startPolling: () => void;
};
export declare class VersionPolling {
    options: {
        vcType: string;
        htmlFileUrl: string;
        chunkName: string;
        versionFileUrl: string;
        eventTriggerList: string[];
        pollingInterval: number;
        silent: boolean;
        silentPollingInterval: boolean;
        silentPageVisibility: boolean;
        onUpdate: (self: VersionPolling, info?: object) => void;
    };
    worker: Worker | undefined;
    visibilityHandler: () => void;
    eventHandler: () => void;
    constructor(options: VersionPollingOptions);
    start(): void;
    stop(): void;
    onRefresh(): void;
    onCancel(): void;
}
/**
 * Creates a VersionPolling instance
 *
 * @param options
 */
export declare function createVersionPolling(options: VersionPollingOptions): VersionPolling;
