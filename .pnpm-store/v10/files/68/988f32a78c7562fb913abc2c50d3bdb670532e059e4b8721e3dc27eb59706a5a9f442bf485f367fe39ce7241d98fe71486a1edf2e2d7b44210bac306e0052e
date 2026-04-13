function buildOverloadSignatureNewlinesBetweenValueGetter() {
  return ({ computedNewlinesBetween, right, left }) => {
    if (
      left.overloadSignatureImplementation &&
      left.overloadSignatureImplementation ===
        right.overloadSignatureImplementation
    ) {
      return 0
    }
    return computedNewlinesBetween
  }
}
export { buildOverloadSignatureNewlinesBetweenValueGetter }
