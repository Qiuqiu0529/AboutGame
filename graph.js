const VIEWED_KEY = "game-design-viewed-article-links";
const FILTER_ALL = "__all__";

const graphStage = document.querySelector("#graphStage");
const graphViewport = document.querySelector("#graphViewport");
const graphLinks = document.querySelector("#graphLinks");
const graphNodes = document.querySelector("#graphNodes");
const graphStat = document.querySelector("#graphStat");
const graphDetail = document.querySelector("#graphDetail");
const graphClose = document.querySelector("#graphClose");
const graphDetailRating = document.querySelector("#graphDetailRating");
const graphDetailTitle = document.querySelector("#graphDetailTitle");
const graphDetailCategory = document.querySelector("#graphDetailCategory");
const graphDetailTags = document.querySelector("#graphDetailTags");
const graphDetailLink = document.querySelector("#graphDetailLink");
const categoryFilters = document.querySelector("#categoryFilters");
const tagFilters = document.querySelector("#tagFilters");
const rebuildButton = document.querySelector("#rebuildButton");
const zoomInButton = document.querySelector("#zoomInButton");
const zoomOutButton = document.querySelector("#zoomOutButton");
const zoomResetButton = document.querySelector("#zoomResetButton");

let articles = readLibrary();
let viewedIds = readViewedIds();
let activeArticle = null;
let layoutSeed = Math.random();
let animationFrame = 0;

const state = {
  category: FILTER_ALL,
  tag: FILTER_ALL,
  zoom: 1,
  panX: 0,
  panY: 0,
  dragging: false,
  dragStartX: 0,
  dragStartY: 0,
  dragPanX: 0,
  dragPanY: 0,
  worldWidth: 0,
  worldHeight: 0,
};

let graph = {
  categoryNodes: [],
  tagNodes: [],
  articleNodes: [],
  links: [],
};

function articleKey(article) {
  return article.id || article.url;
}

