import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'

const PostItemMetadataWrapper = styled.h5`
  color: #bbb;
  display: flex;
  justify-content: space-between;
  flex: 1;
  margin-top: 1.175rem;
`

const PostItemTitle = styled.h3`
  margin-top: 1.175rem;
`

const PostItemLink = styled(Link)`
  color: inherit;
`

const PostListItem = ({ node }) => {
  return (
    <PostItemLink to={node.fields.slug}>
      <PostItemTitle data-testid="postTitle">
        {node.frontmatter.title}
      </PostItemTitle>
      <PostItemMetadataWrapper>
        <span data-testid="postDate">{node.fields.postDate}</span>
        <span data-testid="timeToRead">
          {`${node.timeToRead || 1} ${node.timeToRead > 1 ? 'mins' : 'min'}.`}
        </span>
      </PostItemMetadataWrapper>
      <p data-testid="postExcerpt">{node.excerpt}</p>
    </PostItemLink>
  )
}

PostListItem.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
    timeToRead: PropTypes.number.isRequired,
    excerpt: PropTypes.string.isRequired,
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
    fields: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      postDate: PropTypes.string.isRequired,
    }),
  }),
}

export default PostListItem
