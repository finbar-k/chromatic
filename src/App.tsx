import { motion, AnimatePresence } from 'framer-motion'
import ImageUploader from './components/ImageUploader'
import PaletteDisplay from './components/PaletteDisplay'
import { usePalette } from './hooks/use-palette'
import { ANIMATION_DURATION } from './constants'

/**
 * Main application component
 * Manages palette extraction state and renders appropriate views
 */
function App() {
  const { palette, isProcessing, error, extractPaletteFromFile, resetPalette } =
    usePalette()

  return (
    <div className="min-h-screen bg-background-primary">
      <div className="mx-auto max-w-7xl px-6 py-8 md:py-12">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION.SLOWER }}
          className="mb-12 md:mb-16"
        >
          <h1 className="mb-3 bg-gradient-to-r from-primary-600 via-accent-600 to-accent-500 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
            Chromatic
          </h1>
          <p className="max-w-2xl text-xl text-text-secondary">
            Extract beautiful color palettes from your images
          </p>
        </motion.header>

        <main>
          <AnimatePresence mode="wait">
            {!palette ? (
              <motion.div
                key="uploader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: ANIMATION_DURATION.NORMAL }}
              >
                <ImageUploader
                  onFileSelect={extractPaletteFromFile}
                  isProcessing={isProcessing}
                />
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 max-w-3xl rounded-xl border border-error-200 bg-error-50 p-4"
                    role="alert"
                    aria-live="assertive"
                  >
                    <p className="text-sm text-error-600">
                      {error.message ||
                        'An error occurred while processing the image'}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="palette"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: ANIMATION_DURATION.NORMAL }}
              >
                <PaletteDisplay palette={palette} onReset={resetPalette} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default App
