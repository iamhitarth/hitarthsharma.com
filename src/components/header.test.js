import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Header from './header'

describe('Header', () => {
  const siteTitle = 'Hitarth Sharma'

  afterEach(cleanup)

  it('matches snapshot', () => {
    const { container } = render(<Header siteTitle={siteTitle} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('has site title', () => {
    const { getByText } = render(<Header siteTitle={siteTitle} />)
    expect(getByText(siteTitle)).not.toBeNull()
  })

  it('has nav links', () => {
    const { getByText } = render(<Header siteTitle={siteTitle} />)
    expect(getByText('Blog')).not.toBeNull()
    expect(getByText('About')).not.toBeNull()
  })
})
