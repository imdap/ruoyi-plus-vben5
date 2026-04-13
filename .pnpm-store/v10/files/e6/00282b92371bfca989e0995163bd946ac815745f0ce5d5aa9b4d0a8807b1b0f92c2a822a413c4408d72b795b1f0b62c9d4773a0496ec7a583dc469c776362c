import * as node_http from 'node:http';
import { RequestListener } from 'node:http';
import { L as ListenOptions, a as Listener } from './shared/listhen.DwroyNnF.js';
export { C as Certificate, b as CrossWSOptions, G as GetURLOptions, H as HTTPSOptions, c as ListenURL, S as ShowURLOptions } from './shared/listhen.DwroyNnF.js';
import { ConsolaInstance } from 'consola';
import * as crossws_adapters_node from 'crossws/adapters/node';
import * as h3 from 'h3';
import * as jiti_lib_types from 'jiti/lib/types';
import 'node:https';
import 'node:net';
import 'get-port-please';

/**
 * Starts an HTTP or HTTPS server with the provided request handler and configuration options.
 * This function sets up the server, configures the port and hostname, enables HTTPS if specified, sets up
 * WebSocket support if required, handles tunneling for public access, and provides utilities for displaying URLs
 * and handling server shutdown.
 *
 * @param handle The request listener function for handling HTTP requests.
 * @param _options Partial configuration options for the server. Inherits from {@link ListenOptions}.
 * @returns a promise that resolves to a {@link Listener} object containing server details and utility functions.
 */
declare function listen(handle: RequestListener, _options?: Partial<ListenOptions>): Promise<Listener>;

interface DevServerOptions {
    /**
     * The current working directory from which the server should serve files.
     * @optional
     * @default process.cwd() || import.meta.url
     */
    cwd?: string;
    /**
     * An array of directories from which static files will be served.
     * @optional
     * @default ["public"]
     */
    staticDirs?: string[];
    /**
     * The logger instance to be used by the development server. See {@link ConsolaInstance}.
     * @optional
     * @default consola.withTag("listhen")
     */
    logger?: ConsolaInstance;
    /**
     * Configuration options for WebSocket communication. See {@link ListenOptions["ws"]}.
     * @optional
     */
    ws?: ListenOptions["ws"];
}
/**
 * Creates and configures a development server with options for serving static files,
 * WebSocket support and custom logging.
 *
 * @param entry The path to the server's entry file.
 * @param options Configuration options for the development server. See {@link DevServerOptions}.
 * @returns an object containing server configuration details such as the current working directory (`cwd`),
 * a resolver function, the node listener function for integration with other Node.js servers or middleware,
 * a reload function to reload the server configuration, and WebSocket options (`_ws`).
 */
declare function createDevServer(entry: string, options: DevServerOptions): Promise<{
    cwd: string;
    resolver: {
        relative: (path: string) => string;
        formatRelative: (path: string) => string;
        import: <T = unknown>(id: string, opts?: jiti_lib_types.JitiResolveOptions & {
            default?: true;
        }) => Promise<T>;
        resolve: (id: string) => string;
        tryResolve: (id: string) => string | undefined;
    };
    nodeListener: h3.NodeListener;
    reload: (_initial?: boolean) => Promise<void>;
    _ws: false | crossws_adapters_node.NodeOptions | ((req: node_http.IncomingMessage, head: Buffer) => void) | undefined;
    _entry: string | undefined;
}>;

interface WatchOptions extends DevServerOptions {
    /**
     * The current working directory from which the server should run.
     * Inherits all the properties of {@link DevServerOptions}.
     * @optional
     */
    cwd?: string;
    /**
     * The logger instance to use for logging within the watch process.
     * @optional
     * See {@link ConsolaInstance}.
     */
    logger?: ConsolaInstance;
    /**
     * An array of glob patterns to specify files or directories to ignore during monitoring.
     * @optional
     */
    ignore?: string[];
    /**
     * An array of directories containing static files. These directories are served by the dev server.
     * @optional
     */
    publicDirs?: string[];
}
/**
 * Initialises a development server with file-watching capabilities, automatically reloading the server as files change.
 * This feature combines the setup of a development server with file monitoring to provide a live development environment.
 *
 * @param entry The path to the server's entry file.
 * @param options Configuration options that combine {@link ListenOptions} and {@link WatchOptions} for server listening and file and
 * file-watching behaviour. This allows partial customisation by merging server and watcher configurations.
 * @returns a promise that resolves to an {@link listener} instance representing the launched server with attached file-watching capabilities.
 * This server will be reloaded on specified file changes.
 */
declare function listenAndWatch(entry: string, options: Partial<ListenOptions & WatchOptions>): Promise<Listener>;

export { ListenOptions, Listener, createDevServer, listen, listenAndWatch };
export type { DevServerOptions, WatchOptions };
