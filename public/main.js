// Shared page behavior: footer year, mobile menu, "Follow" button.
document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.querySelector(".nav-toggle");
navToggle.addEventListener("click", () => {
  const open = document.body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".nav-links a").forEach(a =>
  a.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  }));

const follow = document.querySelector(".follow-btn");
follow.addEventListener("click", () => {
  const open = document.body.classList.toggle("follow-open");
  follow.setAttribute("aria-expanded", open);
});
