//#region src/index.d.ts
type RC = Record<string, any>;
interface RCOptions {
  /**
   * The name of the configuration file.
   * @optional
   */
  name?: string;
  /**
   * The directory where the configuration file is or should be written.
   * @optional
   */
  dir?: string;
  /**
   * Specifies whether the configuration should be treated as a flat object.
   * @optional
   */
  flat?: boolean;
}
/**
 * The default options for the configuration file.
 */
declare const defaults: RCOptions;
declare function parse<T extends RC = RC>(contents: string, options?: RCOptions): T;
/**
 * Parses a configuration string into an object.
 * @param {string} contents - The configuration data as a raw string.
 * @param {RCOptions} [options={}] - Options to control the parsing behaviour. See {@link RCOptions}.
 * @returns {RC} - The parsed configuration object. See {@link RC}.
 */
declare function parseFile<T extends RC = RC>(path: string, options?: RCOptions): T;
/**
 * Reads a configuration file from a default or specified location and parses its contents.
 * @param {RCOptions|string} [options] - Options for reading the configuration file, or the name of the configuration file. See {@link RCOptions}.
 * @returns {RC} - The parsed configuration object. See {@link RC}.
 */
declare function read<T extends RC = RC>(options?: RCOptions | string): T;
/**
 * Reads a custom configuration file from a default or specified location and parses its contents.
 * @param {RCOptions|string} [options] - Options for reading the configuration file, or the name of the configuration file. See {@link RCOptions}.
 * @returns {RC} - The parsed configuration object.
 * @deprecated Use {@link readUserConfig} instead, which uses `~/.config` following XDG conventions.
 */
declare function readUser<T extends RC = RC>(options?: RCOptions | string): T;
/**
 * Serialises a configuration object to a string format.
 * @param {RC} config - The configuration object to serialise. See {@link RC}.
 * @returns {string} - The serialised configuration string.
 */
declare function serialize<T extends RC = RC>(config: T): string;
/**
 * Writes a configuration object to a file in a default or specified location.
 * @param {RC} config - The configuration object to write. See {@link RC}.
 * @param {RCOptions|string} [options] - Options for writing the configuration file, or the name of the configuration file. See {@link RCOptions}.
 */
declare function write<T extends RC = RC>(config: T, options?: RCOptions | string): void;
/**
 * Writes a custom configuration object to a file in a default or specified location.
 * @param {RC} config - The configuration object to write. See {@link RC}.
 * @param {RCOptions|string} [options] - Options for writing the configuration file, or the name of the configuration file. See {@link RCOptions}.
 * @deprecated Use {@link writeUserConfig} instead, which uses `~/.config` following XDG conventions.
 */
declare function writeUser<T extends RC = RC>(config: T, options?: RCOptions | string): void;
/**
 * Reads a configuration file from `$XDG_CONFIG_HOME` or `$HOME/.config` and parses its contents.
 * @param {RCOptions|string} [options] - Options for reading the configuration file, or the name of the configuration file. See {@link RCOptions}.
 * @returns {RC} - The parsed configuration object.
 */
declare function readUserConfig<T extends RC = RC>(options?: RCOptions | string): T;
/**
 * Writes a configuration object to a file in `$XDG_CONFIG_HOME` or `$HOME/.config`.
 * @param {RC} config - The configuration object to write. See {@link RC}.
 * @param {RCOptions|string} [options] - Options for writing the configuration file, or the name of the configuration file. See {@link RCOptions}.
 */
declare function writeUserConfig<T extends RC = RC>(config: T, options?: RCOptions | string): void;
/**
 * Updates a configuration object in `$XDG_CONFIG_HOME` or `$HOME/.config` by merging and writing the result.
 * @param {RC} config - The configuration object to update. See {@link RC}.
 * @param {RCOptions|string} [options] - Options for updating the configuration file, or the name of the configuration file. See {@link RCOptions}.
 * @returns {RC} - The updated configuration object.
 */
declare function updateUserConfig<T extends RC = RC>(config: T, options?: RCOptions | string): T;
/**
 * Updates an existing configuration object by merging it with the contents of a configuration file and writing the result.
 * @param {RC} config - The configuration object to update. See {@link RC}.
 * @param {RCOptions|string} [options] - Options for updating the configuration file, or the name of the configuration file. See {@link RCOptions}.
 * @returns {RC} - The updated configuration object. See {@link RC}.
 */
declare function update<T extends RC = RC>(config: T, options?: RCOptions | string): T;
/**
 * Updates a custom configuration object by merging it with the contents of a configuration file in a default location and writing the result.
 * @param {RC} config - The configuration object to update. See {@link RC}.
 * @param {RCOptions|string} [options] - Options for updating the configuration file, or the name of the configuration file. See {@link RCOptions}.
 * @returns {RC} - The updated configuration object. See {@link RC}.
 * @deprecated Use {@link updateUserConfig} instead, which uses `~/.config` following XDG conventions.
 */
declare function updateUser<T extends RC = RC>(config: T, options?: RCOptions | string): T;
//#endregion
export { RC, RCOptions, defaults, parse, parseFile, read, readUser, readUserConfig, serialize, update, updateUser, updateUserConfig, write, writeUser, writeUserConfig };