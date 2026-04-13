import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
function computeImportKindModifier(node) {
  let importKind = 'importKind' in node ? node.importKind : void 0
  switch (importKind) {
    case void 0:
    case 'value':
      return 'value'
    case 'type':
      return 'type'
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(importKind)
  }
}
export { computeImportKindModifier }
