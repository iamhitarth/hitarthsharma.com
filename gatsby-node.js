const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

const isAPost = (node) =>
  node && node.fileAbsolutePath && node.fileAbsolutePath.includes('/posts/')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark` && isAPost(node)) {
    const slug = createFilePath({ node, getNode, basePath: `posts` })
    createNodeField({
      node,
      name: `slug`,
      value: slug.split('--')[1],
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
  const categoryTemplate = path.resolve(`./src/templates/category.js`)

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "//posts//" } }
        ) {
          edges {
            node {
              frontmatter {
                tags
                categories
                published
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `).then((result) => {
      let allTags = []
      let allCategories = []
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const published = node.frontmatter.published
        // Create blog post page
        createPage({
          path: node.fields.slug,
          component: blogPostTemplate,
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })

        if (published) {
          // If post is published
          // Collect it's tags
          const postTags = node.frontmatter.tags ? node.frontmatter.tags : []
          postTags.forEach((postTag) => {
            const trimmedTag = postTag.trim()
            if (allTags.indexOf(trimmedTag) < 0) {
              allTags.push(trimmedTag)
            }
          })

          // Collect it's categories
          const postCategories = node.frontmatter.categories
            ? node.frontmatter.categories
            : []
          postCategories.forEach((postCategory) => {
            const trimmedCategory = postCategory.trim()
            if (allCategories.indexOf(trimmedCategory) < 0) {
              allCategories.push(trimmedCategory)
            }
          })
        }
      })

      // Create tag pages
      allTags.forEach((tag) => {
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

      // Create category pages
      allCategories.forEach((category) => {
        const urlCategory =
          category.indexOf(' ') > -1 ? category.split(' ').join('-') : category
        createPage({
          path: `/category/${urlCategory}`,
          component: categoryTemplate,
          context: {
            category,
            categoryRegex: `/${category}/`,
          },
        })
      })
      resolve()
    })
  })
}
