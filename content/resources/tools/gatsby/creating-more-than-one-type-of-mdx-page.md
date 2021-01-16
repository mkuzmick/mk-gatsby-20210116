# CREATING MORE THAN ONE TYPE OF PAGE

link to discussion board [here](https://github.com/gatsbyjs/gatsby/issues/20159) has some useful suggestions.

You can achieve what you're looking for by grouping your API code into one function for each node API.

For ex:
```
const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions 
  const words = await graphql(`
    query {
      articles: allMdx(filter: { fileAbsolutePath: { regex: "/content/words/" } }) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(res => res.data )

  words.articles.edges.forEach(({ node }) => {
		createPage({
			path: node.fields.slug,
			component: path.resolve(`./src/templates/article.js`),
			context: {
				slug: node.fields.slug,
				id: node.id,
			},
		})
  })

  const otherContent = await graphql(`
		query {
			articles: allMdx(
				filter: { fileAbsolutePath: { regex: "/content/some-other-content/" } }
			) {
				edges {
					node {
						id
						fields {
							slug
						}
					}
				}
			}
		}
  `).then(res => res.data)

  otherContent.articles.edges.forEach(({ node }) => {
		createPage({
			path: node.fields.slug,
			component: path.resolve(`./src/templates/other-template.js`),
			context: {
				slug: node.fields.slug,
				id: node.id,
			},
		})
  })
}
```
There are ways to make the code more concise, but for now, try building the query for each in Graphiql, and then console.log() the responses to figure out how to write your logic.

and for onCreateNode you can do something like this:
```
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions
	const value = createFilePath({ node, getNode })
	if (node.internal.type === `Mdx`) {
		createNodeField({
			name: `slug`,
			node,
			value: `/words${value}`,
		})
	} else if (node.internal.type === `SomethingElse`) {
		createNodeField({
			name: `slug`,
			node,
			value: `/music${value}`,
		})
	}
}
```
What you query and how you create your pages and node fields will be different depending on the requirements of your project, but the code above should give you a general idea of where to start. console.log and graphiql will be your best friends in figuring out how to write your logic. Let me know if you need any more help!

