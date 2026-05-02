import { QuartzComponent, QuartzComponentConstructor } from "./types"

const MIN_ROWS_FOR_FILTER = 30

const StatsTable: QuartzComponent = () => null

StatsTable.afterDOMLoaded = `
(function() {
  var MIN_ROWS_FOR_FILTER = ${MIN_ROWS_FOR_FILTER};

  var titleCase = function(s) {
    return s.replace(/_/g, " ").replace(/\\b\\w/g, function(c) { return c.toUpperCase() })
  }

  var formatters = {
    won:      function(v) { return v ? "★" : "" },
    win_rate: function(v) { return v == null ? "" : v + "%" },
    date:     function(v) {
      if (!v) return ""
      var d = new Date(v)
      if (isNaN(d.getTime())) return String(v)
      return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    },
  }

  var renderCell = function(row, key, linkColumn, urlColumn) {
    var v = row[key]
    if (key === linkColumn && row[urlColumn]) {
      var text = v == null ? "" : String(v)
      return '<a href="' + row[urlColumn] + '" target="_blank" rel="noopener">' + text + '</a>'
    }
    if (formatters[key]) return formatters[key](v)
    if (typeof v === "number") return v.toLocaleString()
    return v == null ? "" : String(v)
  }

  var renderTable = async function(el) {
    var src = el.dataset.source
    if (!src) return
    var linkColumn  = el.dataset.linkColumn
    var urlColumn   = el.dataset.urlColumn || "url"
    var hideColumns = (el.dataset.hide || "").split(",").map(function(s) { return s.trim() }).filter(Boolean)

    el.innerHTML = '<div class="stats-loading">Loading…</div>'

    var rows
    try {
      var res = await fetch(src)
      if (!res.ok) throw new Error("HTTP " + res.status)
      rows = await res.json()
    } catch (err) {
      el.innerHTML = '<div class="stats-error">Failed to load: ' + err.message + '</div>'
      return
    }
    if (!rows || !rows.length) { el.innerHTML = '<div class="stats-empty">No data</div>'; return }

    var headers = Object.keys(rows[0]).filter(function(k) { return hideColumns.indexOf(k) === -1 })

    // Build markup that matches what the SortableTable transformer would produce.
    // Indicator span: " ⇅" (same as transformer).
    var thead =
      '<thead><tr>' +
        headers.map(function(h, i) {
          return '<th data-col-index="' + i + '" role="columnheader" aria-sort="none" tabindex="0">' +
            titleCase(h) +
            '<span class="sort-indicator"> \\u21C5</span>' +
          '</th>'
        }).join("") +
      '</tr></thead>'

    var tbody =
      '<tbody>' +
        rows.map(function(r) {
          return "<tr>" + headers.map(function(h) {
            return "<td>" + renderCell(r, h, linkColumn, urlColumn) + "</td>"
          }).join("") + "</tr>"
        }).join("") +
      '</tbody>'

    var tableId = "sortable-" + Math.random().toString(36).slice(2)
    var tableHtml = '<table class="sortable-table" id="' + tableId + '">' + thead + tbody + '</table>'

    var filterHtml = ""
    if (rows.length >= MIN_ROWS_FOR_FILTER) {
      filterHtml =
        '<input type="text" class="table-search" placeholder="Filter" ' +
        'aria-label="Filter table rows" data-table-id="' + tableId + '">'
    }

    el.innerHTML = filterHtml + tableHtml
  }

  var init = function() {
    document.querySelectorAll(".stats-table").forEach(renderTable)
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init)
  } else {
    init()
  }
})();
`

export default (() => StatsTable) satisfies QuartzComponentConstructor
