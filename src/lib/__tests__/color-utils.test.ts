import { describe, it, expect } from 'vitest'
import {
  rgbToHex,
  rgbToCssString,
  parseRgbString,
  getContrastRatio,
  getOptimalTextColor,
} from '../color-utils'

describe('color-utils', () => {
  describe('rgbToHex', () => {
    it('converts RGB to hex correctly', () => {
      expect(rgbToHex(255, 0, 0)).toBe('#ff0000')
      expect(rgbToHex(0, 255, 0)).toBe('#00ff00')
      expect(rgbToHex(0, 0, 255)).toBe('#0000ff')
      expect(rgbToHex(59, 130, 246)).toBe('#3b82f6')
    })

    it('clamps values outside 0-255 range', () => {
      expect(rgbToHex(300, -10, 128)).toBe('#ff0080')
      expect(rgbToHex(0, 0, 0)).toBe('#000000')
      expect(rgbToHex(255, 255, 255)).toBe('#ffffff')
    })

    it('handles decimal values by rounding', () => {
      // 59.5 rounds to 60 (0x3c), 130.7 rounds to 131 (0x83), 246.2 rounds to 246 (0xf6)
      expect(rgbToHex(59.5, 130.7, 246.2)).toBe('#3c83f6')
    })
  })

  describe('rgbToCssString', () => {
    it('converts RGB array to CSS string', () => {
      expect(rgbToCssString([255, 0, 0])).toBe('rgb(255, 0, 0)')
      expect(rgbToCssString([59, 130, 246])).toBe('rgb(59, 130, 246)')
    })
  })

  describe('parseRgbString', () => {
    it('parses valid RGB string', () => {
      expect(parseRgbString('rgb(255, 0, 0)')).toEqual([255, 0, 0])
      expect(parseRgbString('rgb(59, 130, 246)')).toEqual([59, 130, 246])
    })

    it('returns null for invalid format', () => {
      expect(parseRgbString('invalid')).toBeNull()
      expect(parseRgbString('rgb(255)')).toBeNull()
      expect(parseRgbString('rgb(255, 0)')).toBeNull()
      expect(parseRgbString('')).toBeNull()
    })

    it('returns null for out of range values', () => {
      expect(parseRgbString('rgb(300, 0, 0)')).toBeNull()
      expect(parseRgbString('rgb(-10, 0, 0)')).toBeNull()
    })
  })

  describe('getContrastRatio', () => {
    it('calculates contrast ratio correctly', () => {
      const white: [number, number, number] = [255, 255, 255]
      const black: [number, number, number] = [0, 0, 0]

      const ratio = getContrastRatio(white, black)
      expect(ratio).toBeGreaterThan(20) // Maximum contrast
    })

    it('returns 1 for same colors', () => {
      const color: [number, number, number] = [128, 128, 128]
      expect(getContrastRatio(color, color)).toBeCloseTo(1, 1)
    })
  })

  describe('getOptimalTextColor', () => {
    it('returns white for dark backgrounds', () => {
      const dark: [number, number, number] = [0, 0, 0]
      expect(getOptimalTextColor(dark)).toBe('white')
    })

    it('returns black for light backgrounds', () => {
      const light: [number, number, number] = [255, 255, 255]
      expect(getOptimalTextColor(light)).toBe('black')
    })

    it('chooses better contrast option', () => {
      const medium: [number, number, number] = [128, 128, 128]
      const result = getOptimalTextColor(medium)
      expect(['white', 'black']).toContain(result)
    })
  })
})

