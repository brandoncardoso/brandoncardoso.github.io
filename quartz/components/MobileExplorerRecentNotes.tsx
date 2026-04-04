import { QuartzComponent, QuartzComponentConstructor } from "./types"

/**
 * Moves RecentNotes into the explorer's mobile overlay so it appears
 * in the hamburger menu on mobile, without modifying core components.
 */
const MobileExplorerRecentNotes: QuartzComponent = () => {
  return <div class="mobile-explorer-recent-notes" />
}

MobileExplorerRecentNotes.css = `
.mobile-explorer-recent-notes {
  display: none;
}

@media all and (max-width: 800px) {
  .sidebar .recent-notes:not(.in-mobile-menu) {
    display: none;
  }

  .recent-notes.in-mobile-menu {
    display: block;
  }
}
`

MobileExplorerRecentNotes.afterDOMLoaded = `
function moveRecentNotes() {
  var explorer = document.querySelector(".explorer");
  if (!explorer) return;

  var mobileExplorer = explorer.querySelector(".mobile-explorer");
  var explorerContent = explorer.querySelector(".explorer-content");
  var recentNotes = document.querySelector(".recent-notes");
  if (!mobileExplorer || !explorerContent || !recentNotes) return;

  if (mobileExplorer.checkVisibility()) {
    if (!explorerContent.contains(recentNotes)) {
      recentNotes.classList.add("in-mobile-menu");
      explorerContent.appendChild(recentNotes);
    }
  } else {
    if (explorerContent.contains(recentNotes)) {
      recentNotes.classList.remove("in-mobile-menu");
      explorer.closest(".sidebar")?.appendChild(recentNotes);
    }
  }
}

document.addEventListener("nav", moveRecentNotes);
window.addEventListener("resize", moveRecentNotes);
`

export default (() => MobileExplorerRecentNotes) satisfies QuartzComponentConstructor
