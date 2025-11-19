import { describe, it, expect } from 'vitest'
import { validateFile } from '../file-validator'
import { FILE_CONSTRAINTS } from '../../constants'

describe('validateFile', () => {
  const createMockFile = (
    name: string,
    _size: number,
    type: string
  ): File => {
    const file = new File([''], name, { type })
    // Mock the size property
    Object.defineProperty(file, 'size', {
      value: _size,
      writable: false,
    })
    return file
  }

  it('accepts valid image file', () => {
    const file = createMockFile('test.jpg', 1024 * 1024, 'image/jpeg')
    const result = validateFile(file)

    expect(result.success).toBe(true)
    expect(result.error).toBeUndefined()
  })

  it('rejects file that is too large', () => {
    const file = createMockFile(
      'large.jpg',
      FILE_CONSTRAINTS.MAX_SIZE_BYTES + 1,
      'image/jpeg'
    )
    const result = validateFile(file)

    expect(result.success).toBe(false)
    expect(result.error).toContain('10MB')
  })

  it('rejects invalid file type', () => {
    const file = createMockFile('document.pdf', 1024, 'application/pdf')
    const result = validateFile(file)

    expect(result.success).toBe(false)
    expect(result.error).toContain('image')
  })

  it('accepts PNG files', () => {
    const file = createMockFile('test.png', 1024, 'image/png')
    const result = validateFile(file)

    expect(result.success).toBe(true)
  })

  it('accepts WebP files', () => {
    const file = createMockFile('test.webp', 1024, 'image/webp')
    const result = validateFile(file)

    expect(result.success).toBe(true)
  })

  it('accepts GIF files', () => {
    const file = createMockFile('test.gif', 1024, 'image/gif')
    const result = validateFile(file)

    expect(result.success).toBe(true)
  })
})

