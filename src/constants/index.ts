/**
 * Application-wide constants
 */

export const FILE_CONSTRAINTS = {
  MAX_SIZE_BYTES: 10 * 1024 * 1024, // 10MB
  MAX_SIZE_MB: 10,
  ACCEPTED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'] as const,
  ACCEPTED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp', '.gif'] as const,
} as const

export const PALETTE_CONFIG = {
  COLOR_COUNT: 6,
  QUALITY: 10,
  ANIMATION_DELAY_MULTIPLIER: 0.08,
  COPY_FEEDBACK_DURATION_MS: 2000,
} as const

export const COLOR_NAMES = [
  'Primary',
  'Secondary',
  'Accent',
  'Highlight',
  'Complement',
  'Supporting',
] as const

export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  SLOWER: 0.6,
} as const

