/**
 * Custom error classes for better error handling and type safety
 */

export class PaletteExtractionError extends Error {
  public readonly cause?: unknown

  constructor(message: string, cause?: unknown) {
    super(message)
    this.name = 'PaletteExtractionError'
    this.cause = cause
    Object.setPrototypeOf(this, PaletteExtractionError.prototype)
  }
}

export class ImageLoadError extends PaletteExtractionError {
  constructor(message = 'Failed to load image', cause?: unknown) {
    super(message, cause)
    this.name = 'ImageLoadError'
    Object.setPrototypeOf(this, ImageLoadError.prototype)
  }
}

export class FileValidationError extends Error {
  public readonly field?: string

  constructor(message: string, field?: string) {
    super(message)
    this.name = 'FileValidationError'
    this.field = field
    Object.setPrototypeOf(this, FileValidationError.prototype)
  }
}

export class ClipboardError extends Error {
  public readonly cause?: unknown

  constructor(message = 'Failed to copy to clipboard', cause?: unknown) {
    super(message)
    this.name = 'ClipboardError'
    this.cause = cause
    Object.setPrototypeOf(this, ClipboardError.prototype)
  }
}

