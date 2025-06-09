window.addEventListener("scroll", () => {
  const scrollY = Math.min(window.scrollY, 100);
  const maxWidth = 42 + (scrollY / 400) * 20;
  console.log(maxWidth);
  document.querySelector("main").style.maxWidth = `${maxWidth}rem`;
});
