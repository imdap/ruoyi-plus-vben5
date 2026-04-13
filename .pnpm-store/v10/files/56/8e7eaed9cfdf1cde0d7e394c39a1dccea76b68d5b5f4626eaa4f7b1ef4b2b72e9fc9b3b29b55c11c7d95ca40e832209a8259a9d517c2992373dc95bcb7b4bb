function rangeToDiff(node, sourceCode) {
  let nodeText = sourceCode.getText(node)
  let endsWithCommaOrSemicolon =
    nodeText.endsWith(';') || nodeText.endsWith(',')
  let [from, to] = node.range
  return to - from - (endsWithCommaOrSemicolon ? 1 : 0)
}
export { rangeToDiff }
