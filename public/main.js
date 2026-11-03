// Shared page behavior: footer year, mobile menu, "Follow" button.
document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.querySelector(".nav-toggle");
function setMenu(open) {
  document.body.classList.toggle("nav-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
}
navToggle.addEventListener("click", e => {
  e.stopPropagation();
  setMenu(!document.body.classList.contains("nav-open"));
});
// Close the menu after choosing a link, tapping outside it, or pressing Escape.
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => setMenu(false)));
// A real element with its own listener: iPhone Safari does not send taps on plain
// page areas to a listener on the whole document.
const backdrop = document.createElement("div");
backdrop.className = "nav-backdrop";
backdrop.addEventListener("click", () => setMenu(false));
document.body.appendChild(backdrop);
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && document.body.classList.contains("nav-open")) { setMenu(false); navToggle.focus(); }
});
// Rotating the phone to the wide layout hides the menu button, so close the menu.
matchMedia("(min-width: 57.8125em)").addEventListener("change", e => { if (e.matches) setMenu(false); });

// Not every page has a sidebar (the GENIUS and Pinyin pages don't).
const follow = document.querySelector(".follow-btn");
if (follow) {
  follow.addEventListener("click", () => {
    const open = document.body.classList.toggle("follow-open");
    follow.setAttribute("aria-expanded", open);
  });
}
