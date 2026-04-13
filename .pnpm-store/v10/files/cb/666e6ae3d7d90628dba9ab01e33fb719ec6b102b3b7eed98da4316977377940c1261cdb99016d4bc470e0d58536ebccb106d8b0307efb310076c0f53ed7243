import type { FileTypeDefinitions, FileTypeId } from './types.js';
export declare const binaryLanguages: Set<string>;
export declare const generatedFiles: Set<string>;
export declare const languageIds: FileTypeId[];
export declare const fileTypeDefinitions: FileTypeDefinitions;
/**
 * Checks to see if a file type is considered to be a binary file type.
 * @param ext - the file extension to check
 * @returns true if the file type is known to be binary.
 */
export declare function isBinaryExt(ext: string): boolean;
/**
 * Checks to see if a file type is considered to be a binary file type.
 * @param filename - the filename to check
 * @returns true if the file type is known to be binary.
 */
export declare function isBinaryFile(filename: string): boolean;
/**
 * Checks to see if a file type is considered to be a binary file type.
 * @param fileTypeId - the file type id to check
 * @returns true if the file type is known to be binary.
 */
export declare function isBinaryFileType(fileTypeId: FileTypeId | FileTypeId[] | Iterable<FileTypeId>): boolean;
/**
 * Check if a file extension is associated with generated file.. Generated files are files that are not typically edited by a human.
 * Example:
 * - package-lock.json
 * @param ext - the file extension to check.
 * @returns true if the file type known to be generated.
 */
export declare function isGeneratedExt(ext: string): boolean;
/**
 * Check if a file is auto generated. Generated files are files that are not typically edited by a human.
 * Example:
 * - package-lock.json
 * @param filename - the full filename to check
 * @returns true if the file type known to be generated.
 */
export declare function isGeneratedFile(filename: string): boolean;
/**
 * Check if a file type is auto generated. Generated files are files that are not typically edited by a human.
 * Example:
 * - package-lock.json
 * @param fileTypeId - the file type id to check
 * @returns true if the file type known to be generated.
 */
export declare function isFileTypeGenerated(fileTypeId: FileTypeId | FileTypeId[] | Iterable<FileTypeId>): boolean;
/**
 * Tries to find a matching language for a given file extension.
 * @param ext - the file extension to look up.
 * @returns an array of language ids that match the extension. The array is empty if no matches are found.
 */
export declare function getFileTypesForExt(ext: string): FileTypeId[];
/**
 * Find the matching file types for a given filename.
 * @param filename - the full filename
 * @returns an array of language ids that match the filename. The array is empty if no matches are found.
 */
export declare function findMatchingFileTypes(filename: string): FileTypeId[];
export declare function autoResolve<K, V>(map: Map<K, V>, key: K, resolve: (k: K) => V): V;
//# sourceMappingURL=filetypes.d.ts.map