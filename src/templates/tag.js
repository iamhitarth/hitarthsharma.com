import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import SidebarLayout from '../components/sidebarLayout'
import PostListItem from '../components/postListItem'

/* TODO: https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/
Display tags on the posts page
Add tags to all posts
Style tags page - better styling for individual tags and responsive
*/

const SeeAllTagsWrapper = styled.div`
  padding-bottom: 0.5rem;
`

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
        <SeeAllTagsWrapper>
          <Link to="/tags">See all tags</Link>
        </SeeAllTagsWrapper>
        <div>
          {edges.map(({ node }) => (
            <PostListItem node={node} />
          ))}
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
