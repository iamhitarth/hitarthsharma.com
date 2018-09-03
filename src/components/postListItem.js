import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const PostListItem = ({ node }) => {
  return (
    <div key={node.id}>
      <Link
        to={node.fields.slug}
        style={{
          textDecoration: `none`,
          color: `inherit`,
          fontWeight: `normal`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <h3 style={{ display: 'flex' }}>
            {node.frontmatter.title}{' '}
            <span style={{ color: '#BBB' }}>— {node.fields.postDate}</span>
          </h3>
          <h3 style={{ color: '#BBB' }}>
            {node.timeToRead || 1} {node.timeToRead > 1 ? 'mins' : 'min'}.
          </h3>
        </div>
        <p>{node.excerpt}</p>
      </Link>
    </div>
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
