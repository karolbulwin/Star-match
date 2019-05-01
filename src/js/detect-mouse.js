(function detectMouse() {
  document.body.classList.add("using-mouse");
  document.body.addEventListener("mousedown", () => {
    document.body.classList.add("using-mouse");
  });
  document.body.addEventListener("keydown", () => {
    document.body.classList.remove("using-mouse");
  });
})();
