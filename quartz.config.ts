import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "bcardoso",
    pageTitleSuffix: " - Brandon Cardoso",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "umami",
      websiteId: "a1e3186c-dd7e-46b9-acd7-8bb1457f1971",
      host: "https://cloud.umami.is",
    },
    locale: "en-US",
    baseUrl: "bcardoso.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Plus Jakarta Sans",
        body: "Source Sans 3",
        code: "Source Code Pro",
      },
      colors: {
        lightMode: {
          light: "#fffbef",         // bg
          lightgray: "#e8e5d5",     // borders
          gray: "#829181",          // graph links, heavier borders
          darkgray: "#5c6a72",      // body text
          dark: "#5c6a72",          // header text, icons
          secondary: "#8da101",     // link colour, current graph node
          tertiary: "#f57d26",      // hover states, visited graph nodes
          highlight: "#f2efdf",     // internal link bg, highlighted text, highlighted lines of code
          textHighlight: "#fceced", // markdown highlighted text bg
        },
        darkMode: {
          light: "#272e33",         // bg
          lightgray: "#414b50",     // borders
          gray: "#7a8478",          // graph links, heavier borders
          darkgray: "#e0dcc7",      // body text
          dark: "#e0dcc7",          // header text, icons
          secondary: "#a7c080",     // link colour, current graph node
          tertiary: "#e69875",      // hover states, visited graph nodes
          highlight: "#232a2e",     // internal link bg, highlighted text, highlighted lines of code
          textHighlight: "#4c3743", // markdown highlighted text bg
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "everforest-light",
          dark: "everforest-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.ColourSwatch(),
      Plugin.SortableTable(),
      Plugin.JsonLd(),
      Plugin.Emoji(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
