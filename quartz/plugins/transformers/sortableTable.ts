import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { Element } from "hast"

const MIN_ROWS_FOR_FILTER = 10

export const SortableTable: QuartzTransformerPlugin = () => {
  return {
    name: "SortableTable",
    htmlPlugins() {
      return [
        () => {
          return (tree) => {
            visit(tree, "element", (node: Element) => {
              if (node.tagName !== "table") return

              const classes = (node.properties?.className as string[]) ?? []
              node.properties = {
                ...node.properties,
                className: [...classes, "sortable-table"],
              }

              // Add data-col-index and sort indicator span to each <th>
              visit(node, "element", (child: Element) => {
                if (child.tagName !== "tr") return
                let colIndex = 0
                for (const th of child.children) {
                  if ((th as Element).tagName === "th") {
                    ;(th as Element).properties = {
                      ...(th as Element).properties,
                      "data-col-index": colIndex,
                      role: "columnheader",
                      ariaSort: "none",
                      tabIndex: 0,
                    }
                    ;(th as Element).children.push({
                      type: "element",
                      tagName: "span",
                      properties: { className: ["sort-indicator"] },
                      children: [{ type: "text", value: " ⇅" }],
                    })
                    colIndex++
                  }
                }
              })
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
// Inject filter inputs for large tables
function initTableFilters() {
  document.querySelectorAll(".sortable-table").forEach(function(table) {
    var rows = table.querySelectorAll("tbody tr");
    if (rows.length < ${MIN_ROWS_FOR_FILTER}) return;

    var container = table.closest(".table-container") || table.parentElement;
    if (container.parentElement.querySelector(".table-search")) return;
    var input = document.createElement("input");
    input.type = "text";
    input.className = "table-search";
    input.placeholder = "Filter";
    input.setAttribute("aria-label", "Filter table rows");
    input.dataset.tableId = table.id || Math.random().toString(36).slice(2);
    table.id = input.dataset.tableId;
    container.parentElement.insertBefore(input, container);
  });
}
initTableFilters();
document.addEventListener("nav", initTableFilters);

// Sort
document.addEventListener("click", function(e) {
  var th = e.target.closest(".sortable-table th[data-col-index]");
  if (!th) return;

  var table = th.closest("table");
  var tbody = table.querySelector("tbody");
  if (!tbody) return;

  var colIdx = parseInt(th.dataset.colIndex, 10);
  var currentSort = th.getAttribute("aria-sort");
  var ascending = currentSort !== "ascending";

  table.querySelectorAll("th[data-col-index]").forEach(function(h) {
    h.setAttribute("aria-sort", "none");
    var ind = h.querySelector(".sort-indicator");
    if (ind) ind.textContent = " \\u21C5";
  });

  th.setAttribute("aria-sort", ascending ? "ascending" : "descending");
  var indicator = th.querySelector(".sort-indicator");
  if (indicator) indicator.textContent = ascending ? " \\u2191" : " \\u2193";

  var rows = Array.from(tbody.querySelectorAll("tr"));
  rows.sort(function(a, b) {
    var aCell = a.children[colIdx];
    var bCell = b.children[colIdx];
    if (!aCell || !bCell) return 0;

    var aText = (aCell.textContent || "").trim();
    var bText = (bCell.textContent || "").trim();

    // Try date comparison first (catches "Feb 27, 2026", "2026-02-27", etc.)
    var aDate = Date.parse(aText);
    var bDate = Date.parse(bText);
    if (!isNaN(aDate) && !isNaN(bDate) && !/^\\d+(\\.\\d+)?$/.test(aText)) {
      return ascending ? aDate - bDate : bDate - aDate;
    }

    // Try numeric comparison
    var aNum = parseFloat(aText);
    var bNum = parseFloat(bText);
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return ascending ? aNum - bNum : bNum - aNum;
    }

    // Fall back to string comparison
    var cmp = aText.localeCompare(bText, undefined, { numeric: true, sensitivity: "base" });
    return ascending ? cmp : -cmp;
  });

  rows.forEach(function(row) { tbody.appendChild(row); });
});

// Filter
document.addEventListener("input", function(e) {
  if (!e.target.matches(".table-search")) return;

  var input = e.target;
  var table = document.getElementById(input.dataset.tableId);
  if (!table) return;

  var filter = input.value.toLowerCase();
  var rows = table.querySelectorAll("tbody tr");

  rows.forEach(function(row) {
    var text = row.textContent.toLowerCase();
    row.style.display = text.includes(filter) ? "" : "none";
  });
});`,
          },
        ],
        css: [
          {
            inline: true,
            content: `
.sortable-table th[data-col-index] {
  cursor: pointer;
  user-select: none;
}
.sortable-table .sort-indicator {
  opacity: 0.3;
  font-size: 0.8em;
}
.sortable-table th[data-col-index]:hover .sort-indicator {
  opacity: 0.6;
}
.sortable-table th[aria-sort="ascending"] .sort-indicator,
.sortable-table th[aria-sort="descending"] .sort-indicator {
  opacity: 0.8;
}
.table-search {
  display: block;
  width: 10rem;
  margin-left: 0;
  padding: 0.4rem 0.7rem;
  margin-bottom: 0.5rem;
  font-family: inherit;
  font-size: 0.9rem;
  border: 1px solid var(--lightgray);
  border-radius: 4px;
  background: transparent;
  color: var(--darkgray);
}
.table-search::placeholder {
  color: var(--gray);
}
.table-search:focus {
  outline: none;
  border-color: var(--secondary);
}`,
          },
        ],
      }
    },
  }
}
