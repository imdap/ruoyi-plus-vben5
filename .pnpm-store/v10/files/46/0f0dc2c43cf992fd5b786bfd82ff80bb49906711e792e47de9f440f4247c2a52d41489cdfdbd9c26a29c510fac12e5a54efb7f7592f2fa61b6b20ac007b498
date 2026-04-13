import * as path from 'node:path'
import * as fs from 'node:fs'
import { getTypescriptImport } from './get-typescript-import.js'
let directoryCacheByPath = /* @__PURE__ */ new Map()
let contentCacheByPath = /* @__PURE__ */ new Map()
function readClosestTsConfigByPath({
  tsconfigFilename,
  tsconfigRootDir,
  contextCwd,
  filePath,
}) {
  let typescriptImport = getTypescriptImport()
  if (!typescriptImport) {
    return null
  }
  let directory = path.dirname(filePath)
  let checkedDirectories = [directory]
  do {
    let tsconfigPath = path.join(directory, tsconfigFilename)
    let cachedDirectory = directoryCacheByPath.get(directory)
    if (!cachedDirectory && fs.existsSync(tsconfigPath)) {
      cachedDirectory = tsconfigPath
    }
    if (cachedDirectory) {
      for (let checkedDirectory of checkedDirectories) {
        directoryCacheByPath.set(checkedDirectory, cachedDirectory)
      }
      return getCompilerOptions(typescriptImport, contextCwd, cachedDirectory)
    }
    directory = path.dirname(directory)
    checkedDirectories.push(directory)
  } while (directory.length > 1 && directory.length >= tsconfigRootDir.length)
  throw new Error(
    `Couldn't find any ${tsconfigFilename} relative to '${filePath}' within '${tsconfigRootDir}'.`,
  )
}
function getCompilerOptions(typescriptImport, contextCwd, filePath) {
  if (contentCacheByPath.has(filePath)) {
    return contentCacheByPath.get(filePath)
  }
  let configFileRead = typescriptImport.readConfigFile(
    filePath,
    typescriptImport.sys.readFile,
  )
  if (configFileRead.error) {
    throw new Error(
      `Error reading tsconfig file: ${JSON.stringify(configFileRead.error)}`,
    )
  }
  let parsedContent = typescriptImport.parseJsonConfigFileContent(
    configFileRead,
    typescriptImport.sys,
    path.dirname(filePath),
  )
  let compilerOptionsConverted =
    typescriptImport.convertCompilerOptionsFromJson(
      // eslint-disable-next-line typescript/no-unsafe-member-access
      parsedContent.raw.config.compilerOptions,
      path.dirname(filePath),
    )
  if (compilerOptionsConverted.errors.length > 0) {
    throw new Error(
      `Error getting compiler options: ${JSON.stringify(
        compilerOptionsConverted.errors,
      )}`,
    )
  }
  let cache = typescriptImport.createModuleResolutionCache(
    contextCwd,
    fileName => typescriptImport.sys.resolvePath(fileName),
    compilerOptionsConverted.options,
  )
  let output = {
    compilerOptions: compilerOptionsConverted.options,
    cache,
  }
  contentCacheByPath.set(filePath, output)
  return output
}
export { contentCacheByPath, directoryCacheByPath, readClosestTsConfigByPath }
