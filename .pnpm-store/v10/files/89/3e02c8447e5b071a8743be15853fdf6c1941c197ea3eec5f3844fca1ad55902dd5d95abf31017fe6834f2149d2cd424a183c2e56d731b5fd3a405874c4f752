function getDecoratorName({ sourceCode, decorator }) {
  let fullName = sourceCode.getText(decorator)
  if (fullName.startsWith('@')) {
    fullName = fullName.slice(1)
  }
  return fullName.split('(')[0]
}
export { getDecoratorName }
