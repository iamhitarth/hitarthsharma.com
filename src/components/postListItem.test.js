import React from 'react'
import { render, cleanup } from '@testing-library/react'
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

  afterEach(cleanup)

  it('matches snapshot', () => {
    const { container } = render(<PostListItem node={node} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('displays post title', () => {
    const { getByTestId } = render(<PostListItem node={node} />)
    expect(getByTestId('postTitle')).toHaveTextContent(node.frontmatter.title)
  })

  it('displays post date', () => {
    const { getByTestId } = render(<PostListItem node={node} />)
    expect(getByTestId('postDate')).toHaveTextContent(node.fields.postDate)
  })

  it('displays read time', () => {
    const { getByTestId } = render(<PostListItem node={node} />)
    expect(getByTestId('timeToRead')).toHaveTextContent(
      `${node.timeToRead} mins.`
    )
  })

  it('displays post excerpt', () => {
    const { getByTestId } = render(<PostListItem node={node} />)
    expect(getByTestId('postExcerpt')).toHaveTextContent(node.excerpt)
  })
})
