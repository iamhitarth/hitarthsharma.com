import React from 'react'
import { Link, graphql } from 'gatsby'

import SidebarLayout from '../components/sidebarLayout'

const IndexPage = ({ data, location }) => {
  return (
    <SidebarLayout location={location}>
      <div>
        {data.allMarkdownRemark.edges.map(({ node }) => {
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
                    marginBottom: '1em',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <h3 style={{ display: 'flex' }}>
                    {node.frontmatter.title}{' '}
                    <span style={{ color: '#BBB' }}>
                      — {node.fields.postDate}
                    </span>
                  </h3>
                  <h3 style={{ color: '#BBB' }}>
                    {node.timeToRead || 1}{' '}
                    {node.timeToRead > 1 ? 'mins' : 'min'}.
                  </h3>
                </div>
                <p>{node.excerpt}</p>
              </Link>
            </div>
          )
        })}
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
