class UnreachableCaseError extends Error {
  /**
   * Creates an error indicating that an supposedly unreachable case was
   * reached.
   *
   * @param value - The value that should have type `never` if all cases are
   *   handled. In practice, this will contain the unhandled case value.
   */
  constructor(value) {
    super(`Unreachable case: ${value}`)
    this.name = 'UnreachableCaseError'
  }
}
export { UnreachableCaseError }
