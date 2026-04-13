import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
function computeExportKindModifier(node) {
  let exportKind = 'exportKind' in node ? node.exportKind : void 0
  switch (exportKind) {
    case void 0:
    case 'value':
      return 'value'
    case 'type':
      return 'type'
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(exportKind)
  }
}
export { computeExportKindModifier }
