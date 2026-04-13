function computeDependencyName({
  nodeNameWithoutStartingHash,
  hasPrivateHash,
  isStatic,
}) {
  return `${isStatic ? 'static ' : ''}${hasPrivateHash ? '#' : ''}${nodeNameWithoutStartingHash}`
}
export { computeDependencyName }
