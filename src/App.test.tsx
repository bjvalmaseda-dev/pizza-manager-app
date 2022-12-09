import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Spin } from './dashboard/components/Spin'

describe('something truthy and falsy', () => {
  render(<Spin total={10} part={2} />)
  it('true to be true', () => {
    expect(true).toBe(true)
  })

  it('false to be false', () => {
    expect(false).toBe(false)
  })
})
