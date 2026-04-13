import { dirname } from 'node:path';
import ts from 'typescript';

function createParsedCommandLine(_ts, host, configPath) {
  const config = ts.readJsonConfigFile(configPath, host.readFile);
  return ts.parseJsonSourceFileConfigFileContent(config, host, dirname(configPath), {}, configPath);
}
const createProgram = ts.createProgram;

export { createParsedCommandLine, createProgram };
