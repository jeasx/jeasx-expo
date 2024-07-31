document.getElementsByName("htmz").forEach((element) =>
  element.addEventListener("load", (event) => {
    const iframe = event.target;

    if (iframe["contentWindow"].location.href === "about:blank") {
      return;
    }

    // Remove setTimeout to let the browser autoscroll content changes into view
    setTimeout(() =>
      document
        .querySelector(iframe["contentWindow"].location.hash || null)
        ?.replaceWith(...iframe["contentDocument"].body.childNodes)
    );

    /*
      Normally, browsers cache GET requests to the same URL in an iframe. 
      This extension allows you to skip that behavior and
      make repeated GET requests to the same URL.
    */
    iframe["contentWindow"].location.replace("about:blank");
  })
);
