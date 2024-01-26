addEventListener("load", () => {
  document.querySelectorAll("[data-submit]").forEach((el) => {
    el.addEventListener(el.getAttribute("data-submit"), (e) => {
      e.target["form"].submit();
    });
  });
});
