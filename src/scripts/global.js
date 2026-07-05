document.addEventListener("click", (event) => {
  const anchor = event.target.closest("a[href]");
  if (!anchor) return;

  try {
    const href = anchor.getAttribute("href");
    const url = new URL(href, window.location.href);
    if (url.protocol === "mailto:" || url.origin !== window.location.origin) {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
    }
  } catch {
    // Ignore invalid URLs.
  }
});
