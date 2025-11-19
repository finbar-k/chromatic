import { useState, useRef, useCallback } from 'react'
import { validateFile } from '../utils/file-validator'

interface UseImageUploadReturn {
  isDragging: boolean
  error: string | null
  fileInputRef: React.RefObject<HTMLInputElement | null>
  handleDragOver: (e: React.DragEvent) => void
  handleDragLeave: (e: React.DragEvent) => void
  handleDrop: (e: React.DragEvent) => void
  handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleClick: () => void
  handleKeyDown: (e: React.KeyboardEvent) => void
  clearError: () => void
}

/**
 * Custom hook for managing image upload drag-and-drop and file input logic
 * Handles validation, error states, and accessibility
 */
export function useImageUpload(
  onFileSelect: (file: File) => void,
  isProcessing: boolean
): UseImageUploadReturn {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback(
    (file: File) => {
      setError(null)
      const validation = validateFile(file)

      if (!validation.success) {
        const errorMessage = validation.error || 'Invalid file'
        setError(errorMessage)
        return
      }

      onFileSelect(file)
    },
    [onFileSelect]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isProcessing) {
      setIsDragging(true)
    }
  }, [isProcessing])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      if (isProcessing) return

      const file = e.dataTransfer.files[0]
      if (file) {
        processFile(file)
      }
    },
    [isProcessing, processFile]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        processFile(file)
      }
      e.target.value = ''
    },
    [processFile]
  )

  const handleClick = useCallback(() => {
    if (!isProcessing) {
      fileInputRef.current?.click()
    }
  }, [isProcessing])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isProcessing) return
      
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick()
      }
    },
    [isProcessing, handleClick]
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    isDragging,
    error,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInput,
    handleClick,
    handleKeyDown,
    clearError,
  }
}

