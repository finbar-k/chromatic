import { z } from 'zod'
import { FILE_CONSTRAINTS } from '../constants'

/**
 * Zod schema for file validation
 * Validates file type and size constraints
 */
export const fileSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= FILE_CONSTRAINTS.MAX_SIZE_BYTES,
    {
      message: `File size must be less than ${FILE_CONSTRAINTS.MAX_SIZE_MB}MB`,
    }
  )
  .refine(
    (file) => FILE_CONSTRAINTS.ACCEPTED_TYPES.includes(file.type as typeof FILE_CONSTRAINTS.ACCEPTED_TYPES[number]),
    {
      message: 'File must be an image (JPEG, PNG, WebP, or GIF)',
    }
  )

export interface FileValidationResult {
  success: boolean
  error?: string
}

/**
 * Validates a file against size and type constraints
 * @param file - The file to validate
 * @returns Validation result with success status and optional error message
 */
export function validateFile(file: File): FileValidationResult {
  const result = fileSchema.safeParse(file)

  if (!result.success) {
    const firstIssue = result.error.issues[0]
    return {
      success: false,
      error: firstIssue?.message || 'Invalid file',
    }
  }

  return { success: true }
}

