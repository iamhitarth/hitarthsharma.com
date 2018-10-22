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

  const { getByTestId, container } = render(<PostListItem node={node} />)

  it('matches snapshot', () => {
    expect(container.firstChild).toMatchSnapshot()
  })

  it('displays post title', () => {
    expect(getByTestId('postTitle')).toHaveTextContent(node.frontmatter.title)
  })

  it('displays post date', () => {
    expect(getByTestId('postDate')).toHaveTextContent(node.fields.postDate)
  })

  it('displays read time', () => {
    expect(getByTestId('timeToRead')).toHaveTextContent(
      `${node.timeToRead} mins.`
    )
  })

  it('displays post excerpt', () => {
    expect(getByTestId('postExcerpt')).toHaveTextContent(node.excerpt)
  })
})
