import React from 'react'
import { render } from 'react-testing-library'
import PostListItem from './postListItem'

describe('Post list item', () => {
  const node = {
    id: '1',
    timeToRead: 3,
    excerpt: 'This is the excerpt',
    frontmatter: {
      title: 'My test post',
    },
    fields: {
      slug: 'my-test-post',
      postDate: '21 October, 2018',
    },
  }

  const { getByText, container } = render(<PostListItem node={node} />)

  it('matches snapshot', () => {
    expect(container.firstChild).toMatchSnapshot()
  })

  it('displays post title', () => {
    expect(getByText(node.frontmatter.title)).not.toBeNull()
  })

  it('displays post date', () => {
    expect(getByText('21 October, 2018')).not.toBeNull()
  })

  it('displays read time', () => {
    expect(getByText(`${node.timeToRead} mins.`)).not.toBeNull()
  })

  it('displays post excerpt', () => {
    expect(getByText(node.excerpt)).not.toBeNull()
  })
})
