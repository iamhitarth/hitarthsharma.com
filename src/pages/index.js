import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data }) => {
  return (
    <div>
      {data.allMarkdownRemark.edges.map(({ node }) => {
        console.log('***Node', node)
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
                  {node.timeToRead || 1} {node.timeToRead > 1 ? 'mins' : 'min'}.
                </h3>
              </div>
              <p>{node.excerpt}</p>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export const query = graphql`
  query IndexQuery {
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
