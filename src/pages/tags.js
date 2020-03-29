import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import { getURLFormattedTag } from '../utils/tagHelper'

import SidebarLayout from '../components/sidebarLayout'

const TagsHeading = styled.h1`
  text-align: center;
  margin: 0rem 0 1.5rem 0;
`

const TagsList = styled.ul`
  display: inline-flex;
  justify-content: center;
  flex-wrap: wrap;

  li {
    list-style-type: none;
    padding: 0.25rem;
    margin: 0.25rem;
    white-space: nowrap;
    border: solid 1px #ccc;
    border-radius: 0.25rem;
  }
`

const TagLink = styled(Link)`
  background: none;
`

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
      <TagsHeading>Tags</TagsHeading>
      <TagsList>
        {group.map((tag) => (
          <li key={tag.fieldValue}>
            <TagLink to={`/tags/${getURLFormattedTag(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </TagLink>
          </li>
        ))}
      </TagsList>
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
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "//posts//" }
        frontmatter: { isDraft: { ne: true } }
      }
      limit: 2000
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
