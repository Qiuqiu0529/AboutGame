const VIEWED_KEY = "game-design-viewed-article-links";

const boatField = document.querySelector("#boatField");
const noteOverlay = document.querySelector("#noteOverlay");
const articleNote = document.querySelector("#articleNote");
const noteRating = document.querySelector("#noteRating");
const noteTitle = document.querySelector("#noteTitle");
const noteCategory = document.querySelector("#noteCategory");
const noteTags = document.querySelector("#noteTags");
const noteLink = document.querySelector("#noteLink");
const waterCount = document.querySelector("#waterCount");

let articles = readLibrary();
let activeArticle = null;
let viewedIds = readViewedIds();
let renderSeed = Math.random();

function visibleBoatCount() {
  if (window.innerWidth < 640) return 8;
  if (window.innerWidth < 980) return 11;
  return 14;
}

function readViewedIds() {
  try {
    const parsed = JSON.parse(localStorage.getItem(VIEWED_KEY) || "[]");
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch (error) {
    return new Set();
  }
}

function writeViewedIds() {
  localStorage.setItem(VIEWED_KEY, JSON.stringify([...viewedIds]));
}

function articleKey(article) {
  return article.id || article.url;
}


function seededValue(text) {
  let hash = 2166136261;
  const input = `${text}:${renderSeed}`;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967295;
}

function sortedArticles() {
  const unread = articles.filter((article) => !viewedIds.has(articleKey(article)));
  const viewed = articles.filter((article) => viewedIds.has(articleKey(article)));
  return [...shuffleArticles(unread), ...shuffleArticles(viewed)];
}

function shuffleArticles(items) {
  return [...items].sort((left, right) => seededValue(articleKey(left)) - seededValue(articleKey(right)));
}

function createBoat(article, index) {
  const isViewed = viewedIds.has(articleKey(article));
  const visibleCount = visibleBoatCount();
  const top = 14 + ((index * 31) % 70);
  const size = 0.72 + ((index % 4) * 0.08);
  const duration = 44 + ((index * 7) % 18) + (isViewed ? 10 : 0);
  const delay = -((index / visibleCount) * duration);

  const button = document.createElement("button");
  button.className = `paper-boat-button${isViewed ? " is-viewed" : " is-unviewed"}`;
  button.type = "button";
  button.setAttribute("aria-label", `查看文章：${article.title}`);
  button.style.setProperty("--boat-top", `${top}%`);
  button.style.setProperty("--boat-scale", size.toFixed(2));
  button.style.setProperty("--sail-duration", `${duration}s`);
  button.style.setProperty("--sail-delay", `${delay}s`);
  button.innerHTML = `
    <span class="paper-boat" aria-hidden="true">
      <span class="boat-shadow"></span>
      <span class="boat-wing-left"></span>
      <span class="boat-main-sail"></span>
      <span class="boat-bow"></span>
      <span class="boat-center-fold"></span>
      <span class="boat-hull"></span>
    </span>
  `;
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    showArticle(article);
  });
  return button;
}


function renderBoats({ reshuffle = false } = {}) {
  if (reshuffle) renderSeed = Math.random();
  articles = readLibrary();
  boatField.innerHTML = "";
  
  sortedArticles()
    .slice(0, visibleBoatCount())
    .forEach((article, index) => {
      boatField.append(createBoat(article, index));
    });
 const unreadCount = articles.filter((article) => !viewedIds.has(articleKey(article))).length;
  waterCount.textContent = unreadCount ? `${unreadCount} 艘未读纸船` : "所有纸船都看过了";
}

function showArticle(article) {
  activeArticle = article;
  noteRating.textContent = `个人感受 ${article.rating}/10`;
  noteTitle.textContent = article.title;
  noteCategory.textContent = article.category;
  noteLink.href = article.url;
  noteLink.title = `打开：${article.title}`;
  noteTags.innerHTML = "";

  (article.tags || []).forEach((tag) => {
    const pill = document.createElement("span");
    pill.className = "note-tag";
    pill.textContent = tag;
    noteTags.append(pill);
  });

  noteOverlay.hidden = false;
}

function closeArticle() {
  noteOverlay.hidden = true;
  activeArticle = null;
}

noteLink.addEventListener("click", (event) => {
  if (!activeArticle) return;
  event.preventDefault();
  viewedIds.add(articleKey(activeArticle));
  writeViewedIds();
  renderBoats({ reshuffle: true });
  window.open(activeArticle.url, "_blank", "noopener,noreferrer");
});

articleNote.addEventListener("click", (event) => {
  event.stopPropagation();
});

document.addEventListener("click", (event) => {
  if (!noteOverlay.hidden && !event.target.closest(".paper-boat-button")) {
    closeArticle();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeArticle();
  }
});

window.addEventListener("storage", () => {
  articles = readLibrary();
  viewedIds = readViewedIds();
  renderBoats({ reshuffle: true });
});

window.addEventListener("resize", () => renderBoats());

renderBoats({ reshuffle: true });
