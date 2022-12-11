import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { InfoTooltip, InfoTooltipProps } from '../../shares/InfoTooltip'

describe('<InfoTooltip/>', () => {
  it('render as error', () => {
    // ARRANGE
    const info: InfoTooltipProps = {
      status: 'error',
    }
    render(<InfoTooltip status={info.status} />)
    // ACT
    // EXPECT
    expect(screen.getByRole('alert')).toHaveClass('text-red-700')
  })

  it('render as success', () => {
    // ARRANGE
    const info: InfoTooltipProps = {
      status: 'success',
    }
    render(<InfoTooltip status={info.status} />)
    // ACT
    // EXPECT
    expect(screen.getByRole('alert')).toHaveClass('text-green-700')
  })

  it('show a message', () => {
    // ARRANGE
    const info: InfoTooltipProps = {
      status: 'success',
      message: 'Message',
    }
    render(<InfoTooltip status={info.status} message={info.message} />)

    // ACT
    // EXPECT
    expect(screen.getByRole('alert')).toHaveTextContent(info.message as string)
  })
})
