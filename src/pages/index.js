import React from 'react'
import { graphql } from 'gatsby'

import SidebarLayout from '../components/sidebarLayout'
import PostListItem from '../components/postListItem'

/* TODO:
[x] Pick a few typography themes to choose from
[] Decide on a typography theme and remove the others
[] Fix markdown in the posts - use as little HTML as possible
[] yarn add gatsby-remark-embed-video for YouTube vids in the posts
*/

const IndexPage = ({ data, location }) => {
  return (
    <SidebarLayout location={location}>
      <div>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <PostListItem node={node} />
        ))}
      </div>
    </SidebarLayout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(sort: { fields: [fields___postDate], order: DESC }) {
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

export default IndexPage
