document.addEventListener("click", (event) => {
  const anchor = event.target.closest("a[href]");
  if (!anchor) return;

  try {
    const url = new URL(anchor.getAttribute("href"), window.location.href);
    if (url.origin !== window.location.origin) {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
    }
  } catch {
    // Ignore invalid URLs.
  }
});
