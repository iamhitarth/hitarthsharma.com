import React from 'react'
import { graphql } from 'gatsby'
import { RemarkCreatorPlugin } from 'gatsby-tinacms-remark'
import { withPlugin } from 'tinacms'

import SidebarLayout from '../components/sidebarLayout'
import PostListItem from '../components/postListItem'

const DraftsPage = ({ data, location }) => {
  return (
    <SidebarLayout location={location}>
      <div>
        {data.posts.edges.map(({ node }) => (
          <PostListItem key={node.id} node={node} />
        ))}
      </div>
    </SidebarLayout>
  )
}

const getJournalFileName = (foldername) => {
  const [date, title] = foldername.split('--')
  return `src/posts/${date}--journal-${title}/index.md`
}

const CreatePostPlugin = new RemarkCreatorPlugin({
  label: 'New Blog Post',
  filename: (form) => {
    return form.isJournal
      ? getJournalFileName(form.foldername)
      : `src/posts/${form.foldername}/index.md`
  },
  fields: [
    {
      name: 'foldername',
      component: 'text',
      label: 'Folder name',
      placeholder: '2015-10-22--how-to-live-without-regrets',
      description:
        'The name of the folder for the post, in the format yyyy-mm-dd--the-post-name',
      required: true,
    },
    {
      name: 'title',
      component: 'text',
      label: 'Title',
      placeholder: 'My latest post',
      description: 'The title of the blog post',
      required: true,
    },
    {
      name: 'isJournal',
      component: 'toggle',
      label: 'Is it a journal entry?',
    },
  ],
  frontmatter: (form) => ({
    title: form.title,
    published: false,
  }),
})

export const query = graphql`
  {
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "//posts//" }
        frontmatter: { published: { ne: true } }
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

export default withPlugin(DraftsPage, CreatePostPlugin)
