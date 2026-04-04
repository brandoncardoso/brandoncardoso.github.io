import { QuartzTransformerPlugin } from "../types"

export const JsonLd: QuartzTransformerPlugin = () => {
  return {
    name: "JsonLd",
    externalResources() {
      return {
        additionalHead: [
          (fileData) => {
            const baseUrl = "https://bcardoso.com"
            const author = {
              "@type": "Person",
              name: "Brandon Cardoso",
              url: baseUrl,
              sameAs: [
                "https://github.com/brandoncardoso",
                "https://www.linkedin.com/in/brandoncardoso/",
                "mailto:brandon@bcardoso.com",
              ],
            }

            if (fileData.slug === "index") {
              const jsonLd = {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Brandon Cardoso",
                url: baseUrl,
                author,
              }
              return (
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
              )
            }

            const jsonLd: Record<string, unknown> = {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: fileData.frontmatter?.title ?? "",
              url: `${baseUrl}/${fileData.slug}`,
              author,
            }

            if (fileData.dates?.created) {
              jsonLd.datePublished = fileData.dates.created.toISOString().slice(0, 10)
            }
            if (fileData.dates?.modified) {
              jsonLd.dateModified = fileData.dates.modified.toISOString().slice(0, 10)
            }
            if (fileData.description) {
              jsonLd.description = fileData.description
            }
            if (fileData.frontmatter?.tags?.length) {
              jsonLd.keywords = fileData.frontmatter.tags
            }

            return (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
              />
            )
          },
        ],
      }
    },
  }
}
