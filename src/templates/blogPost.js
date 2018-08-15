import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        title
      }
    }
  }
`

export default ({ data, location }) => {
  /* const images = window.document.getElementsByClassName('gatsby-resp-image-figure')
  for(let i = 0; i < images.length; i++) {
    images[i].style.textAlign = 'center';
  } */
  const post = data.markdownRemark
  return (
    <Layout location={location}>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}
