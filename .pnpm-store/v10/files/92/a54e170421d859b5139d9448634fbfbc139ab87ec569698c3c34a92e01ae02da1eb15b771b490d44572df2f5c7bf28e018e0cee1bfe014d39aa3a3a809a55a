import { FactoryComponent, FactoryGeneratedComponent } from "../types/component.js";
import { FactoryIconData } from "../types/data.js";
import { ComponentFactoryFileSystemOptions } from "../types/options.js";
interface Options extends Pick<ComponentFactoryFileSystemOptions, 'doubleDirsForComponents' | 'prefixDirsForComponents'> {
  includePrefix?: boolean;
  extension: string;
  cssExtension?: string;
}
/**
 * Add icon and filename to generated component
 */
declare function convertGeneratedComponentToFile(icon: Pick<FactoryIconData, 'name' | 'prefix'>, item: FactoryGeneratedComponent, options: Options): FactoryComponent;
export { convertGeneratedComponentToFile };