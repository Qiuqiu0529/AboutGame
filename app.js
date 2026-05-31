const book = document.querySelector("#book");
const titleEl = document.querySelector("#articleTitle");
const ratingEl = document.querySelector("#articleRating");
const categoryEl = document.querySelector("#articleCategory");
const tagsEl = document.querySelector("#articleTags");
const filterTextEl = document.querySelector("#filterText");
const emptyNote = document.querySelector("#emptyNote");
const categorySelect = document.querySelector("#categorySelect");
const tagSelect = document.querySelector("#tagSelect");

const RANDOM_SEEN_KEY = "game-design-random-seen";

let articles = readLibrary();
let lastArticleId = null;
let seenByScope = readSeenState();

function readSeenState() {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(RANDOM_SEEN_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    return {};
  }
}

function writeSeenState() {
  try {
    sessionStorage.setItem(RANDOM_SEEN_KEY, JSON.stringify(seenByScope));
  } catch (error) {
    // The in-memory state still keeps the current page session fair.
  }
}

function fillSelect(select, values, fallbackText) {
  select.innerHTML = "";
  if (!values.length) {
    const option = document.createElement("option");
    option.textContent = fallbackText;
    option.value = "";
    select.append(option);
    select.disabled = true;
    return;
  }

  select.disabled = false;
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
}

function refreshControls() {
  articles = readLibrary();
  fillSelect(categorySelect, getCategories(articles), "暂无分类");
  fillSelect(tagSelect, getTags(articles), "暂无标签");
}

function chooseFrom(pool) {
  if (!pool.length) return null;
  const candidates = pool.length > 1 ? pool.filter((article) => article.id !== lastArticleId) : pool;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function pickRandom(pool, scopeKey) {
  if (!pool.length) return null;

  const poolIds = new Set(pool.map((article) => article.id));
  const validSeenIds = (seenByScope[scopeKey] || []).filter((id) => poolIds.has(id));
  const unseen = pool.filter((article) => !validSeenIds.includes(article.id));
  const candidates = unseen.length ? unseen : pool;
  const picked = chooseFrom(candidates);

  const nextSeenIds = unseen.length ? [...validSeenIds, picked.id] : [picked.id];
  seenByScope[scopeKey] = nextSeenIds;
  writeSeenState();

  return picked;
}

function renderArticle(article, filterLabel) {
  emptyNote.hidden = true;
  lastArticleId = article.id;
  titleEl.textContent = article.title;
  titleEl.href = article.url;
  titleEl.title = `打开：${article.title}`;
  ratingEl.textContent = `个人感受 ${article.rating}/10`;
  categoryEl.textContent = article.category;
  filterTextEl.textContent = filterLabel;
  tagsEl.innerHTML = "";

  article.tags.forEach((tag) => {
    const pill = document.createElement("span");
    pill.className = "pill";
    pill.textContent = tag;
    tagsEl.append(pill);
  });

  book.classList.remove("turning");
  requestAnimationFrame(() => {
    book.classList.add("turning");
  });
}

function randomFrom(pool, filterLabel, scopeKey) {
  const article = pickRandom(pool, scopeKey);
  if (!article) {
    emptyNote.hidden = false;
    filterTextEl.textContent = filterLabel;
    return;
  }
  renderArticle(article, filterLabel);
}

titleEl.addEventListener("click", (event) => {
  if (!titleEl.href || titleEl.getAttribute("href") === "#") {
    event.preventDefault();
    return;
  }

  event.preventDefault();
  window.open(titleEl.href, "_blank", "noopener,noreferrer");
});

document.querySelector("#randomAny").addEventListener("click", () => {
  randomFrom(readLibrary(), "任意文章", "any");
});

document.querySelector("#randomCategory").addEventListener("click", () => {
  const category = categorySelect.value;
  randomFrom(
    readLibrary().filter((article) => article.category === category),
    `再来一篇 ${category} 类文章`,
    `category:${category}`
  );
});

document.querySelector("#randomTag").addEventListener("click", () => {
  const tag = tagSelect.value;
  randomFrom(
    readLibrary().filter((article) => article.tags.includes(tag)),
    `再来一篇 ${tag} 文章`,
    `tag:${tag}`
  );
});

window.addEventListener("storage", refreshControls);

refreshControls();
randomFrom(articles, "任意文章", "any");
