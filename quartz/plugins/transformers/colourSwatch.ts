import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { Element } from "hast"

export const ColourSwatch: QuartzTransformerPlugin = () => {
  return {
    name: "ColourSwatch",
    htmlPlugins() {
      return [
        () => {
          return (tree) => {
            visit(tree, "element", (node: Element) => {
              const classes = (node.properties?.className as string[]) ?? []
              if (!classes.includes("colour-swatch")) return

              const hex = (node.properties?.dataHex as string) ?? ""
              const isLarge = node.properties?.dataSize === "large"

              if (isLarge) {
                node.tagName = "div"
                node.properties = { className: ["colour-swatch", "colour-swatch--large"] }
                node.children = [
                  {
                    type: "element",
                    tagName: "button",
                    properties: {
                      className: ["colour-swatch__btn"],
                      ariaLabel: `Copy colour ${hex}`,
                      dataHex: hex,
                    },
                    children: [
                      {
                        type: "element",
                        tagName: "span",
                        properties: {
                          className: ["colour-swatch__preview"],
                          style: `background-color:${hex}`,
                          role: "img",
                          ariaLabel: `Colour swatch ${hex}`,
                        },
                        children: [],
                      },
                      {
                        type: "element",
                        tagName: "span",
                        properties: { className: ["colour-swatch__label"] },
                        children: [
                          {
                            type: "element",
                            tagName: "span",
                            properties: { className: ["colour-swatch__hex"] },
                            children: [{ type: "text", value: hex }],
                          },
                          {
                            type: "element",
                            tagName: "span",
                            properties: { className: ["colour-swatch__tooltip"] },
                            children: [{ type: "text", value: "copy" }],
                          },
                        ],
                      },
                    ],
                  },
                ]
              } else {
                node.tagName = "button"
                node.properties = {
                  className: ["colour-swatch", "colour-swatch--inline"],
                  ariaLabel: `Copy colour ${hex}`,
                  dataHex: hex,
                }
                node.children = [
                  {
                    type: "element",
                    tagName: "span",
                    properties: {
                      className: ["colour-swatch__preview"],
                      style: `background-color:${hex}`,
                      role: "img",
                      ariaLabel: `Colour swatch ${hex}`,
                    },
                    children: [],
                  },
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["colour-swatch__tooltip"] },
                    children: [
                      { type: "text", value: `${hex} ` },
                      {
                        type: "element",
                        tagName: "span",
                        properties: { className: ["colour-swatch__copy-hint"] },
                        children: [{ type: "text", value: "copy" }],
                      },
                    ],
                  },
                ]
              }
            })
          }
        },
      ]
    },
    externalResources() {
      return {
        js: [
          {
            loadTime: "afterDOMReady",
            contentType: "inline",
            script: `
document.addEventListener("click", function(e) {
  var btn = e.target.closest(".colour-swatch__btn, .colour-swatch--inline");
  if (!btn) return;
  var hex = btn.dataset.hex || btn.getAttribute("data-hex");
  if (!hex) return;
  navigator.clipboard.writeText(hex).then(function() {
    var tip = btn.querySelector(".colour-swatch__tooltip, .colour-swatch__copy-hint");
    if (tip) {
      var orig = tip.textContent;
      tip.textContent = "copied!";
      setTimeout(function() { tip.textContent = orig; }, 1200);
    }
  });
});`,
          },
        ],
        css: [
          {
            inline: true,
            content: `
.colour-swatch--inline {
  position: relative;
  display: inline-block;
  vertical-align: -0.15em;
  width: 1.4em;
  height: 1.4em;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}
.colour-swatch--inline .colour-swatch__preview {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: none;
}
.colour-swatch--inline .colour-swatch__tooltip {
  pointer-events: none;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 4px;
  padding: 2px 6px;
  font-size: 0.75rem;
  border-radius: 4px;
  background: var(--light);
  border: none;
  color: var(--darkgray);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.15s;
}
.colour-swatch--inline:hover .colour-swatch__tooltip,
.colour-swatch--inline:focus-visible .colour-swatch__tooltip {
  opacity: 1;
}
.colour-swatch--inline .colour-swatch__copy-hint {
  color: var(--secondary);
}
.colour-swatch--large {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
}
.colour-swatch--large .colour-swatch__btn {
  display: block;
  width: 100%;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  text-align: left;
}
.colour-swatch--large .colour-swatch__preview {
  display: block;
  width: 100%;
  height: 12rem;
  border-radius: 8px;
  border: none;
}
.colour-swatch--large .colour-swatch__label {
  display: inline-block;
  position: relative;
  margin-top: 0.25rem;
}
.colour-swatch--large .colour-swatch__hex {
  font-size: 0.875rem;
  color: var(--gray);
}
.colour-swatch--large .colour-swatch__tooltip {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 4px;
  padding: 2px 6px;
  font-size: 0.75rem;
  border-radius: 4px;
  background: var(--light);
  border: none;
  color: var(--secondary);
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s;
}
.colour-swatch--large .colour-swatch__btn:hover .colour-swatch__tooltip,
.colour-swatch--large .colour-swatch__btn:focus-visible .colour-swatch__tooltip {
  opacity: 1;
}`,
          },
        ],
      }
    },
  }
}
