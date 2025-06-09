const params = new URLSearchParams(window.location.search);
const version = params.get("v");

if (["LIRA", "Parkt", "Formscale"].includes(version)) {
  const title = document.getElementById("title");
  title.innerText = `${version} / ${title.textContent}`;
  document.getElementById("company").innerText = `the operating company of ${version},`;
}