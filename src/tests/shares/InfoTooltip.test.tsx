import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { InfoTooltip, InfoTooltipProps } from '../../shares/InfoTooltip'

describe('<InfoTooltip/>', () => {
  it('render as error', () => {
    const info: InfoTooltipProps = {
      status: 'error',
    }
    render(<InfoTooltip status={info.status} />)
    expect(screen.getByRole('alert').classList.contains('text-red-700')).toBe(
      true
    )
  })
})
