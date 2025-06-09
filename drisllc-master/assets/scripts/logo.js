// const logo = document.querySelector(".logo");
// logo.addEventListener("mouseenter", () => {
//   document.body.classList.toggle("night");
// });

if (new URLSearchParams(window.location.search).has("night")) {
  document.body.classList.add("night");
}
