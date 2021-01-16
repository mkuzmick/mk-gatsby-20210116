import baseTheme from "@theme-ui/preset-funk"
import { merge } from "theme-ui"

export default merge(baseTheme, {
  colors: {
    text: "#999",
    background: "#fff",
    primary: "#639",
    secondary: "#ff6347",
    headerBackground: "rgba(0, 0, 20, .7)",
  },
  fontWeights: {
    body: 400,
    heading: 900,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  fontSizes: [10, 14, 18, 24, 32, 48, 72, 96, 144],
  styles: {
    h1: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      marginTop: 0,
      marginBottom: 3,
      //   fontSize: 2,
      //   color: "red"
    },
    a: {
      color: "primary",
      ":hover, :focus": {
        color: "secondary",
      },
    },
  },
})
