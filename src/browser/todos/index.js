addEventListener("pagehide", saveScrollPosition);
addEventListener("load", restoreScrollPosition);

function saveScrollPosition() {
  if (window.scrollX || window.scrollY) {
    window.sessionStorage.setItem(
      "@scroll-restore",
      JSON.stringify({
        href: window.location.href,
        x: Math.round(window.scrollX),
        y: Math.round(window.scrollY),
      })
    );
  }
}

function restoreScrollPosition() {
  if (window.sessionStorage.getItem("@scroll-restore")) {
    const scrollPosition = JSON.parse(
      window.sessionStorage.getItem("@scroll-restore")
    );

    if (window.location.href === scrollPosition.href) {
      window.scroll(scrollPosition.x, scrollPosition.y);
    }

    window.sessionStorage.removeItem("@scroll-restore");
  }
}
