import { QuartzTransformerPlugin } from "../types"
import remarkEmoji from "remark-emoji"

export const Emoji: QuartzTransformerPlugin = () => {
  return {
    name: "Emoji",
    markdownPlugins() {
      return [remarkEmoji]
    },
  }
}
