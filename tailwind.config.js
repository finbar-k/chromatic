/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          50: 'hsl(var(--color-primary-50))',
          100: 'hsl(var(--color-primary-100))',
          200: 'hsl(var(--color-primary-200))',
          300: 'hsl(var(--color-primary-300))',
          400: 'hsl(var(--color-primary-400))',
          500: 'hsl(var(--color-primary-500))',
          600: 'hsl(var(--color-primary-600))',
          700: 'hsl(var(--color-primary-700))',
          800: 'hsl(var(--color-primary-800))',
          900: 'hsl(var(--color-primary-900))',
          950: 'hsl(var(--color-primary-950))',
          DEFAULT: 'hsl(var(--color-primary-500))',
        },
        // Accent colors
        accent: {
          50: 'hsl(var(--color-accent-50))',
          100: 'hsl(var(--color-accent-100))',
          200: 'hsl(var(--color-accent-200))',
          300: 'hsl(var(--color-accent-300))',
          400: 'hsl(var(--color-accent-400))',
          500: 'hsl(var(--color-accent-500))',
          600: 'hsl(var(--color-accent-600))',
          700: 'hsl(var(--color-accent-700))',
          DEFAULT: 'hsl(var(--color-accent-500))',
        },
        // Neutral grays
        neutral: {
          50: 'hsl(var(--color-neutral-50))',
          100: 'hsl(var(--color-neutral-100))',
          200: 'hsl(var(--color-neutral-200))',
          300: 'hsl(var(--color-neutral-300))',
          400: 'hsl(var(--color-neutral-400))',
          500: 'hsl(var(--color-neutral-500))',
          600: 'hsl(var(--color-neutral-600))',
          700: 'hsl(var(--color-neutral-700))',
          800: 'hsl(var(--color-neutral-800))',
          900: 'hsl(var(--color-neutral-900))',
          950: 'hsl(var(--color-neutral-950))',
        },
        // Semantic colors
        success: {
          50: 'hsl(var(--color-success-50))',
          500: 'hsl(var(--color-success-500))',
          600: 'hsl(var(--color-success-600))',
        },
        error: {
          50: 'hsl(var(--color-error-50))',
          100: 'hsl(var(--color-error-100))',
          200: 'hsl(var(--color-error-200))',
          500: 'hsl(var(--color-error-500))',
          600: 'hsl(var(--color-error-600))',
          700: 'hsl(var(--color-error-700))',
        },
        warning: {
          50: 'hsl(var(--color-warning-50))',
          500: 'hsl(var(--color-warning-500))',
        },
        info: {
          50: 'hsl(var(--color-info-50))',
          500: 'hsl(var(--color-info-500))',
        },
        // Semantic application colors
        background: {
          primary: 'var(--color-background-primary)',
          secondary: 'var(--color-background-secondary)',
          tertiary: 'var(--color-background-tertiary)',
          hover: 'var(--color-background-hover)',
          active: 'var(--color-background-active)',
          DEFAULT: 'var(--color-background-primary)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          disabled: 'var(--color-text-disabled)',
          inverse: 'var(--color-text-inverse)',
          DEFAULT: 'var(--color-text-primary)',
        },
        border: {
          default: 'var(--color-border-default)',
          hover: 'var(--color-border-hover)',
          focus: 'var(--color-border-focus)',
          error: 'var(--color-border-error)',
          DEFAULT: 'var(--color-border-default)',
        },
        interactive: {
          primary: 'var(--color-interactive-primary)',
          'primary-hover': 'var(--color-interactive-primary-hover)',
          'primary-active': 'var(--color-interactive-primary-active)',
          secondary: 'var(--color-interactive-secondary)',
          'secondary-hover': 'var(--color-interactive-secondary-hover)',
        },
        // Legacy support
        foreground: 'hsl(var(--foreground))',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      transitionDuration: {
        fast: 'var(--transition-fast)',
        base: 'var(--transition-base)',
        slow: 'var(--transition-slow)',
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

