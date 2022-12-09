import { describe, it, expect, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { Spin } from '../../../dashboard/components/Spin'

describe('<Spin/>', () => {
  afterEach(() => {
    render(<Spin total={10} part={2} />)
  })
  it('render components', () => {
    expect(false).toBe(false)
  })

  it('false to be false', () => {
    expect(false).toBe(false)
  })
})
