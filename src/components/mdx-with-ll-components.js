/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui"
import theme from "../src/gatsby-plugin-theme-ui/index.js"
import components from "../components/basic-ll-mdx-components"

export default props => (
  <ThemeProvider theme={theme} components={components}>
    <div>
      <h1>My Layout With Components</h1>
      <div>{props.children}</div>
    </div>
  </ThemeProvider>
)
