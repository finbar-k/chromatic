import ColorThief from 'colorthief'
import type { ColorSwatch } from '../types'
import { PALETTE_CONFIG, COLOR_NAMES } from '../constants'
import { rgbToHex, rgbToCssString } from '../lib/color-utils'
import { ImageLoadError, PaletteExtractionError } from '../lib/errors'

/**
 * Gets a human-readable color name based on index
 * @param index - Zero-based index of the color
 * @returns Color name string
 */
function getColorName(index: number): string {
  return COLOR_NAMES[index] ?? `Color ${index + 1}`
}

/**
 * Extracts a color palette from an image file using ColorThief
 * @param file - Image file to extract colors from
 * @returns Promise resolving to an array of ColorSwatch objects
 * @throws {ImageLoadError} If the image fails to load
 * @throws {PaletteExtractionError} If palette extraction fails
 */
export async function extractPalette(file: File): Promise<ColorSwatch[]> {
  return new Promise((resolve, reject) => {
    const imageUrl = URL.createObjectURL(file)
    const img = new Image()
    const colorThief = new ColorThief()

    const cleanup = () => {
      URL.revokeObjectURL(imageUrl)
    }

    img.onload = () => {
      try {
        const palette = colorThief.getPalette(
          img,
          PALETTE_CONFIG.COLOR_COUNT,
          PALETTE_CONFIG.QUALITY
        )

        if (!palette || palette.length === 0) {
          cleanup()
          reject(
            new PaletteExtractionError('No colors could be extracted from the image')
          )
          return
        }

        const swatches: ColorSwatch[] = palette.map((color, index) => {
          const [r, g, b] = color as [number, number, number]
          return {
            name: getColorName(index),
            hex: rgbToHex(r, g, b),
            rgb: rgbToCssString([r, g, b]),
            population: 100 - index * 10, // Decreasing population for visual hierarchy
          }
        })

        cleanup()
        resolve(swatches)
      } catch (error) {
        cleanup()
        reject(
          new PaletteExtractionError(
            'Failed to extract palette from image',
            error
          )
        )
      }
    }

    img.onerror = () => {
      cleanup()
      reject(new ImageLoadError('Failed to load image'))
    }

    img.crossOrigin = 'Anonymous'
    img.src = imageUrl
  })
}

