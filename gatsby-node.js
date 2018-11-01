const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `posts` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })

    const dateRegex = '(\\d{4}-\\d{2}-\\d{2})--'
    const postDate = slug.match(dateRegex) ? slug.match(dateRegex)[1] : null
    createNodeField({
      node,
      name: `postDate`,
      value: postDate,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`./src/templates/blogPost.js`)
  const tagTemplate = path.resolve(`./src/templates/tag.js`)

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                tags
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      let allTags = []
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        // Create blog post page
        createPage({
          path: node.fields.slug,
          component: blogPostTemplate,
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })

        // Collect it's tags
        const postTags = node.frontmatter.tags ? node.frontmatter.tags : []
        postTags.forEach(postTag => {
          const trimmedTag = postTag.trim()
          if (allTags.indexOf(trimmedTag) < 0) {
            allTags.push(trimmedTag)
          }
        })
      })

      // Create tag pages
      allTags.forEach(tag => {
        const urlTag = tag.indexOf(' ') > -1 ? tag.split(' ').join('-') : tag
        createPage({
          path: `/tags/${urlTag}/`,
          component: tagTemplate,
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            tag,
            tagRegex: `/${tag}/`,
          },
        })
      })
      resolve()
    })
  })
}
