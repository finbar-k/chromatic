import { motion, AnimatePresence } from 'framer-motion'
import { useMemo } from 'react'
import type { ColorSwatch as ColorSwatchType } from '../types'
import { parseRgbString, getOptimalTextColor } from '../lib/color-utils'
import { useClipboard } from '../hooks/use-clipboard'
import { ANIMATION_DURATION, PALETTE_CONFIG } from '../constants'

interface ColorSwatchProps {
  swatch: ColorSwatchType
  index: number
}

/**
 * ColorSwatch component displays a single color with its metadata
 * Supports copying color values to clipboard with visual feedback
 */
function ColorSwatch({ swatch, index }: ColorSwatchProps) {
  const { copied, copyToClipboard } = useClipboard()

  const textColor = useMemo(() => {
    const rgb = parseRgbString(swatch.rgb)
    if (!rgb) return 'black' // Fallback if parsing fails
    return getOptimalTextColor(rgb)
  }, [swatch.rgb])

  const handleCopy = async () => {
    try {
      await copyToClipboard(swatch.hex)
    } catch (error) {
      console.error('Failed to copy color:', error)
    }
  }

  const animationDelay = index * PALETTE_CONFIG.ANIMATION_DELAY_MULTIPLIER

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: ANIMATION_DURATION.NORMAL,
        delay: animationDelay,
      }}
      className="group relative overflow-hidden rounded-xl ring-1 ring-border-default"
    >
      <button
        onClick={handleCopy}
        type="button"
        className="flex h-52 w-full flex-col items-center justify-center gap-3 transition-all duration-fast active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interactive-primary/50 focus-visible:ring-offset-2"
        style={{ backgroundColor: swatch.hex }}
        aria-label={`Copy ${swatch.name} color ${swatch.hex} to clipboard`}
      >
        <div className="px-4 text-center" style={{ color: textColor }}>
          <div className="mb-2 text-sm font-medium opacity-75">
            {swatch.name}
          </div>
          <div className="text-xl font-semibold tracking-tight">
            {swatch.hex}
          </div>
          <div className="mt-2 text-xs opacity-60">{swatch.rgb}</div>
        </div>

        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: ANIMATION_DURATION.FAST }}
              className="absolute inset-0 flex items-center justify-center backdrop-blur-sm"
              style={{ backgroundColor: `${swatch.hex}dd` }}
              aria-live="polite"
            >
              <div
                className="rounded-lg bg-background-primary/20 px-4 py-2 text-sm font-medium"
                style={{ color: textColor }}
              >
                Copied!
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <div
        className="pointer-events-none absolute bottom-3 right-3 opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden="true"
      >
        <div
          className="rounded-lg bg-neutral-900/10 px-2.5 py-1.5 text-xs backdrop-blur-sm"
          style={{ color: textColor }}
        >
          Click to copy
        </div>
      </div>
    </motion.div>
  )
}

export default ColorSwatch

