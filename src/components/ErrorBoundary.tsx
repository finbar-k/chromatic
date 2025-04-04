import { Component, type ReactNode, type ErrorInfo } from 'react'
import { PaletteExtractionError } from '../lib/errors'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary component to catch and handle React errors
 * Provides fallback UI and error reporting
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      const error = this.state.error
      const isKnownError = error instanceof PaletteExtractionError

      return (
        <div className="flex min-h-screen items-center justify-center bg-background-primary px-4">
          <div className="w-full max-w-md rounded-xl border border-error-200 bg-error-50 p-8 text-center shadow-lg">
            <div className="mb-4 text-6xl">⚠️</div>
            <h1 className="mb-2 text-2xl font-semibold text-error-700">
              {isKnownError ? 'Something went wrong' : 'Unexpected Error'}
            </h1>
            <p className="mb-6 text-text-secondary">
              {isKnownError
                ? error.message
                : 'An unexpected error occurred. Please try refreshing the page.'}
            </p>
            <div className="flex gap-4">
              <button
                onClick={this.handleReset}
                type="button"
                className="btn-primary flex-1 rounded-lg px-4 py-2"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                type="button"
                className="btn-secondary flex-1 rounded-lg px-4 py-2"
              >
                Refresh Page
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-text-tertiary">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 overflow-auto rounded bg-neutral-100 p-4 text-xs">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

