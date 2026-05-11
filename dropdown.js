const wrapper = document.querySelector(".settings-wrapper");
const menu = document.getElementById("menu");
const btn = document.querySelector(".settings-btn");

btn.addEventListener("click", function (e) {
  e.stopPropagation(); // prevent the document click from immediately closing it
  menu.classList.toggle("open");
});

document.addEventListener("click", function (e) {
  if (!wrapper.contains(e.target)) {
    menu.classList.remove("open");
  }
});
