import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Layout from '../components/layout'

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
      }
    }
  }
`

const PostWrapper = styled.div`
  h2 {
    margin-bottom: 1.5rem;
  }
`

export default ({ data, location }) => {
  const post = data.markdownRemark
  return (
    <Layout location={location}>
      <Helmet
        title={
          post.frontmatter.title
            ? `${post.frontmatter.title} - ${data.site.siteMetadata.title}`
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
      <PostWrapper>
        <h2>{post.frontmatter.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </PostWrapper>
    </Layout>
  )
}
