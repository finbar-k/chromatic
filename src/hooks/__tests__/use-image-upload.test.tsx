import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useImageUpload } from '../use-image-upload'
import { validateFile } from '../../utils/file-validator'

// Mock the file validator
vi.mock('../../utils/file-validator', () => ({
  validateFile: vi.fn(),
}))

describe('useImageUpload', () => {
  const mockOnFileSelect = vi.fn()
  const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
  const mockInvalidFile = new File(['test'], 'test.pdf', {
    type: 'application/pdf',
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initializes with correct default state', () => {
    const { result } = renderHook(() =>
      useImageUpload(mockOnFileSelect, false)
    )

    expect(result.current.isDragging).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.fileInputRef).toBeDefined()
  })

  describe('drag and drop', () => {
    it('sets dragging state on drag over', () => {
      const { result } = renderHook(() =>
        useImageUpload(mockOnFileSelect, false)
      )

      const dragEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as React.DragEvent

      act(() => {
        result.current.handleDragOver(dragEvent)
      })

      expect(result.current.isDragging).toBe(true)
      expect(dragEvent.preventDefault).toHaveBeenCalled()
      expect(dragEvent.stopPropagation).toHaveBeenCalled()
    })

    it('does not set dragging when processing', () => {
      const { result } = renderHook(() =>
        useImageUpload(mockOnFileSelect, true)
      )

      const dragEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      } as unknown as React.DragEvent

      act(() => {
        result.current.handleDragOver(dragEvent)
      })

      expect(result.current.isDragging).toBe(false)
    })

    it('clears dragging state on drag leave', () => {
      const { result } = renderHook(() =>
        useImageUpload(mockOnFileSelect, false)
      )

      act(() => {
        result.current.handleDragOver({
          preventDefault: vi.fn(),
          stopPropagation: vi.fn(),
        } as unknown as React.DragEvent)
      })

      expect(result.current.isDragging).toBe(true)

      act(() => {
        result.current.handleDragLeave({
          preventDefault: vi.fn(),
          stopPropagation: vi.fn(),
        } as unknown as React.DragEvent)
      })

      expect(result.current.isDragging).toBe(false)
    })

    it('processes file on drop', () => {
      vi.mocked(validateFile).mockReturnValue({ success: true })

      const { result } = renderHook(() =>
        useImageUpload(mockOnFileSelect, false)
      )

      const dropEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        dataTransfer: {
          files: [mockFile],
        },
      } as unknown as React.DragEvent

      act(() => {
        result.current.handleDrop(dropEvent)
      })

      expect(result.current.isDragging).toBe(false)
      expect(validateFile).toHaveBeenCalledWith(mockFile)
      expect(mockOnFileSelect).toHaveBeenCalledWith(mockFile)
    })

    it('does not process file on drop when processing', () => {
      vi.mocked(validateFile).mockReturnValue({ success: true })

      const { result } = renderHook(() =>
        useImageUpload(mockOnFileSelect, true)
      )

      const dropEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        dataTransfer: {
          files: [mockFile],
        },
      } as unknown as React.DragEvent

      act(() => {
        result.current.handleDrop(dropEvent)
      })

      expect(validateFile).not.toHaveBeenCalled()
      expect(mockOnFileSelect).not.toHaveBeenCalled()
    })
  })

  describe('file validation', () => {
    it('calls onFileSelect for valid file', () => {
      vi.mocked(validateFile).mockReturnValue({ success: true })

      const { result } = renderHook(() =>
        useImageUpload(mockOnFileSelect, false)
      )

      const changeEvent = {
        target: {
          files: [mockFile],
          value: '',
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>

      act(() => {
        result.current.handleFileInput(changeEvent)
      })

      expect(validateFile).toHaveBeenCalledWith(mockFile)
      expect(mockOnFileSelect).toHaveBeenCalledWith(mockFile)
      expect(result.current.error).toBeNull()
    })

    it('sets error for invalid file', () => {
      vi.mocked(validateFile).mockReturnValue({
        success: false,
        error: 'Invalid file type',
      })

      const { result } = renderHook(() =>
        useImageUpload(mockOnFileSelect, false)
      )

      const changeEvent = {
        target: {
          files: [mockInvalidFile],
          value: '',
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>

      act(() => {
        result.current.handleFileInput(changeEvent)
      })

      expect(validateFile).toHaveBeenCalledWith(mockInvalidFile)
      expect(mockOnFileSelect).not.toHaveBeenCalled()
      expect(result.current.error).toBe('Invalid file type')
    })

    it('clears error on new file selection', () => {
      vi.mocked(validateFile)
        .mockReturnValueOnce({
          success: false,
          error: 'First error',
        })
        .mockReturnValueOnce({ success: true })

      const { result } = renderHook(() =>
        useImageUpload(mockOnFileSelect, false)
      )

      // First attempt - invalid
      act(() => {
        result.current.handleFileInput({
          target: {
            files: [mockInvalidFile],
            value: '',
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>)
      })

      expect(result.current.error).toBe('First error')

      // Second attempt - valid
      act(() => {
        result.current.handleFileInput({
          target: {
            files: [mockFile],
            value: '',
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>)
      })

      expect(result.current.error).toBeNull()
    })
  })

  describe('keyboard interaction', () => {
    it('triggers file input on Enter key', () => {
      const { result } = renderHook(() =>
        useImageUpload(mockOnFileSelect, false)
      )

      // Create a mock element with click method
      const mockElement = {
        click: vi.fn(),
      }
      result.current.fileInputRef.current = mockElement as unknown as HTMLInputElement

      const keyEvent = {
        key: 'Enter',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent

      act(() => {
        result.current.handleKeyDown(keyEvent)
      })

      expect(keyEvent.preventDefault).toHaveBeenCalled()
      expect(mockElement.click).toHaveBeenCalled()
    })

    it('triggers file input on Space key', () => {
      const { result } = renderHook(() =>
        useImageUpload(mockOnFileSelect, false)
      )

      // Create a mock element with click method
      const mockElement = {
        click: vi.fn(),
      }
      result.current.fileInputRef.current = mockElement as unknown as HTMLInputElement

      const keyEvent = {
        key: ' ',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent

      act(() => {
        result.current.handleKeyDown(keyEvent)
      })

      expect(keyEvent.preventDefault).toHaveBeenCalled()
      expect(mockElement.click).toHaveBeenCalled()
    })

    it('does not trigger when processing', () => {
      const { result } = renderHook(() =>
        useImageUpload(mockOnFileSelect, true)
      )

      const keyEvent = {
        key: 'Enter',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent

      act(() => {
        result.current.handleKeyDown(keyEvent)
      })

      // Should not prevent default or trigger click when processing
      expect(keyEvent.preventDefault).not.toHaveBeenCalled()
    })
  })

  describe('error handling', () => {
    it('clears error when clearError is called', () => {
      vi.mocked(validateFile).mockReturnValue({
        success: false,
        error: 'Some error',
      })

      const { result } = renderHook(() =>
        useImageUpload(mockOnFileSelect, false)
      )

      act(() => {
        result.current.handleFileInput({
          target: {
            files: [mockInvalidFile],
            value: '',
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>)
      })

      expect(result.current.error).toBe('Some error')

      act(() => {
        result.current.clearError()
      })

      expect(result.current.error).toBeNull()
    })
  })
})

