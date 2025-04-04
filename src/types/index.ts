/**
 * Represents a single color swatch with metadata
 */
export interface ColorSwatch {
  /** Human-readable name for the color */
  name: string
  /** Hexadecimal color representation (e.g., "#ff0000") */
  hex: string
  /** CSS RGB string representation (e.g., "rgb(255, 0, 0)") */
  rgb: string
  /** Relative population/importance of the color (0-100) */
  population: number
}

/**
 * Complete palette data including extracted colors and source image
 */
export interface PaletteData {
  /** Array of extracted color swatches */
  swatches: ColorSwatch[]
  /** Object URL of the source image */
  imageUrl: string
}

