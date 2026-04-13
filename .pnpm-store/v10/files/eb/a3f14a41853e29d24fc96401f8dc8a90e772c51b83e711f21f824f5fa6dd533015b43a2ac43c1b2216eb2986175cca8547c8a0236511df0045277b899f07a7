export declare function createLogger(): {
    log: Log;
    logStream: LogStream;
};
export type Log = (type: string, message: string) => void;
export type LogStream = () => AsyncGenerator<{
    type: string;
    message: string;
}, never, unknown>;
