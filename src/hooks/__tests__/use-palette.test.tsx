import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { usePalette } from '../use-palette'
import { extractPalette } from '../../utils/palette-extractor'
import { PaletteExtractionError, ImageLoadError } from '../../lib/errors'

// Mock the palette extractor
vi.mock('../../utils/palette-extractor', () => ({
  extractPalette: vi.fn(),
}))

describe('usePalette', () => {
  const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
  const mockSwatches = [
    {
      name: 'Primary',
      hex: '#3b82f6',
      rgb: 'rgb(59, 130, 246)',
      population: 100,
    },
    {
      name: 'Secondary',
      hex: '#10b981',
      rgb: 'rgb(16, 185, 129)',
      population: 90,
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock URL.createObjectURL and revokeObjectURL
    global.URL.createObjectURL = vi.fn(() => 'mock-url')
    global.URL.revokeObjectURL = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('initializes with null palette and no processing state', () => {
    const { result } = renderHook(() => usePalette())

    expect(result.current.palette).toBeNull()
    expect(result.current.isProcessing).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('extracts palette successfully', async () => {
    vi.mocked(extractPalette).mockResolvedValue(mockSwatches)

    const { result } = renderHook(() => usePalette())

    await act(async () => {
      await result.current.extractPaletteFromFile(mockFile)
    })

    await waitFor(() => {
      expect(result.current.isProcessing).toBe(false)
    })

    expect(result.current.palette).not.toBeNull()
    expect(result.current.palette?.swatches).toEqual(mockSwatches)
    expect(result.current.palette?.imageUrl).toBe('mock-url')
    expect(result.current.error).toBeNull()
    expect(extractPalette).toHaveBeenCalledWith(mockFile)
  })

  it('sets processing state during extraction', async () => {
    let resolveExtract: (value: typeof mockSwatches) => void
    const extractPromise = new Promise<typeof mockSwatches>((resolve) => {
      resolveExtract = resolve
    })
    vi.mocked(extractPalette).mockReturnValue(extractPromise)

    const { result } = renderHook(() => usePalette())

    act(() => {
      result.current.extractPaletteFromFile(mockFile)
    })

    await waitFor(() => {
      expect(result.current.isProcessing).toBe(true)
    })

    resolveExtract!(mockSwatches)

    await waitFor(() => {
      expect(result.current.isProcessing).toBe(false)
    })
  })

  it('handles extraction errors', async () => {
    const error = new PaletteExtractionError('Failed to extract')
    vi.mocked(extractPalette).mockRejectedValue(error)

    const { result } = renderHook(() => usePalette())

    await act(async () => {
      await result.current.extractPaletteFromFile(mockFile)
    })

    await waitFor(() => {
      expect(result.current.isProcessing).toBe(false)
    })

    expect(result.current.error).toBe(error)
    expect(result.current.palette).toBeNull()
    // URL.revokeObjectURL is only called if imageUrl was created before error
    // In this case, extractPalette fails before creating the URL, so it won't be called
  })

  it('handles image load errors', async () => {
    const error = new ImageLoadError('Failed to load image')
    vi.mocked(extractPalette).mockRejectedValue(error)

    const { result } = renderHook(() => usePalette())

    await act(async () => {
      await result.current.extractPaletteFromFile(mockFile)
    })

    await waitFor(() => {
      expect(result.current.isProcessing).toBe(false)
    })

    expect(result.current.error).toBe(error)
    expect(result.current.palette).toBeNull()
  })

  it('cleans up object URL on reset', async () => {
    vi.mocked(extractPalette).mockResolvedValue(mockSwatches)

    const { result } = renderHook(() => usePalette())

    // First extract a palette
    await act(async () => {
      await result.current.extractPaletteFromFile(mockFile)
    })

    await waitFor(() => {
      expect(result.current.palette).not.toBeNull()
    })

    // Then reset
    act(() => {
      result.current.resetPalette()
    })

    expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('mock-url')
    expect(result.current.palette).toBeNull()
    expect(result.current.error).toBeNull()
  })

  it('cleans up object URL on unmount', async () => {
    vi.mocked(extractPalette).mockResolvedValue(mockSwatches)

    const { result, unmount } = renderHook(() => usePalette())

    await act(async () => {
      await result.current.extractPaletteFromFile(mockFile)
    })

    await waitFor(() => {
      expect(result.current.palette).not.toBeNull()
    })

    unmount()

    expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('mock-url')
  })

  it('clears error on new extraction attempt', async () => {
    const error = new PaletteExtractionError('First error')
    vi.mocked(extractPalette)
      .mockRejectedValueOnce(error)
      .mockResolvedValueOnce(mockSwatches)

    const { result } = renderHook(() => usePalette())

    // First attempt fails
    await act(async () => {
      await result.current.extractPaletteFromFile(mockFile)
    })

    await waitFor(() => {
      expect(result.current.error).toBe(error)
    })

    // Second attempt succeeds
    await act(async () => {
      await result.current.extractPaletteFromFile(mockFile)
    })

    await waitFor(() => {
      expect(result.current.error).toBeNull()
      expect(result.current.palette).not.toBeNull()
    })
  })
})

