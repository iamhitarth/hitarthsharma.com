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
        <h3 style={{ marginTop: '1.175rem' }}>{node.frontmatter.title}</h3>
        <h5
          style={{
            color: '#BBB',
            display: 'flex',
            justifyContent: 'space-between',
            flex: 1,
            marginTop: '1.175rem',
          }}
        >
          <span>{node.fields.postDate}</span>
          <span>
            {`${node.timeToRead || 1} ${node.timeToRead > 1 ? 'mins' : 'min'}.`}
          </span>
        </h5>
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
