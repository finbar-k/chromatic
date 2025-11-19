import { useState, useCallback, useRef, useEffect } from 'react'
import { ClipboardError } from '../lib/errors'
import { PALETTE_CONFIG } from '../constants'

interface UseClipboardReturn {
  copied: boolean
  copyToClipboard: (text: string) => Promise<void>
}

/**
 * Custom hook for clipboard operations with user feedback
 * Provides copied state and handles clipboard API errors gracefully
 */
export function useClipboard(): UseClipboardReturn {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const copyToClipboard = useCallback(async (text: string) => {
    if (!navigator.clipboard) {
      throw new ClipboardError('Clipboard API not available')
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        setCopied(false)
        timeoutRef.current = null
      }, PALETTE_CONFIG.COPY_FEEDBACK_DURATION_MS)
    } catch (err) {
      throw new ClipboardError('Failed to copy to clipboard', err)
    }
  }, [])

  return {
    copied,
    copyToClipboard,
  }
}

