/**
 * Blurs interpolation characters in a string by replacing them with a specified character.
 * @param {string} source - The source string to blur.
 * @param {string} [blurChar] - The character to replace interpolation characters with (default: space).
 * @returns {string} The blurred string.
 */
export function blurInterpolation (source, blurChar = ` `) {
	return source.replaceAll(/[#@{}]+/g, blurChar)
}
