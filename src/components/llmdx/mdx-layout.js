/** @jsx jsx */
import { jsx, ThemeProvider } from 'theme-ui'
import theme from '../gatsby-plugin-theme-ui/index.js'
import components from '../gatsby-plugin-theme-ui/components'
import { MDXProvider } from "@mdx-js/react"
import SuperBig from './mdx-toolkit/ui/super-big-headline.js'

// import React from 'react'

const shortcodes = { SuperBig }

export default function MDXLayout ({ children }) {
  return (
    <MDXProvider components={shortcodes}>
      <ThemeProvider theme={theme} components={components}>
            <div
                sx={{
                    width: "80%",
                    m: "auto",
                    mt: 6,
                    bg: "muted"
                }}
            >
            from the layout
                {children}
            </div> 
        </ThemeProvider>
    </MDXProvider>
  )
}



