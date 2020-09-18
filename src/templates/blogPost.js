import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { useRemarkForm } from 'gatsby-tinacms-remark'
import { usePlugin } from 'tinacms'

import Layout from '../components/layout'
import SocialShare from '../components/socialShare'
import { getURLFormattedTag } from '../utils/tagHelper'

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        url
      }
    }
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      ...TinaRemark
      html
      timeToRead
      excerpt
      frontmatter {
        title
        published
        tags
      }
      fields {
        slug
      }
    }
    journalFooter: markdownRemark(
      fileAbsolutePath: { regex: "/journalFooter/" }
    ) {
      html
    }
    categories: allMarkdownRemark {
      distinct(field: frontmatter___categories)
    }
  }
`

export const PostTitle = styled.h1`
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  padding: 0 2rem;
`

const PostContent = styled.div`
  blockquote {
    text-align: center;
    border-left: none;
    margin-top: 1.45rem;
  }

  figcaption.gatsby-resp-image-figcaption {
    font-size: 0.9rem;
    padding-top: 0.2rem;
  }
`

const PostFooter = styled.div``

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
  const formConfig = {
    id: data.post.fields.slug,
    label: 'Blog Post',
    initialValues: data.post,
    fields: [
      {
        name: 'frontmatter.title',
        label: 'Title',
        component: 'text',
      },
      {
        name: 'frontmatter.published',
        label: 'Published?',
        component: 'toggle',
      },
      {
        name: 'rawMarkdownBody',
        label: 'Content',
        component: 'markdown',
      },
      {
        name: 'frontmatter.categories',
        label: 'Categories',
        component: 'list',
        defaultItem: data.categories.distinct[0],
        field: {
          component: 'select',
          options: data.categories.distinct,
        },
      },
      {
        name: 'frontmatter.tags',
        label: 'Tags',
        component: 'list',
        field: {
          component: 'text',
        },
      },
    ],
  }

  // Create the TinaCMS form and register it
  const [post, form] = useRemarkForm(data.post, formConfig)
  usePlugin(form)

  const { journalFooter } = data
  const siteUrl = data.site.siteMetadata.url
  const postUrl = `${siteUrl}/${post.fields.slug}`
  const { title, tags } = post.frontmatter
  const footerHtml = post.fields.slug.includes('journal-')
    ? journalFooter.html
    : null

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
            content: `hitarth, sharma, coach, blog, software, engineer${
              tags && tags.length > 0 ? `, ${tags.join(', ')}` : ''
            }`,
          },
        ]}
      />
      <div>
        <PostTitle>{title}</PostTitle>
        <PostContent dangerouslySetInnerHTML={{ __html: post.html }} />
        <PostFooter dangerouslySetInnerHTML={{ __html: footerHtml }} />
        <SocialShare title={title} url={postUrl} excerpt={post.excerpt} />
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
