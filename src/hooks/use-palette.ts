import { useState, useCallback, useEffect } from 'react'
import { extractPalette } from '../utils/palette-extractor'
import type { PaletteData } from '../types'
import { PaletteExtractionError } from '../lib/errors'

interface UsePaletteReturn {
  palette: PaletteData | null
  isProcessing: boolean
  error: Error | null
  extractPaletteFromFile: (file: File) => Promise<void>
  resetPalette: () => void
}

/**
 * Custom hook for managing palette extraction state and operations
 * Handles file processing, error states, and cleanup of object URLs
 */
export function usePalette(): UsePaletteReturn {
  const [palette, setPalette] = useState<PaletteData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const extractPaletteFromFile = useCallback(async (file: File) => {
    setIsProcessing(true)
    setError(null)
    
    let imageUrl: string | null = null
    
    try {
      const swatches = await extractPalette(file)
      imageUrl = URL.createObjectURL(file)
      
      setPalette({
        swatches,
        imageUrl,
      })
    } catch (err) {
      const error = err instanceof Error 
        ? err 
        : new PaletteExtractionError('Failed to extract palette', err)
      
      setError(error)
      
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl)
      }
    } finally {
      setIsProcessing(false)
    }
  }, [])

  const resetPalette = useCallback(() => {
    if (palette?.imageUrl) {
      URL.revokeObjectURL(palette.imageUrl)
    }
    setPalette(null)
    setError(null)
  }, [palette?.imageUrl])

  useEffect(() => {
    return () => {
      if (palette?.imageUrl) {
        URL.revokeObjectURL(palette.imageUrl)
      }
    }
  }, [palette?.imageUrl])

  return {
    palette,
    isProcessing,
    error,
    extractPaletteFromFile,
    resetPalette,
  }
}

