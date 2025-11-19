/**
 * Design tokens for the application
 * Provides a single source of truth for colors, spacing, typography, and other design values
 * 
 * All values are designed to meet WCAG AA contrast requirements
 */

export const designTokens = {
  // Color palette - semantic naming
  colors: {
    // Primary brand colors
    primary: {
      50: '210 100% 98%',   // Lightest - for backgrounds
      100: '210 100% 95%',
      200: '210 96% 90%',
      300: '210 94% 82%',
      400: '210 91% 71%',
      500: '210 100% 50%',   // Base primary
      600: '210 100% 45%',   // Hover states
      700: '210 100% 40%',   // Active states
      800: '210 100% 35%',
      900: '210 100% 25%',   // Darkest
      950: '210 100% 15%',
    },
    
    // Secondary/accent colors
    accent: {
      50: '180 100% 98%',
      100: '180 100% 95%',
      200: '180 96% 90%',
      300: '180 94% 82%',
      400: '180 91% 71%',
      500: '180 100% 50%',
      600: '180 100% 45%',
      700: '180 100% 40%',
      800: '180 100% 35%',
      900: '180 100% 25%',
      950: '180 100% 15%',
    },
    
    // Neutral grays - semantic naming
    neutral: {
      50: '210 20% 98%',
      100: '210 20% 96%',
      200: '210 20% 90%',
      300: '210 20% 82%',
      400: '210 20% 64%',
      500: '210 20% 45%',
      600: '210 20% 35%',
      700: '210 20% 25%',
      800: '210 20% 15%',
      900: '210 20% 10%',
      950: '210 20% 5%',
    },
    
    // Semantic colors
    success: {
      50: '142 76% 96%',
      100: '142 76% 91%',
      500: '142 71% 45%',
      600: '142 71% 40%',
      700: '142 71% 35%',
    },
    
    error: {
      50: '0 84% 97%',
      100: '0 84% 94%',
      200: '0 84% 90%',
      500: '0 84% 60%',
      600: '0 72% 51%',
      700: '0 72% 45%',
    },
    
    warning: {
      50: '38 92% 96%',
      100: '38 92% 91%',
      500: '38 92% 50%',
      600: '38 92% 45%',
      700: '38 92% 40%',
    },
    
    info: {
      50: '199 89% 96%',
      100: '199 89% 91%',
      500: '199 89% 48%',
      600: '199 89% 43%',
      700: '199 89% 38%',
    },
  },
  
  // Spacing scale (based on 4px base unit)
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
  },
  
  // Border radius scale
  radius: {
    none: '0',
    sm: '0.25rem',    // 4px
    base: '0.5rem',   // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    '3xl': '3rem',    // 48px
    full: '9999px',
  },
  
  // Typography scale
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],      // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],  // 36px
    '5xl': ['3rem', { lineHeight: '1' }],          // 48px
  },
  
  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  // Shadows - elevation system
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none',
  },
  
  // Z-index scale
  zIndex: {
    base: '0',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    modalBackdrop: '1040',
    modal: '1050',
    popover: '1060',
    tooltip: '1070',
  },
  
  // Transitions
  transition: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
      slower: '500ms',
    },
    timing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  
  // Opacity values
  opacity: {
    disabled: '0.5',
    hover: '0.8',
    focus: '0.2',
    overlay: '0.9',
  },
} as const

/**
 * Semantic color mappings for application use
 * These map to the design tokens above
 */
export const semanticColors = {
  // Background colors
  background: {
    primary: 'var(--color-background-primary)',
    secondary: 'var(--color-background-secondary)',
    tertiary: 'var(--color-background-tertiary)',
    hover: 'var(--color-background-hover)',
    active: 'var(--color-background-active)',
  },
  
  // Text colors
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    tertiary: 'var(--color-text-tertiary)',
    disabled: 'var(--color-text-disabled)',
    inverse: 'var(--color-text-inverse)',
  },
  
  // Border colors
  border: {
    default: 'var(--color-border-default)',
    hover: 'var(--color-border-hover)',
    focus: 'var(--color-border-focus)',
    error: 'var(--color-border-error)',
  },
  
  // Interactive states
  interactive: {
    primary: 'var(--color-interactive-primary)',
    primaryHover: 'var(--color-interactive-primary-hover)',
    primaryActive: 'var(--color-interactive-primary-active)',
    secondary: 'var(--color-interactive-secondary)',
    secondaryHover: 'var(--color-interactive-secondary-hover)',
  },
} as const

