import { name, version } from './package.json.js'
import sortVariableDeclarations from './rules/sort-variable-declarations.js'
import sortIntersectionTypes from './rules/sort-intersection-types.js'
import sortImportAttributes from './rules/sort-import-attributes.js'
import sortExportAttributes from './rules/sort-export-attributes.js'
import sortHeritageClauses from './rules/sort-heritage-clauses.js'
import sortArrayIncludes from './rules/sort-array-includes.js'
import sortNamedImports from './rules/sort-named-imports.js'
import sortNamedExports from './rules/sort-named-exports.js'
import sortObjectTypes from './rules/sort-object-types.js'
import sortSwitchCase from './rules/sort-switch-case.js'
import sortUnionTypes from './rules/sort-union-types.js'
import sortInterfaces from './rules/sort-interfaces.js'
import sortDecorators from './rules/sort-decorators.js'
import sortJsxProps from './rules/sort-jsx-props.js'
import sortClasses from './rules/sort-classes.js'
import sortImports from './rules/sort-imports.js'
import sortExports from './rules/sort-exports.js'
import sortObjects from './rules/sort-objects.js'
import sortModules from './rules/sort-modules.js'
import sortArrays from './rules/sort-arrays.js'
import sortEnums from './rules/sort-enums.js'
import sortMaps from './rules/sort-maps.js'
import sortSets from './rules/sort-sets.js'
let pluginName = 'perfectionist'
let recommendedRules = {
  'sort-variable-declarations': sortVariableDeclarations,
  'sort-intersection-types': sortIntersectionTypes,
  'sort-import-attributes': sortImportAttributes,
  'sort-export-attributes': sortExportAttributes,
  'sort-heritage-clauses': sortHeritageClauses,
  'sort-array-includes': sortArrayIncludes,
  'sort-named-imports': sortNamedImports,
  'sort-named-exports': sortNamedExports,
  'sort-object-types': sortObjectTypes,
  'sort-union-types': sortUnionTypes,
  'sort-switch-case': sortSwitchCase,
  'sort-decorators': sortDecorators,
  'sort-interfaces': sortInterfaces,
  'sort-jsx-props': sortJsxProps,
  'sort-modules': sortModules,
  'sort-classes': sortClasses,
  'sort-imports': sortImports,
  'sort-exports': sortExports,
  'sort-objects': sortObjects,
  'sort-enums': sortEnums,
  'sort-sets': sortSets,
  'sort-maps': sortMaps,
}
let rules = {
  ...recommendedRules,
  'sort-arrays': sortArrays,
}
let plugin = {
  meta: {
    version,
    name,
  },
  rules,
}
function getRules(options) {
  return Object.fromEntries(
    Object.keys(recommendedRules).map(ruleName => [
      `${pluginName}/${ruleName}`,
      ['error', options],
    ]),
  )
}
function createConfig(options) {
  return {
    plugins: {
      [pluginName]: plugin,
    },
    rules: getRules(options),
  }
}
function createLegacyConfig(options) {
  return {
    rules: getRules(options),
    plugins: [pluginName],
  }
}
let configs = {
  'recommended-alphabetical-legacy': createLegacyConfig({
    type: 'alphabetical',
    order: 'asc',
  }),
  'recommended-line-length-legacy': createLegacyConfig({
    type: 'line-length',
    order: 'desc',
  }),
  'recommended-natural-legacy': createLegacyConfig({
    type: 'natural',
    order: 'asc',
  }),
  'recommended-custom-legacy': createLegacyConfig({
    type: 'custom',
    order: 'asc',
  }),
  'recommended-alphabetical': createConfig({
    type: 'alphabetical',
    order: 'asc',
  }),
  'recommended-line-length': createConfig({
    type: 'line-length',
    order: 'desc',
  }),
  'recommended-natural': createConfig({
    type: 'natural',
    order: 'asc',
  }),
  'recommended-custom': createConfig({
    type: 'custom',
    order: 'asc',
  }),
}
const index = {
  ...plugin,
  configs,
}
export { configs, index as default, rules }
