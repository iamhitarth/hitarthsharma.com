import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import SidebarLayout from '../components/sidebarLayout'

const Category = ({ pageContext, data, location }) => {
  const { category } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  console.log('Category on the page is ', data)
  return (
    <SidebarLayout location={location}>
      This is a category template
    </SidebarLayout>
  )
}

Category.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
    categoryRegex: PropTypes.string.isRequired,
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

export default Category

export const pageQuery = graphql`
  query($categoryRegex: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___postDate], order: DESC }
      filter: { frontmatter: { categories: { regex: $categoryRegex } } }
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
