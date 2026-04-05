const sidebar = document.querySelector(".sidebar.left")
if (sidebar) {
  const onScroll = () => sidebar.classList.toggle("scrolled", window.scrollY > 0)
  window.addEventListener("scroll", onScroll, { passive: true })
  onScroll()
}
