import React from 'react'
import { render } from 'react-testing-library'
import Header from './header'

describe('Header', () => {
  const siteTitle = 'Hitarth Sharma'
  const { getByText, container } = render(<Header siteTitle={siteTitle} />)

  it('matches snapshot', () => {
    expect(container.firstChild).toMatchSnapshot()
  })

  it('has site title', () => {
    expect(getByText(siteTitle)).not.toBeNull()
  })

  it('has nav links', () => {
    expect(getByText('Home')).not.toBeNull()
    expect(getByText('About')).not.toBeNull()
  })
})
