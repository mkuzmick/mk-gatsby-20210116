const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  console.log(node.internal.type)
  if (node.internal.type === `MarkdownRemark`) {
    console.log(`found markdown node of type ${node.internal.type}`)
    const fileNode = getNode(node.parent)
    console.log(`\n`, fileNode.relativePath)
    console.log(createFilePath({ node, getNode }))
    const slug = createFilePath({ node, getNode })
    const prefix = fileNode.sourceInstanceName
      ? fileNode.sourceInstanceName
      : "content"
    createNodeField({
      node,
      name: `slug`,
      value: `/${prefix}${slug}`,
    })
  }
  if (node.internal.type === `Mdx`) {
    console.log(`found mdx node of type ${node.internal.type}`)
    const fileNode = getNode(node.parent)
    console.log(`\n`, fileNode.relativePath)
    console.log(createFilePath({ node, getNode }))
    const slug = createFilePath({ node, getNode })
    const prefix = fileNode.sourceInstanceName
      ? fileNode.sourceInstanceName
      : "content"
    createNodeField({
      node,
      name: `slug`,
      value: `/${prefix}${slug}`,
    })
  }
}
