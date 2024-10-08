const themeButton = document.querySelector("button");
const heading = document.querySelector("h1");

const isDark =
  document.documentElement.dataset.theme === "dark" ||
  matchMedia("(prefers-color-scheme: dark)").matches;
heading.innerText = `👋Hi, I am ${isDark ? "Ahmed!" : "Syed!"}`;
themeButton.setAttribute("aria-pressed", isDark ? false : true);
document.documentElement.dataset.theme = isDark ? "dark" : "light";

const sync = () => {
  const darkNow = themeButton.matches("[aria-pressed=false]");
  document.documentElement.dataset.theme = darkNow ? "light" : "dark";
  heading.innerText = `👋Hi, I am  ${darkNow ? "Syed!" : "Ahmed!"}`;
  themeButton.setAttribute("aria-pressed", darkNow ? true : false);
};

const handleSync = () => {
  if (!document.startViewTransition) return sync();
  document.startViewTransition(sync);
};

themeButton.addEventListener("click", handleSync);

const buttons = document.querySelectorAll(".card-buttons button");
const sections = document.querySelectorAll(".card-section");
const card = document.querySelector(".card");

const handleButtonClick = (e) => {
  const targetSection = e.target.getAttribute("data-section");
  const section = document.querySelector(targetSection);
  targetSection !== "#about"
    ? card.classList.add("is-active")
    : card.classList.remove("is-active");
  card.setAttribute("data-state", targetSection);
  sections.forEach((s) => s.classList.remove("is-active"));
  buttons.forEach((b) => b.classList.remove("is-active"));
  e.target.classList.add("is-active");
  section.classList.add("is-active");
};

buttons.forEach((btn) => {
  btn.addEventListener("click", handleButtonClick);
});

const shareData = {
  title: "SYEDZ.ME",
  text: "Syed Ahmed's profile page and contact card.",
  url: "https://syedz.me",
};

const sharebtn = document.querySelector(".share-me");
const resultPara = document.querySelector(".result");

// Share must be triggered by "user activation"
sharebtn.addEventListener("click", async () => {
  try {
    await navigator.share(shareData);
    resultPara.textContent = "link shared successfully";
  } catch (err) {
    resultPara.textContent = `Error: ${err}`;
  }
});
