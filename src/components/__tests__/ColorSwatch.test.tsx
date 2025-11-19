import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../../test/utils/test-utils'
import userEvent from '@testing-library/user-event'
import ColorSwatch from '../ColorSwatch'
import type { ColorSwatch as ColorSwatchType } from '../../types'

const mockCopyToClipboard = vi.fn().mockResolvedValue(undefined)

// Mock the clipboard hook
vi.mock('../../hooks/use-clipboard', () => ({
  useClipboard: () => ({
    copied: false,
    copyToClipboard: mockCopyToClipboard,
  }),
}))

describe('ColorSwatch', () => {
  const mockSwatch: ColorSwatchType = {
    name: 'Primary',
    hex: '#3b82f6',
    rgb: 'rgb(59, 130, 246)',
    population: 100,
  }

  beforeEach(() => {
    mockCopyToClipboard.mockClear()
  })

  it('renders color swatch with correct information', () => {
    render(<ColorSwatch swatch={mockSwatch} index={0} />)

    expect(screen.getByText('Primary')).toBeInTheDocument()
    expect(screen.getByText('#3b82f6')).toBeInTheDocument()
    expect(screen.getByText('rgb(59, 130, 246)')).toBeInTheDocument()
  })

  it('has correct background color', () => {
    render(<ColorSwatch swatch={mockSwatch} index={0} />)

    const button = screen.getByRole('button')
    expect(button).toHaveStyle({ backgroundColor: '#3b82f6' })
  })

  it('has accessible label', () => {
    render(<ColorSwatch swatch={mockSwatch} index={0} />)

    const button = screen.getByLabelText(
      /copy primary color #3b82f6 to clipboard/i
    )
    expect(button).toBeInTheDocument()
  })

  it('calls copy function when clicked', async () => {
    const user = userEvent.setup()
    render(<ColorSwatch swatch={mockSwatch} index={0} />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(mockCopyToClipboard).toHaveBeenCalledWith('#3b82f6')
  })
})

