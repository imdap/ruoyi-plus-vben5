function getSettings(settings) {
  if (!settings['perfectionist']) {
    return {}
  }
  function getInvalidOptions(object) {
    let allowedOptions = /* @__PURE__ */ new Set([
      'partitionByComment',
      'partitionByNewLine',
      'specialCharacters',
      'newlinesBetween',
      'newlinesInside',
      'fallbackSort',
      'ignoreCase',
      'alphabet',
      'locales',
      'order',
      'type',
    ])
    return Object.keys(object).filter(key => !allowedOptions.has(key))
  }
  let perfectionistSettings = settings['perfectionist']
  let invalidOptions = getInvalidOptions(perfectionistSettings)
  if (invalidOptions.length > 0) {
    throw new Error(
      `Invalid Perfectionist setting(s): ${invalidOptions.join(', ')}`,
    )
  }
  return settings['perfectionist']
}
export { getSettings }
