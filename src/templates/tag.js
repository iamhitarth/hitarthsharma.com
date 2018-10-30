import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import SidebarLayout from '../components/sidebarLayout'
import PostListItem from '../components/postListItem'

/* TODO: https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/
Make tags appear separately on the tags page
Figure out why tags for posts are appearing as a giant bunch and one tag only
Split them out
Display them on the posts page
*/

const Tag = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

  return (
    <SidebarLayout location={location}>
      <div>
        <h1>{tagHeader}</h1>
        <div style={{ paddingBottom: '1.25rem' }}>
          <Link to="/tags">See all tags</Link>
        </div>
        <div>
          {edges.map(({ node }) => (
            <PostListItem node={node} />
          ))}
          {/*
              This links to a page that does not yet exist.
              We'll come back to it!
            */}
        </div>
      </div>
    </SidebarLayout>
  )
}

Tag.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
    tagRegex: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
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
        }).isRequired
      ),
    }),
  }),
}

export default Tag

export const pageQuery = graphql`
  query($tagRegex: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___postDate], order: DESC }
      filter: { frontmatter: { tags: { regex: $tagRegex } } }
    ) {
      totalCount
      edges {
        node {
          id
          timeToRead
          excerpt
          frontmatter {
            title
          }
          fields {
            slug
            postDate
          }
        }
      }
    }
  }
`
