import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Layout from '../components/layout'
import { getURLFormattedTag } from '../utils/tagHelper'

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        title
        tags
      }
    }
  }
`

export const PostTitle = styled.h1`
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  padding: 0 2rem;
`

const PostTagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  span {
    white-space: nowrap;
    margin-right: 0.25rem;
  }

  @media (max-width: 900px) {
    justify-content: center;
  }
`

export default ({ data, location }) => {
  const post = data.markdownRemark
  const { title, tags } = post.frontmatter
  return (
    <Layout location={location}>
      <Helmet
        title={
          title
            ? `${title} - ${data.site.siteMetadata.title}`
            : `${data.site.siteMetadata.title}`
        }
        meta={[
          { name: 'description', content: "Hitarth Sharma's site" },
          {
            name: 'keywords',
            content: 'hitarth, sharma, blog, software, engineer',
          },
        ]}
      />
      <div>
        <PostTitle>{title}</PostTitle>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        {tags && (
          <PostTagsWrapper>
            <span>
              <strong>More on:</strong>
            </span>
            {tags.sort().map((tag, index) => (
              <span key={tag}>
                <Link to={`/tags/${getURLFormattedTag(tag)}/`}>{tag}</Link>
                {index === tags.length - 1 ? `.` : `,`}
              </span>
            ))}
          </PostTagsWrapper>
        )}
      </div>
    </Layout>
  )
}
