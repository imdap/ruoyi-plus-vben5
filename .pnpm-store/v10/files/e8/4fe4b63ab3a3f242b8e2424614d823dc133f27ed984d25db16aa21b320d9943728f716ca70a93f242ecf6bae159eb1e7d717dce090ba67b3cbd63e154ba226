function pairwise(nodes, callback) {
  if (nodes.length === 0) {
    return
  }
  callback(null, nodes.at(0))
  for (let i = 1; i < nodes.length; i++) {
    let left = nodes.at(i - 1)
    let right = nodes.at(i)
    callback(left, right)
  }
}
export { pairwise }
