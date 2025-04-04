/**
 * Color manipulation and calculation utilities
 */

/**
 * Converts RGB values to hexadecimal color string
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns Hexadecimal color string (e.g., "#ff0000")
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (value: number) => Math.max(0, Math.min(255, Math.round(value)))
  
  return `#${[clamp(r), clamp(g), clamp(b)]
    .map((x) => {
      const hex = x.toString(16)
      return hex.length === 1 ? `0${hex}` : hex
    })
    .join('')}`
}

/**
 * Converts RGB array to CSS rgb() string
 * @param rgb - Array of [r, g, b] values (0-255)
 * @returns CSS rgb() string (e.g., "rgb(255, 0, 0)")
 */
export function rgbToCssString(rgb: [number, number, number]): string {
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}

/**
 * Parses RGB string to array of numbers
 * @param rgbString - CSS rgb() string (e.g., "rgb(255, 0, 0)")
 * @returns Array of [r, g, b] values or null if parsing fails
 */
export function parseRgbString(
  rgbString: string
): [number, number, number] | null {
  // Match rgb(r, g, b) format, including negative numbers
  const match = rgbString.match(/rgb\(\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*(-?\d+)\s*\)/)
  if (!match) return null

  const r = Number(match[1])
  const g = Number(match[2])
  const b = Number(match[3])

  if (
    Number.isNaN(r) ||
    Number.isNaN(g) ||
    Number.isNaN(b) ||
    r < 0 ||
    r > 255 ||
    g < 0 ||
    g > 255 ||
    b < 0 ||
    b > 255
  ) {
    return null
  }

  return [r, g, b]
}

/**
 * Calculates the relative luminance of an RGB color (WCAG 2.1)
 * @param rgb - Array of [r, g, b] values (0-255)
 * @returns Relative luminance value (0-1)
 */
function calculateLuminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb
  const rNormalized = r / 255
  const gNormalized = g / 255
  const bNormalized = b / 255

  const rLuminance =
    rNormalized <= 0.03928
      ? rNormalized / 12.92
      : Math.pow((rNormalized + 0.055) / 1.055, 2.4)
  const gLuminance =
    gNormalized <= 0.03928
      ? gNormalized / 12.92
      : Math.pow((gNormalized + 0.055) / 1.055, 2.4)
  const bLuminance =
    bNormalized <= 0.03928
      ? bNormalized / 12.92
      : Math.pow((bNormalized + 0.055) / 1.055, 2.4)

  return 0.2126 * rLuminance + 0.7152 * gLuminance + 0.0722 * bLuminance
}

/**
 * Calculates the contrast ratio between two RGB colors (WCAG 2.1)
 * @param rgb1 - First RGB color [r, g, b]
 * @param rgb2 - Second RGB color [r, g, b]
 * @returns Contrast ratio (1-21, where 21 is maximum contrast)
 */
export function getContrastRatio(
  rgb1: [number, number, number],
  rgb2: [number, number, number]
): number {
  const l1 = calculateLuminance(rgb1)
  const l2 = calculateLuminance(rgb2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Determines the best text color (black or white) for a given background color
 * @param backgroundColor - RGB color array [r, g, b]
 * @returns 'white' or 'black' based on contrast
 */
export function getOptimalTextColor(
  backgroundColor: [number, number, number]
): 'white' | 'black' {
  const white: [number, number, number] = [255, 255, 255]
  const black: [number, number, number] = [0, 0, 0]
  
  const contrastWithWhite = getContrastRatio(backgroundColor, white)
  const contrastWithBlack = getContrastRatio(backgroundColor, black)
  
  return contrastWithWhite > contrastWithBlack ? 'white' : 'black'
}

