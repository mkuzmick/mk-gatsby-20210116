const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  console.log(node.internal.type)
  if (node.internal.type === `MarkdownRemark`) {
    console.log(`found markdown node of type ${node.internal.type}`)
    const fileNode = getNode(node.parent)
    // console.log(JSON.stringify(fileNode, null, 4))
    console.log(`\n`, fileNode.relativePath)
    console.log(createFilePath({ node, getNode }))
    const slug = createFilePath({ node, getNode })
    const prefix = fileNode.sourceInstanceName || "content"
    createNodeField({
      node,
      name: `slug`,
      value: `/${prefix}${slug}`,
    })
    createNodeField({
      node,
      name: `pageType`,
      value: prefix,
    })
    createNodeField({
      node,
      name: `title`,
      value: node.frontmatter.title || fileNode.name || "no title",
    })
  }
  if (node.internal.type === `Mdx`) {
    console.log(`found mdx node of type ${node.internal.type}`)
    const fileNode = getNode(node.parent)
    console.log(`\n`, fileNode.relativePath)
    console.log(createFilePath({ node, getNode }))
    const slug = createFilePath({ node, getNode })
    const prefix = fileNode.sourceInstanceName || "content"
    createNodeField({
      node,
      name: `slug`,
      value: `/${prefix}${slug}`,
    })
    createNodeField({
      node,
      name: `pageType`,
      value: prefix,
    })
    createNodeField({
      node,
      name: `title`,
      value: node.frontmatter.title || fileNode.name || "no title",
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const mdxResult = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            frontmatter {
              title
            }
            fields {
              slug
              title
              pageType
            }
            headings(depth: h1) {
              value
            }
          }
        }
      }
    }
  `)
  
  console.log(JSON.stringify(mdxResult, null, 4))
  if (mdxResult.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const mdx = mdxResult.data.allMdx.edges

  mdx.forEach(({ node }, index) => {
    console.log(`creating page for id ${node.id} with slug ${node.fields.slug} with initial h1 of ${node.headings[0].value}`)
    createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: node.fields.slug,
      // This component will wrap our MDX content
      component: path.resolve(`./src/components/templates/resource-template.js`),
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    })
  })

  const mdResult = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slug
              title
              pageType
            }
            headings(depth: h1) {
              value
            }
          }
        }
      }
    }
  `)
  


  console.log(JSON.stringify(mdResult, null, 4))
  if (mdResult.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const theMd = mdResult.data.allMarkdownRemark.edges

  theMd.forEach(({ node }, index) => {
    console.log(`creating page for id ${node.id} with slug ${node.fields.slug} with initial h1 of ${(node.headings[0] ? node.headings[0].value : "no heading")}`)
    createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: node.fields.slug,
      // This component will wrap our MDX content
      component: path.resolve(`./src/components/templates/glossary-template-md.js`),
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id, slug: node.fields.slug },
    })
  })




}