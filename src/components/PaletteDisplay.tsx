import { motion } from 'framer-motion'
import type { PaletteData } from '../types'
import ColorSwatch from './ColorSwatch'
import { ANIMATION_DURATION } from '../constants'

interface PaletteDisplayProps {
  palette: PaletteData
  onReset: () => void
}

/**
 * PaletteDisplay component renders the extracted color palette with image preview
 * Displays color swatches in a responsive grid layout
 */
function PaletteDisplay({ palette, onReset }: PaletteDisplayProps) {
  const colorCount = palette.swatches.length

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: ANIMATION_DURATION.SLOW }}
        className="space-y-8"
      >
        <header className="mb-8 flex flex-wrap items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: ANIMATION_DURATION.SLOW }}
            className="flex items-center gap-4"
          >
            <div className="h-14 w-14 overflow-hidden rounded-xl ring-1 ring-border-default">
              <img
                src={palette.imageUrl}
                alt="Source image for color extraction"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">
                Your Palette
              </h2>
              <p className="text-sm text-text-secondary">
                {colorCount} {colorCount === 1 ? 'color' : 'colors'}
              </p>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: ANIMATION_DURATION.SLOW }}
            onClick={onReset}
            type="button"
            className="btn-secondary rounded-lg px-5 py-2.5"
            aria-label="Upload a new image"
          >
            New Image
          </motion.button>
        </header>

        <section aria-label="Color palette">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {palette.swatches.map((swatch, index) => (
              <ColorSwatch
                key={`${swatch.hex}-${index}`}
                swatch={swatch}
                index={index}
              />
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  )
}

export default PaletteDisplay

