import React from 'react'
import { graphql } from 'gatsby'

import SidebarLayout from '../components/sidebarLayout'
import PostListItem from '../components/postListItem'

const DraftsPage = ({ data, location }) => {
  return (
    <SidebarLayout location={location}>
      <div>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <PostListItem key={node.id} node={node} />
        ))}
      </div>
    </SidebarLayout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "//posts//" }
        frontmatter: { isDraft: { eq: true } }
      }
      sort: { fields: [fields___postDate], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
          }
          excerpt
          html
          timeToRead
          fields {
            slug
            postDate(formatString: "DD MMMM, YYYY")
          }
        }
      }
    }
  }
`

export default DraftsPage
