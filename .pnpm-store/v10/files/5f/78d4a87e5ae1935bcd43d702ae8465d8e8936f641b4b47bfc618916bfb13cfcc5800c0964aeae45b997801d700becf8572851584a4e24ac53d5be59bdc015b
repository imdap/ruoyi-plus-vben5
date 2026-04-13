export { clearCache } from './fetch-native.js';
export declare const fetch: (url: URL, opts?: Record<string, any>) => Promise<Response | {
    status: number;
    statusText: string;
    text(): Promise<any>;
    json(): Promise<any>;
    arrayBuffer(): any;
} | ((path: any) => {
    status: number;
    text(): Promise<string>;
    json(): Promise<any>;
    arrayBuffer(): ArrayBuffer;
}) | {
    status: number;
    statusText: any;
}>;
