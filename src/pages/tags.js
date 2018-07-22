import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import SidebarLayout from '../components/sidebarLayout'

/*
TODO: This page needs to be fixed as it's displaying but the tags are
not showing up as individual tags and instead ALL the tags for each of
the posts are showing up as individual tags.
This might be a result of the way we've got the tags stored in the posts.
The information we are after is how many posts is a tag used on and what 
those posts are.
Turning them into an array might be the easiest option but it will also 
result in a change to gatsby-node.js and the tags.js template.
So that's some food for thought.
*/

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
  location,
}) => (
  <SidebarLayout location={location}>
    <div>
      <h1>Tags</h1>
      <ul>
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${tag.fieldValue}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </SidebarLayout>
)

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
