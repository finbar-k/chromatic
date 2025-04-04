import { motion, AnimatePresence } from 'framer-motion'
import { useImageUpload } from '../hooks/use-image-upload'
import { FILE_CONSTRAINTS } from '../constants'
import { ANIMATION_DURATION } from '../constants'

interface ImageUploaderProps {
  onFileSelect: (file: File) => void
  isProcessing: boolean
}

/**
 * ImageUploader component provides drag-and-drop and click-to-upload functionality
 * Supports file validation, error display, and loading states
 */
function ImageUploader({ onFileSelect, isProcessing }: ImageUploaderProps) {
  const {
    isDragging,
    error,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInput,
    handleClick,
    handleKeyDown,
  } = useImageUpload(onFileSelect, isProcessing)

  const acceptTypes = FILE_CONSTRAINTS.ACCEPTED_TYPES.join(',')

  return (
    <div className="w-full max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATION_DURATION.SLOWER }}
      >
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={isProcessing ? -1 : 0}
          aria-label="Upload an image file"
          aria-disabled={isProcessing}
          className={`
            relative rounded-2xl border-2 border-dashed p-16
            transition-all duration-fast
            ${
              isProcessing
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer'
            }
            ${
              isDragging
                ? 'scale-[1.02] border-interactive-primary bg-primary-50'
                : 'border-border-default bg-background-primary hover:border-border-hover'
            }
            focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-interactive-primary/20
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptTypes}
            onChange={handleFileInput}
            className="hidden"
            disabled={isProcessing}
            aria-label="File input"
          />

          <div className="flex flex-col items-center gap-6 text-center">
            <motion.div
              animate={{
                scale: isDragging ? 1.05 : 1,
              }}
              transition={{ duration: ANIMATION_DURATION.FAST }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500"
              aria-hidden="true"
            >
              <svg
                className="h-10 w-10 text-text-inverse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </motion.div>

            <div>
              <p className="mb-2 text-2xl font-semibold text-text-primary">
                {isDragging ? 'Drop to upload' : 'Upload an image'}
              </p>
              <p className="text-base text-text-secondary">
                Drag and drop or click to browse
              </p>
              <p className="mt-3 text-sm text-text-tertiary">
                JPEG, PNG, WebP, or GIF up to {FILE_CONSTRAINTS.MAX_SIZE_MB}MB
              </p>
            </div>
          </div>

          <AnimatePresence>
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: ANIMATION_DURATION.FAST }}
                className="absolute inset-0 flex items-center justify-center rounded-3xl bg-background-primary/90 backdrop-blur-sm"
                role="status"
                aria-live="polite"
                aria-label="Processing image"
              >
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="h-8 w-8 animate-spin rounded-full border-4 border-interactive-primary border-t-transparent"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-text-secondary">
                    Extracting colors...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: ANIMATION_DURATION.FAST }}
              className="mt-4 rounded-xl border border-error-200 bg-error-50 p-4"
              role="alert"
              aria-live="assertive"
            >
              <p className="text-sm text-error-600">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default ImageUploader