function uniqueSorted(items) {
  return [...new Set(items.filter(Boolean))].sort((left, right) => left.localeCompare(right, "zh-Hans-CN"));
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

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(left, right, amount) {
  return left + (right - left) * amount;
}

function seededValue(text) {
  let hash = 2166136261;
  const input = `${text}:${layoutSeed}`;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967295;
}

function articleOrder(list) {
  const unread = list.filter((article) => !viewedIds.has(articleKey(article)));
  const viewed = list.filter((article) => viewedIds.has(articleKey(article)));
  const shuffle = (items) =>
    [...items].sort((left, right) => seededValue(articleKey(left)) - seededValue(articleKey(right)));
  return [...shuffle(unread), ...shuffle(viewed)];
}

function createEl(tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function fitTextWidth(text, min, max, factor = 7.2) {
  return clamp(text.length * factor, min, max);
}

function fitTextHeight(text) {
  return text.length > 24 ? 100 : 84;
}

function layoutStaggered(items, region, options = {}) {
  if (!items.length) return [];

  const rows = Math.max(1, Math.min(options.rows || 2, items.length));
  const columns = Math.max(1, Math.ceil(items.length / rows));
  const xStep = columns === 1 ? 0 : (region.x1 - region.x0) / (columns - 1);
  const yStep = rows === 1 ? 0 : (region.y1 - region.y0) / (rows - 1);
  const xJitter = options.xJitter || 0;
  const yJitter = options.yJitter || 0;
  const rowOffset = options.rowOffset || 0;

  return items.map((item, index) => {
    const column = Math.floor(index / rows);
    const row = index % rows;
    const hash = seededValue(`${item.id || item.label}:${index}`);
    const stagger = row % 2 === 0 ? 0 : xStep * 0.26;
    const x = region.x0 + column * xStep + stagger + (hash - 0.5) * xJitter;
    const y = region.y0 + row * yStep + (column % 2 === 0 ? 0 : rowOffset) + (hash - 0.5) * yJitter;
    return {
      ...item,
      x: clamp(x, region.x0, region.x1),
      y: clamp(y, region.y0, region.y1),
    };
  });
}

function matchesFilters(article) {
  const categoryMatch = state.category === FILTER_ALL || article.category === state.category;
  const tagMatch =
    state.tag === FILTER_ALL || (article.tags || []).some((tag) => tag === state.tag);
  return categoryMatch && tagMatch;
}

function filteredArticles() {
  return articles.filter(matchesFilters);
}

function updateStats() {
  const visible = filteredArticles();
  const unread = visible.filter((article) => !viewedIds.has(articleKey(article))).length;
  const categoryLabel = state.category === FILTER_ALL ? "全部分类" : state.category;
  const tagLabel = state.tag === FILTER_ALL ? "全部标签" : state.tag;
  graphStat.textContent = `${visible.length}/${articles.length} 篇 · ${unread} 未读 · ${categoryLabel} / ${tagLabel}`;
}

function countCategories(scopeArticles) {
  const counts = new Map();
  scopeArticles.forEach((article) => {
    if (!article.category) return;
    counts.set(article.category, (counts.get(article.category) || 0) + 1);
  });
  return counts;
}

function countTags(scopeArticles) {
  const counts = new Map();
  scopeArticles.forEach((article) => {
    (article.tags || []).forEach((tag) => {
      if (!tag) return;
      counts.set(tag, (counts.get(tag) || 0) + 1);
    });
  });
  return counts;
}

function renderFilterRow(container, items, activeValue, kind, counts, totalCount) {
  container.innerHTML = "";

  const allButton = createEl("button", `graph-chip${activeValue === FILTER_ALL ? " is-active" : ""}`);
  allButton.type = "button";
  allButton.innerHTML = `<span>全部</span><small>${totalCount}</small>`;
  allButton.addEventListener("click", () => {
    if (kind === "category") state.category = FILTER_ALL;
    if (kind === "tag") state.tag = FILTER_ALL;
    rebuildGraph({ reseed: false });
  });
  container.appendChild(allButton);

  items.forEach((item) => {
    const button = createEl("button", `graph-chip${activeValue === item ? " is-active" : ""}`);
    button.type = "button";
    button.innerHTML = `<span>${item}</span><small>${counts.get(item) || 0}</small>`;
    button.addEventListener("click", () => {
      if (kind === "category") state.category = item;
      if (kind === "tag") state.tag = item;
      rebuildGraph({ reseed: false });
    });
    container.appendChild(button);
  });
}

function renderFilters() {
  const categoryScope = articles.filter(
    (article) => state.tag === FILTER_ALL || (article.tags || []).includes(state.tag)
  );
  const tagScope = articles.filter(
    (article) => state.category === FILTER_ALL || article.category === state.category
  );

  renderFilterRow(
    categoryFilters,
    uniqueSorted(articles.map((article) => article.category)),
    state.category,
    "category",
    countCategories(categoryScope),
    categoryScope.length
  );
  renderFilterRow(
    tagFilters,
    uniqueSorted(articles.flatMap((article) => article.tags || [])),
    state.tag,
    "tag",
    countTags(tagScope),
    tagScope.length
  );
}

function setStageTransform() {
  graphViewport.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.zoom})`;
}

function resetView() {
  state.zoom = 1;
  state.panX = 0;
  state.panY = 0;
  setStageTransform();
}

function zoomTo(nextZoom, anchorX = graphStage.clientWidth / 2, anchorY = graphStage.clientHeight / 2) {
  const previousZoom = state.zoom;
  const safeZoom = clamp(nextZoom, 0.6, 2.4);
  const worldX = (anchorX - state.panX) / previousZoom;
  const worldY = (anchorY - state.panY) / previousZoom;
  state.zoom = safeZoom;
  state.panX = anchorX - worldX * safeZoom;
  state.panY = anchorY - worldY * safeZoom;
  setStageTransform();
}

function buildGraph({ reseed = false } = {}) {
  if (reseed) layoutSeed = Math.random();

  articles = readLibrary();
  viewedIds = readViewedIds();
  const visible = filteredArticles();
  const width = graphStage.clientWidth || window.innerWidth;
  const height = Math.max(window.innerHeight - 120, 980 + visible.length * 10);

  state.worldWidth = width;
  state.worldHeight = height;
  graphStage.style.height = `${height}px`;
  graphLinks.setAttribute("viewBox", `0 0 ${width} ${height}`);
  graphLinks.setAttribute("width", `${width}`);
  graphLinks.setAttribute("height", `${height}`);
  graphViewport.style.width = `${width}px`;
  graphViewport.style.height = `${height}px`;

  const categories = uniqueSorted(visible.map((article) => article.category));
  const tags = uniqueSorted(visible.flatMap((article) => article.tags || []));

  graph.categoryNodes = layoutStaggered(
    categories.map((label) => ({
      id: `category:${label}`,
      type: "category",
      label,
      count: visible.filter((article) => article.category === label).length,
      x: 0,
      y: 0,
    })),
    {
      x0: width * 0.08,
      x1: width * 0.92,
      y0: height * 0.09,
      y1: height * 0.2,
    }
    ,
    { rows: 2, xJitter: 42, yJitter: 14, rowOffset: 18 }
  );

  graph.tagNodes = layoutStaggered(
    tags.map((label) => ({
      id: `tag:${label}`,
      type: "tag",
      label,
      count: visible.filter((article) => (article.tags || []).includes(label)).length,
      x: 0,
      y: 0,
    })),
    {
      x0: width * 0.06,
      x1: width * 0.94,
      y0: height * 0.79,
      y1: height * 0.91,
    }
    ,
    { rows: 3, xJitter: 52, yJitter: 14, rowOffset: 10 }
  );

  const categoryMap = new Map(graph.categoryNodes.map((node) => [node.label, node]));
  const tagMap = new Map(graph.tagNodes.map((node) => [node.label, node]));
  const orderedArticles = articleOrder(visible);
  const articleColumns = clamp(Math.round(width / 210), 5, 9);
  const articleRows = Math.max(4, Math.ceil(orderedArticles.length / articleColumns));
  const articleLeft = width * 0.06;
  const articleRight = width * 0.94;
  const articleTop = height * 0.25;
  const articleBottom = height * 0.74;
  const articleXStep = articleColumns === 1 ? 0 : (articleRight - articleLeft) / (articleColumns - 1);
  const articleYStep = articleRows === 1 ? 0 : (articleBottom - articleTop) / (articleRows - 1);

  graph.articleNodes = orderedArticles.map((article, index) => {
    const categoryNode =
      categoryMap.get(article.category) ||
      graph.categoryNodes[index % Math.max(1, graph.categoryNodes.length)];
    const linkedTags = (article.tags || []).map((tag) => tagMap.get(tag)).filter(Boolean);
    const categoryPoint = categoryNode || {
      x: width / 2,
      y: height * 0.16,
    };
    const tagPoint = linkedTags.length
      ? linkedTags.reduce(
          (acc, node) => {
            acc.x += node.x;
            acc.y += node.y;
            return acc;
          },
          { x: 0, y: 0 }
        )
      : { x: categoryPoint.x, y: height * 0.68 };
    const tagCount = linkedTags.length || 1;
    const gridColumn = index % articleColumns;
    const gridRow = Math.floor(index / articleColumns);
    const seed = seededValue(articleKey(article));
    const categoryBiasX = (categoryPoint.x - width / 2) * 0.4;
    const categoryBiasY = (categoryPoint.y - articleTop) * 0.22;
    const tagBiasX = (tagPoint.x / tagCount - width / 2) * 0.18;
    const tagBiasY = (tagPoint.y / tagCount - articleBottom) * 0.12;
    const laneOffset = gridRow % 2 === 0 ? 0 : articleXStep * 0.28;
    const waveX = Math.sin(seed * Math.PI * 2) * (26 + (gridRow % 4) * 7);
    const waveY = Math.cos(seed * Math.PI * 2) * (20 + (gridColumn % 3) * 6);
    const baseX = articleLeft + gridColumn * articleXStep + laneOffset + categoryBiasX + tagBiasX + waveX;
    const baseY = articleTop + gridRow * articleYStep + (gridColumn % 2 === 0 ? 0 : articleYStep * 0.18) + categoryBiasY + tagBiasY + waveY;
    const x = clamp(baseX, 56, width - 56);
    const y = clamp(baseY, articleTop, articleBottom);

    return {
      id: articleKey(article),
      article,
      viewed: viewedIds.has(articleKey(article)),
      x,
      y,
      vx: 0,
      vy: 0,
      targetX: baseX,
      targetY: baseY,
      width: clamp(fitTextWidth(article.title, 148, 224), 148, 224),
      height: fitTextHeight(article.title),
      rotation: (seed - 0.5) * 5,
      seed,
      categoryNode,
      tagNodes: linkedTags,
    };
  });

  graph.links = [];
  graph.articleNodes.forEach((node) => {
    if (node.categoryNode) {
      graph.links.push({ source: node, target: node.categoryNode, kind: "category" });
    }
    node.tagNodes.slice(0, 4).forEach((tagNode) => {
      graph.links.push({ source: node, target: tagNode, kind: "tag" });
    });
  });

  renderGraph();
  renderFilters();
  updateStats();
  if (activeArticle && !visible.some((article) => articleKey(article) === articleKey(activeArticle))) {
    closeDetail();
  }
}

function renderGraph() {
  graphNodes.innerHTML = "";
  graphLinks.innerHTML = "";

  graph.categoryNodes.forEach((node) => {
    const button = createEl("button", "graph-node graph-node--category");
    button.type = "button";
    button.style.width = `${fitTextWidth(node.label, 92, 170) + 44}px`;
    button.style.left = `${node.x}px`;
    button.style.top = `${node.y}px`;
    button.innerHTML = `<span>${node.label}</span><small>${node.count}</small>`;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      state.category = node.label;
      rebuildGraph({ reseed: false });
    });
    node.el = button;
    graphNodes.appendChild(button);
  });

  graph.tagNodes.forEach((node) => {
    const button = createEl("button", "graph-node graph-node--tag");
    button.type = "button";
    button.style.width = `${fitTextWidth(node.label, 84, 160) + 36}px`;
    button.style.left = `${node.x}px`;
    button.style.top = `${node.y}px`;
    button.innerHTML = `<span>${node.label}</span><small>${node.count}</small>`;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      state.tag = node.label;
      rebuildGraph({ reseed: false });
    });
    node.el = button;
    graphNodes.appendChild(button);
  });

  graph.articleNodes.forEach((node) => {
    const button = createEl(
      "button",
      `graph-node graph-node--article${node.viewed ? " is-viewed" : " is-unviewed"}`
    );
    button.type = "button";
    button.style.width = `${node.width}px`;
    button.style.height = `${node.height}px`;
    button.style.left = `${node.x}px`;
    button.style.top = `${node.y}px`;
    button.style.setProperty("--rotation", `${node.rotation}deg`);
    const shortTitle = node.article.title.length > 34 ? `${node.article.title.slice(0, 33)}…` : node.article.title;
    button.innerHTML = `
      <strong>${shortTitle}</strong>
      <span class="graph-node-meta">${node.article.category} · ${node.article.rating}/10</span>
    `;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      showDetail(node.article);
    });
    node.el = button;
    graphNodes.appendChild(button);
  });

  graph.links.forEach((link) => {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.classList.add("graph-link", `graph-link--${link.kind}`);
    graphLinks.appendChild(line);
    link.el = line;
  });
}

function updatePhysics() {
  if (!graph.articleNodes.length) return;

  const now = performance.now();
  const centerX = state.worldWidth / 2;
  const centerY = state.worldHeight / 2;
  const topBand = state.worldHeight * 0.23;
  const bottomBand = state.worldHeight * 0.76;

  graph.articleNodes.forEach((node) => {
    const waveX = Math.sin(now / 1800 + node.seed * 12) * 0.22;
    const waveY = Math.cos(now / 2400 + node.seed * 16) * 0.2;
    node.vx += (node.targetX - node.x) * 0.0038 + waveX + (centerX - node.x) * 0.00012;
    node.vy += (node.targetY - node.y) * 0.0038 + waveY + (centerY - node.y) * 0.0001;
  });

  for (let pass = 0; pass < 2; pass += 1) {
    for (let outer = 0; outer < graph.articleNodes.length; outer += 1) {
      for (let inner = outer + 1; inner < graph.articleNodes.length; inner += 1) {
        const a = graph.articleNodes[outer];
        const b = graph.articleNodes[inner];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const distance = Math.hypot(dx, dy) || 1;
        const minDistance = ((a.width + b.width) * 0.5 + 26) * 1.05;
        if (distance < minDistance) {
          const push = ((minDistance - distance) / distance) * 0.024;
          const offsetX = dx * push;
          const offsetY = dy * push;
          a.vx -= offsetX;
          a.vy -= offsetY;
          b.vx += offsetX;
          b.vy += offsetY;
        }
      }
    }
  }

  graph.articleNodes.forEach((node) => {
    node.vx *= 0.88;
    node.vy *= 0.88;
    node.x += node.vx;
    node.y += node.vy;
    node.x = clamp(node.x, 44, state.worldWidth - 44);
    node.y = clamp(node.y, topBand, bottomBand);
    node.el.style.left = `${node.x}px`;
    node.el.style.top = `${node.y}px`;
    node.el.classList.toggle("is-viewed", node.viewed);
    node.el.classList.toggle("is-unviewed", !node.viewed);
  });
}

function updateLinks() {
  graph.links.forEach((link) => {
    link.el.setAttribute("x1", `${link.source.x}`);
    link.el.setAttribute("y1", `${link.source.y}`);
    link.el.setAttribute("x2", `${link.target.x}`);
    link.el.setAttribute("y2", `${link.target.y}`);
  });
}

function showDetail(article) {
  activeArticle = article;
  graphDetail.hidden = false;
  graphDetailRating.textContent = `个人感受 ${article.rating}/10`;
  graphDetailTitle.textContent = article.title;
  graphDetailCategory.textContent = article.category || "未分类";
  graphDetailTags.innerHTML = "";
  (article.tags || []).forEach((tag) => {
    graphDetailTags.appendChild(createEl("span", "graph-detail-tag", tag));
  });
  graphDetailLink.href = article.url;
  graphDetailLink.title = `打开 ${article.title}`;
}

function closeDetail() {
  activeArticle = null;
  graphDetail.hidden = true;
}

function markViewed(article) {
  const key = articleKey(article);
  if (!viewedIds.has(key)) {
    viewedIds.add(key);
    writeViewedIds();
  }
  graph.articleNodes.forEach((node) => {
    if (articleKey(node.article) === key) {
      node.viewed = true;
    }
  });
  updateStats();
}

function rebuildGraph({ reseed = false } = {}) {
  closeDetail();
  buildGraph({ reseed });
  setStageTransform();
}

function animationLoop() {
  updatePhysics();
  updateLinks();
  animationFrame = window.requestAnimationFrame(animationLoop);
}

function beginDrag(event) {
  if (event.button !== 0) return;
  if (event.target.closest(".graph-node, .graph-toolbar, .graph-detail")) return;
  state.dragging = true;
  state.dragStartX = event.clientX;
  state.dragStartY = event.clientY;
  state.dragPanX = state.panX;
  state.dragPanY = state.panY;
  graphStage.classList.add("is-dragging");
  graphStage.setPointerCapture(event.pointerId);
}

function onDrag(event) {
  if (!state.dragging) return;
  state.panX = state.dragPanX + (event.clientX - state.dragStartX);
  state.panY = state.dragPanY + (event.clientY - state.dragStartY);
  setStageTransform();
}

function endDrag(event) {
  if (!state.dragging) return;
  state.dragging = false;
  graphStage.classList.remove("is-dragging");
  try {
    graphStage.releasePointerCapture(event.pointerId);
  } catch (error) {
    // Ignore capture release errors when the pointer already left the stage.
  }
}

graphDetail.addEventListener("click", (event) => event.stopPropagation());
graphDetailLink.addEventListener("click", (event) => {
  if (!activeArticle) return;
  event.preventDefault();
  markViewed(activeArticle);
  window.open(activeArticle.url, "_blank", "noopener,noreferrer");
});

graphClose.addEventListener("click", closeDetail);
graphStage.addEventListener("click", () => closeDetail());
graphStage.addEventListener("pointerdown", beginDrag);
graphStage.addEventListener("pointermove", onDrag);
graphStage.addEventListener("pointerup", endDrag);
graphStage.addEventListener("pointercancel", endDrag);
graphStage.addEventListener("pointerleave", endDrag);
graphStage.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.12 : 0.12;
    zoomTo(state.zoom + delta, event.clientX, event.clientY);
  },
  { passive: false }
);

rebuildButton.addEventListener("click", () => rebuildGraph({ reseed: true }));
zoomInButton.addEventListener("click", () => zoomTo(state.zoom + 0.12));
zoomOutButton.addEventListener("click", () => zoomTo(state.zoom - 0.12));
zoomResetButton.addEventListener("click", resetView);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDetail();
  if ((event.metaKey || event.ctrlKey) && event.key === "=") {
    event.preventDefault();
    zoomTo(state.zoom + 0.12);
  }
  if ((event.metaKey || event.ctrlKey) && event.key === "-") {
    event.preventDefault();
    zoomTo(state.zoom - 0.12);
  }
  if ((event.metaKey || event.ctrlKey) && event.key === "0") {
    event.preventDefault();
    resetView();
  }
});

window.addEventListener("storage", () => {
  articles = readLibrary();
  viewedIds = readViewedIds();
  rebuildGraph({ reseed: false });
});

window.addEventListener("resize", () => {
  rebuildGraph({ reseed: false });
});

window.addEventListener("blur", () => {
  state.dragging = false;
  graphStage.classList.remove("is-dragging");
});

buildGraph({ reseed: false });
setStageTransform();
animationLoop();
