import { games, pairs, peoples, sources } from "./content.js";

const main = document.querySelector("main");
const motionToggle = document.querySelector("#motion-toggle");
const scenery = document.querySelector("#scenery");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const announcement = document.querySelector("#announcement");
const progressKey = "aborigenes-ethan-recorrido-v1";
const lessonIds = Object.keys(peoples);
const gameIds = Object.keys(games);
const validProgress = [...lessonIds, ...gameIds];
let progress = new Set();
let roundState;
let currentGame;
let returnToLesson;
let sceneKey = "";
let motionPaused = false;
let pendingFlip;
let lastRoute = "";

try {
  const saved = JSON.parse(localStorage.getItem(progressKey));
  if (Array.isArray(saved)) progress = new Set(saved.filter(id => validProgress.includes(id)));
} catch {
  // The site also works when browser storage is unavailable.
}

function saveProgress() {
  try {
    localStorage.setItem(progressKey, JSON.stringify([...progress]));
  } catch {
    // Keep the current session usable when storage is disabled.
  }
}

function complete(id) {
  progress.add(id);
  saveProgress();
}

const emoji = (value, className = "") => `<span class="${className}" aria-hidden="true">${value}</span>`;
const button = (label, action, style = "secondary", attrs = "") =>
  `<button type="button" class="btn ${style}" data-action="${action}" ${attrs}>${label}</button>`;
const link = (label, href, style = "secondary") => `<a class="btn ${style}" href="${href}">${label}</a>`;
const back = (label, href) => `<a class="breadcrumb" href="${href}">← ${label}</a>`;
const sectionHead = (title, description = "") => `<div class="section-head"><div><h2>${title}</h2>${description ? `<p>${description}</p>` : ""}</div></div>`;
const pageHead = (title, description = "") => `<div class="page-head"><h1>${title}</h1>${description ? `<p>${description}</p>` : ""}</div>`;
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

function lessonCards() {
  return `<div class="cards">${Object.entries(peoples).map(([id, people]) =>
    `<a class="card" href="#leccion/${id}/1">
      <img class="cover" src="./art/escena-${id}.webp" alt="" decoding="async" loading="lazy">
      <div class="card-body"><span class="kicker">${people.area}</span>
        <h3>${people.name}</h3><p>${people.intro}</p><span>${progress.has(id) ? "✓ Volver a explorar" : "Explorar →"}</span>
      </div>
    </a>`).join("")}</div>`;
}

function gameCards() {
  return `<div class="cards">${Object.entries(games).map(([id, game]) =>
    `<a class="card game-card ${game.color}" href="#juego/${id}">
      <div class="card-body">${emoji(game.icon, "game-icon")}<h3>${game.name}</h3>
        <p>${game.description}</p><span>${progress.has(id) ? "✓ Volver a jugar" : "Jugar →"}</span>
      </div>
    </a>`).join("")}</div>`;
}

function home() {
  return `<section class="hero">
    <div class="hero-copy"><p class="eyebrow">Venezuela · Primer grado</p>
      <h1>Explora con <span>Ethan</span></h1>
      <p>Una aventura por los pueblos originarios de Venezuela.</p>
      <div class="actions">${link(`${emoji("🧭")} ¡Vamos a explorar!`, "#viaje/wayuu", "gold")}${link(`${emoji("🎲")} Jugar`, "#jugar", "")}</div>
    </div>
    <p class="scene-caption">${emoji("📍")} Gran Sabana</p>
  </section>
  <section class="section white-card gallery">${sectionHead("Elige tu primera aventura")}${lessonCards()}</section>
  <section class="section white-card gallery">${sectionHead("Vamos a jugar")}${gameCards()}</section>`;
}

const itemImages = {
  "Pescado": "pescado", "Maíz": "maiz", "Casabe": "casabe",
  "Manta wayúu": "manta", "Guayuco": "guayuco", "Canoa": "canoa",
};
const placeImages = {
  "Palafito": "delta", "Enramada": "guajira", "Churuata comunitaria": "sabana",
  "La Guajira": "guajira", "Delta del Orinoco": "delta", "Gran Sabana": "sabana",
};
const itemArt = (filename, isPlace) => `<img class="choice-art${isPlace ? " landscape" : ""}" src="./art/${filename}.webp" alt="">`;
const sceneDetails = {
  "El guayuco": "guayuco", "La manta wayúu": "manta", "Peces del delta": "pescado",
  "Maíz y frijoles": "maiz", "Yuca y casabe": "casabe", "El río y la canoa": "canoa",
};

const pins = { wayuu: [19.1, 19.1], warao: [78.5, 35.6], pemon: [79.1, 61.9] };

const stops = [
  { id: "wayuu", title: "Entre cactus y tejidos" },
  { id: "warao", title: "Por los canales del Orinoco" },
  { id: "pemon", title: "Entre tepuyes" },
];
const tourPath = (id) => `#viaje/${id}`;

function routeMap(current, compact = false) {
  const landscapes = { wayuu: "guajira", warao: "delta", pemon: "sabana" };
  return `<div class="map tour-map${compact ? " compact-map" : ""}">
    <img src="./art/mapa.svg" alt="Mapa de Venezuela">
    <svg class="route-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M19.1 19.1 C36 4 57 20 78.5 35.6 Q90 49 79.1 61.9" vector-effect="non-scaling-stroke"/>
    </svg>
    ${stops.map(({ id }, index) => {
      const [x, y] = pins[id];
      return `<a class="pin tour-pin" style="left:${x}%;top:${y}%" href="${tourPath(id)}"
        aria-label="Parada ${index + 1}, ${peoples[id].area}" ${id === current ? 'aria-current="step"' : ""}><img src="./art/${landscapes[id]}.webp" alt=""><b>${index + 1}</b><span>${peoples[id].area}</span></a>`;
    }).join("")}
  </div>`;
}

function explore() {
  return `${pageHead("Explora el mapa", "Toca un paisaje para viajar con Ethan.")}
    ${routeMap()}
    <div class="actions map-actions">${link("Iniciar recorrido visual →", tourPath(stops[0].id), "gold")}</div>
    ${lessonCards()}`;
}

function tour(id = stops[0].id) {
  const index = stops.findIndex(stop => stop.id === id);
  const stop = stops[index];
  if (!stop) {
    return `<section class="scene-stage"><article class="white-card focus-card tour-card">
      ${back("Mapa", "#explorar")}
      <h1>¡Completaste el viaje!</h1>
      <p>Visitaste La Guajira, el delta del Orinoco y la Gran Sabana.</p>
      ${routeMap(null, true)}
      <div class="actions">${link("Jugar →", "#jugar", "gold")}${link("Volver al mapa", "#explorar")}</div>
    </article></section>`;
  }
  const people = peoples[id];
  const previous = stops[index - 1];
  const next = stops[index + 1];
  return `<section class="scene-stage tour-stage"><article class="white-card focus-card tour-card">
    ${back("Mapa", "#explorar")}
    <p class="eyebrow">Viaje con Ethan · Parada ${index + 1} de ${stops.length}</p>
    <h1>${people.area}</h1>
    <p class="tour-subtitle">${stop.title} · Pueblo ${people.name}</p>
    <p>${people.intro}</p>
    ${routeMap(id, true)}
    <div class="actions tour-actions">
      ${link("Ver la lección", `#leccion/${id}/1/viaje`)}
      ${next ? link("Siguiente parada →", tourPath(next.id), "gold") : link("Terminar viaje →", tourPath("fin"), "gold")}
    </div>
    ${previous ? `<a class="tour-previous" href="${tourPath(previous.id)}">← Parada anterior</a>` : ""}
  </article></section>`;
}

function lesson(id, sceneIndex, fromTour = false) {
  const people = peoples[id];
  const [topic, title, description, icon] = people.scenes[sceneIndex];
  const last = sceneIndex === people.scenes.length - 1;
  const detail = sceneDetails[title];
  const lessonPath = (page) => `#leccion/${id}/${page}${fromTour ? "/viaje" : ""}`;
  return `<section class="scene-stage lesson-stage">
    <article class="white-card focus-card">
      ${fromTour ? back("Volver al viaje", tourPath(id)) : back("Mapa", "#explorar")}
      <p class="eyebrow">Pueblo ${people.name} · ${people.area}</p>
      <nav class="steps" aria-label="Páginas de la lección">${people.scenes.map(([label], index) =>
        `<a href="${lessonPath(index + 1)}" aria-label="Página ${index + 1}, ${label}" ${index === sceneIndex ? 'aria-current="step"' : ""}>${index + 1}</a>`).join("")}</nav>
      <div class="lesson-copy ${detail ? "with-detail" : ""}">
        <div><span class="kicker">${topic}</span><h1 id="scene-title" tabindex="-1">${title}</h1><p>${description}</p></div>
        ${detail ? `<img class="scene-detail" src="./art/${detail}.webp" alt="">` : emoji(icon, "lesson-icon")}
      </div>
      <div class="actions lesson-controls">
        ${sceneIndex > 0 ? link("← Anterior", lessonPath(sceneIndex)) : ""}
        ${last ? button(fromTour ? "Volver al viaje →" : "Terminar y jugar →", `finish-lesson:${id}`, "") : link("Siguiente →", lessonPath(sceneIndex + 2), "")}
        ${returnToLesson ? button("Volver a mi pregunta", "return-game") : ""}
      </div>
    </article>
  </section>`;
}

function shuffle(values) {
  const order = values.slice();
  for (let index = order.length - 1; index > 0; index--) {
    const swap = Math.floor(Math.random() * (index + 1));
    [order[index], order[swap]] = [order[swap], order[index]];
  }
  return order;
}

function initGame(id) {
  clearTimeout(pendingFlip);
  currentGame = id;
  roundState = {
    index: 0, selected: -1, hint: false, solved: false, done: false,
    deck: shuffle([0, 1, 2, 0, 1, 2]), open: [], matched: [], fact: "",
    order: [], sequencePeople: "warao", shuffledOrder: shuffle([0, 1, 2]),
  };
}

function choice(label, icon, action, state = "", disabled = false, marker = "") {
  const picture = itemImages[label] ?? placeImages[label];
  return `<button type="button" class="option ${state}" data-action="${action}" ${disabled ? "disabled" : ""}>
    ${picture ? itemArt(picture, Boolean(placeImages[label])) : emoji(icon)}<span>${escapeHtml(label)}${marker ? ` ${marker}` : ""}</span>
  </button>`;
}

function notice(message, success = false) {
  return `<div class="notice ${success ? "success" : ""}">
    <p>${success ? "✓" : "💡"} ${escapeHtml(message)}</p>
  </div>`;
}

function roundArt(game, title, eyebrow) {
  return `<div class="round-art ${game.color}">${emoji(game.icon, "game-icon")}<div>
    <span class="kicker">${eyebrow}</span><h2 id="game-step" tabindex="-1">${title}</h2>
  </div></div>`;
}

function quiz(id, game) {
  const state = roundState;
  const item = game.rounds[state.index];
  const basket = id === "cesta" ? Object.values(peoples).slice(0, state.index + (state.solved ? 1 : 0)) : [];
  const feedback = state.solved ? item.feedback : state.hint ? item.hint : "";
  return `${roundArt(game, item.title, `Pregunta ${state.index + 1} de ${game.rounds.length}`)}
    <div class="actions">${!state.solved ? button("Ver pista", "hint") : ""}${button("Ver la lección", "review-lesson")}</div>
    <div class="choices">${item.choices.map(({ label, icon }, index) => {
      const correct = state.solved && index === item.answer;
      const wrong = !state.solved && state.selected === index;
      return choice(label, icon, `answer:${index}`, correct ? "correct" : wrong ? "wrong" : "", state.solved, correct ? "✓" : wrong ? "↻" : "");
    }).join("")}</div>
    ${id === "cesta" ? `<p class="basket">${emoji("🧺")} Cesta ${basket.length} de 3 ${basket.map(people => emoji(people.food[0])).join("")}</p>` : ""}
    ${feedback ? notice(feedback, state.solved) : ""}
    ${state.solved ? `<div class="actions">${button(state.index + 1 === game.rounds.length ? "Ver mi logro →" : "Siguiente →", "next-round", "")}</div>` : ""}`;
}

function memory(game) {
  const state = roundState;
  return `${roundArt(game, "Encuentra las parejas", `${state.matched.length / 2} de 3 parejas`)}
    <p>Voltea dos cartas. Busca dos imágenes iguales.</p>
    <div class="memory">${state.deck.map((pair, index) => {
      const matched = state.matched.includes(index);
      const visible = state.open.includes(index) || matched;
      const locked = state.open.length === 2 || visible;
      return choice(visible ? pairs[pair].label : `Carta ${index + 1}`, visible ? pairs[pair].icon : "✦", `flip:${index}`, matched ? "matched" : visible ? "" : "face-down", locked, matched ? "✓" : "");
    }).join("")}</div>
    ${state.fact ? notice(state.fact, !state.open.length) : ""}
    ${state.matched.length === state.deck.length ? `<div class="actions">${button("Ver mi logro →", "finish-game", "")}</div>` : ""}`;
}

function sequence(game) {
  const state = roundState;
  const people = peoples[state.sequencePeople];
  const text = state.solved ? "¡Encontraste el orden!" : state.hint ? "Probemos de nuevo. Piensa en lo que pasó primero." : "";
  return `${roundArt(game, "¿Qué pasó primero?", `Historia del pueblo ${people.name}`)}
    <p>Toca las escenas en orden. Puedes deshacer tu última elección.</p>
    <div class="actions">
      <label for="sequence-people">Historia</label>
      <select id="sequence-people" class="btn secondary">${lessonIds.map(id => `<option value="${id}" ${id === state.sequencePeople ? "selected" : ""}>${peoples[id].name}</option>`).join("")}</select>
    </div>
    <div class="choices">${state.shuffledOrder.map(index =>
      choice(people.sequence[index][1], people.sequence[index][0], `place:${index}`, state.order.includes(index) ? "matched" : "", state.solved || state.order.includes(index))).join("")}</div>
    <ol class="sequence">${state.order.map((index, position) => `<li>${position + 1}. ${emoji(people.sequence[index][0])} ${people.sequence[index][1]}</li>`).join("")}</ol>
    ${text ? notice(text, state.solved) : ""}
    <div class="actions">
      ${state.solved ? button("Ver mi logro →", "finish-game", "") :
        `${state.order.length ? button("Deshacer", "undo") : ""}${state.order.length === 3 ? button("Revisar orden", "check-order", "") : ""}`}
    </div>`;
}

function gameView(id) {
  const game = games[id];
  let body;
  if (roundState.done) {
    body = `${emoji("🏅", "medal")}<h2 id="game-step" tabindex="-1">¡Actividad completada!</h2>
      <p>Tu estrella de ${game.name} está en Mis logros.</p>
      <div class="actions">${link("Más juegos", "#jugar", "")}${link("Mis logros", "#progreso")}${button("Jugar otra vez", "replay")}</div>`;
  } else if (game.rounds) {
    body = quiz(id, game);
  } else {
    body = id === "memoria" ? memory(game) : sequence(game);
  }
  return `<div class="scene-stage game-stage"><section class="white-card focus-card board">${back("Juegos", "#jugar")}<h1 class="activity-name">${game.name}</h1>${body}</section></div>`;
}

function progressView() {
  const list = (ids, object, path) => `<ul class="list">${ids.map(id =>
    `<li><a href="${path(id)}"><span>${object[id].name}</span><span>${progress.has(id) ? "★ Completado" : "→ Abrir"}</span></a></li>`).join("")}</ul>`;
  return `${pageHead("Mis logros", `Has completado ${progress.size} de ${validProgress.length} actividades.`)}
    <progress class="meter" value="${progress.size}" max="${validProgress.length}" aria-label="Actividades completadas"></progress>
    <section>${sectionHead("Lecciones")}${list(lessonIds, peoples, id => `#leccion/${id}/1`)}</section>
    <section class="section">${sectionHead("Juegos")}${list(gameIds, games, id => `#juego/${id}`)}</section>`;
}

function guide() {
  return `<div class="guide">${pageHead("Guía docente", "Pueblos originarios de Venezuela · Primer grado")}
    <section><h2>Cómo usar la web</h2><p>Abre una lección, escucha una escena y conversa sobre sus detalles. Después, invita al grupo a responder el juego sobre lo que vio.</p>
      <ul><li>Relacionar un paisaje con una vivienda o lugar de reunión.</li><li>Distinguir alimentos y prendas en su contexto.</li><li>Reconocer que los pueblos originarios siguen presentes en Venezuela.</li></ul>
      <p>Para conversar: ¿qué detalle de la historia te ayudó a elegir?</p>
      <div class="actions section">${link("Abrir lecciones", "#explorar")}${link("Abrir juegos", "#jugar")}</div>
    </section>
    <section><h2>Fuentes</h2><p>Las imágenes son ilustraciones educativas. El mapa indica lugares aproximados de las historias.</p>
      <ul>${sources.map(([title, url]) => `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a></li>`).join("")}
      <li><a href="https://github.com/johan/world.geo.json" target="_blank" rel="noopener noreferrer">World GeoJSON · Contorno del mapa</a></li></ul>
    </section>
    <section><h2>Dispositivos compartidos</h2>
      <p>El avance se guarda en este navegador. Puedes reiniciarlo si otro estudiante va a comenzar.</p>
      <div class="actions" style="margin-top:.8rem">${button("Reiniciar los logros", "reset")}</div>
    </section>
  </div>`;
}

function route() {
  const [page = "inicio", id, number, source] = (location.hash.slice(1) || "inicio").split("/");
  const scene = Number(number) - 1;
  return { page, id, scene, fromTour: source === "viaje" };
}

const sceneLabels = {
  warao: "Familia Warao en una canoa junto a una casa sobre postes, en el delta del Orinoco.",
  wayuu: "Una tejedora Wayúu le muestra su trabajo a una niña a la sombra de una enramada.",
  pemon: "Una familia Pemón comparte casabe al pie de los tepuyes de la Gran Sabana.",
};
const alternateScenes = { cesta: "pemon", ropa: "wayuu", memoria: "wayuu", reto: "pemon", ordenar: "warao" };

function updateScenery(page, id) {
  let scene = page === "inicio" ? "ethan" : "warao";
  if (page === "leccion" && lessonIds.includes(id)) scene = id;
  if (page === "viaje") scene = lessonIds.includes(id) ? id : id === "fin" ? "pemon" : stops[0].id;
  if (page === "jugar") scene = "wayuu";
  if (page === "progreso" || page === "guia") scene = "pemon";
  if (page === "juego" && gameIds.includes(id)) {
    scene = games[id].rounds?.[roundState.index]?.people ?? alternateScenes[id] ?? "warao";
    if (id === "ordenar") scene = roundState.sequencePeople;
  }
  const allowMotion = !reducedMotion.matches && !navigator.connection?.saveData;
  const key = `${scene}:${allowMotion}`;
  motionToggle.hidden = !allowMotion;
  motionToggle.textContent = motionPaused ? "▶ Activar animación" : "Ⅱ Pausar animación";
  scenery.style.setProperty("--cover-play", motionPaused ? "paused" : "running");
  if (key === sceneKey) return;
  sceneKey = key;
  scenery.className = `scenery scenery-${scene}${allowMotion ? " animated" : ""}`;
  scenery.innerHTML = `<img src="./art/escena-${scene}.webp" alt="">${allowMotion && scene !== "ethan" ?
    `<video muted ${motionPaused ? "" : "autoplay"} loop playsinline preload="none" poster="./art/escena-${scene}.webp" src="./art/escena-${scene}.mp4"></video>` : ""}`;
  const video = scenery.querySelector("video");
  if (video) {
    video.addEventListener("playing", () => video.classList.add("ready"), { once: true });
    video.muted = true;
    if (!motionPaused) video.play().catch(() => {});
  }
}

function render() {
  const { page, id, scene, fromTour } = route();
  let view;
  let active = page;
  if (page === "explorar") view = `<section class="white-card gallery">${explore()}</section>`;
  else if (page === "viaje") {
    view = tour(lessonIds.includes(id) || id === "fin" ? id : undefined);
    active = "explorar";
  } else if (page === "jugar") view = `<section class="white-card gallery">${pageHead("Vamos a jugar", "Elige una actividad.")}${gameCards()}</section>`;
  else if (page === "progreso") view = `<section class="white-card gallery">${progressView()}</section>`;
  else if (page === "guia") view = `<section class="white-card gallery">${guide()}</section>`;
  else if (page === "leccion" && lessonIds.includes(id) && Number.isInteger(scene) && peoples[id].scenes[scene]) {
    view = lesson(id, scene, fromTour);
    active = "explorar";
  } else if (page === "juego" && gameIds.includes(id)) {
    if (currentGame !== id) initGame(id);
    view = gameView(id);
    active = "jugar";
  } else {
    view = home();
  }
  updateScenery(page, id);
  main.innerHTML = view;
  if ((page === "leccion" || page === "viaje") && sceneLabels[id]) {
    const summary = document.createElement("p");
    summary.className = "sr-only";
    summary.textContent = sceneLabels[id];
    main.prepend(summary);
  }
  document.querySelectorAll(".top nav a").forEach(anchor => {
    if (anchor.hash === `#${active}`) anchor.setAttribute("aria-current", "page");
    else anchor.removeAttribute("aria-current");
  });
}

function announce(message) {
  announcement.textContent = message;
}

function focusAction(action) {
  main.querySelector(`[data-action="${action}"]`)?.focus({ preventScroll: true });
}

function repaint(target, message) {
  render();
  if (target) focusAction(target);
  else main.querySelector("#game-step")?.focus({ preventScroll: true });
  if (message) announce(message);
}

function playAction(action, value, id) {
  const state = roundState;
  const game = games[id];
  const item = game.rounds?.[state.index];
  const index = Number(value);
  if (action === "answer" && item && !state.solved && item.choices[index]) {
    state.selected = index;
    state.solved = index === item.answer;
    state.hint = !state.solved;
    if (state.solved) completeIfLastQuiz(id, game, state);
    repaint(state.solved ? "next-round" : `answer:${index}`, state.solved ? item.feedback : item.hint);
    main.querySelector(".notice")?.scrollIntoView({ block: "nearest" });
  } else if (action === "hint" && item) {
    state.hint = true;
    repaint("hint", item.hint);
    main.querySelector(".notice")?.scrollIntoView({ block: "nearest" });
  } else if (action === "review-lesson" && item) {
    returnToLesson = id;
    location.hash = `leccion/${item.people}/${item.scene + 1}`;
  } else if (action === "next-round" && state.solved) {
    if (state.index === game.rounds.length - 1) state.done = true;
    else {
      state.index++;
      state.selected = -1;
      state.solved = false;
      state.hint = false;
    }
    repaint();
    main.querySelector("#game-step")?.scrollIntoView({ block: "nearest" });
  } else if (action === "flip" && id === "memoria") {
    flip(index);
  } else if (id === "ordenar" && action === "place" && !state.solved && !state.order.includes(index)) {
    state.order.push(index);
    state.hint = false;
    const next = state.shuffledOrder.find(option => !state.order.includes(option));
    repaint(next === undefined ? "check-order" : `place:${next}`, `Escena ${state.order.length} elegida`);
  } else if (id === "ordenar" && action === "undo" && !state.solved) {
    const removed = state.order.pop();
    repaint(`place:${removed}`);
  } else if (id === "ordenar" && action === "check-order" && state.order.length === 3) {
    state.solved = state.order.every((item, index) => item === index);
    state.hint = !state.solved;
    if (state.solved) complete(id);
    else state.order = [];
    repaint(state.solved ? "finish-game" : `place:${state.shuffledOrder[0]}`, state.solved ? "Encontraste el orden." : "Probemos de nuevo.");
  } else if (action === "finish-game") {
    state.done = true;
    repaint();
  } else if (action === "replay") {
    initGame(id);
    repaint();
  }
}

function completeIfLastQuiz(id, game, state) {
  if (state.index === game.rounds.length - 1) complete(id);
}

function flip(index) {
  const state = roundState;
  state.open.push(index);
  if (state.open.length === 1) {
    state.fact = "";
    const next = state.deck.findIndex((_, i) => !state.open.includes(i) && !state.matched.includes(i));
    repaint(`flip:${next}`, `Carta ${index + 1}: ${pairs[state.deck[index]].label}`);
    return;
  }
  const [first, second] = state.open;
  if (state.deck[first] === state.deck[second]) {
    state.matched.push(first, second);
    state.open = [];
    state.fact = pairs[state.deck[first]].fact;
    const finished = state.matched.length === state.deck.length;
    if (finished) complete("memoria");
    const next = state.deck.findIndex((_, i) => !state.matched.includes(i));
    repaint(finished ? "finish-game" : `flip:${next}`, state.fact);
  } else {
    state.fact = "Estas cartas son distintas. Prueba otra vez.";
    repaint(null, state.fact);
    pendingFlip = setTimeout(() => {
      state.open = [];
      if (location.hash === "#juego/memoria" && state === roundState) repaint(`flip:${first}`);
    }, 1200);
  }
}

main.addEventListener("click", (event) => {
  const control = event.target.closest("[data-action]");
  if (!control) return;
  const [action, value] = control.dataset.action.split(":");
  const { page, id, fromTour } = route();
  if (action === "reset" && window.confirm("¿Quieres borrar el avance guardado en este navegador?")) {
    progress.clear();
    saveProgress();
    location.hash = "progreso";
  } else if (action === "finish-lesson") {
    complete(value);
    location.hash = fromTour ? tourPath(value) : "jugar";
  } else if (action === "return-game") {
    location.hash = `juego/${returnToLesson}`;
  } else if (page === "juego") {
    playAction(action, value, id);
  }
});

main.addEventListener("change", (event) => {
  if (event.target.id !== "sequence-people") return;
  roundState.sequencePeople = event.target.value;
  roundState.order = [];
  roundState.solved = false;
  roundState.hint = false;
  roundState.shuffledOrder = shuffle([0, 1, 2]);
  render();
  main.querySelector("#sequence-people").focus();
});

function navigate() {
  const { page, id } = route();
  announce("");
  if (page === "juego" && id === returnToLesson) {
    returnToLesson = undefined;
  } else if (page !== "leccion" || !returnToLesson) {
    currentGame = undefined;
    returnToLesson = undefined;
  }
  render();
  const nextRoute = location.hash;
  if (lastRoute && nextRoute.startsWith("#leccion/") && lastRoute.split("/").slice(0, 2).join("/") === nextRoute.split("/").slice(0, 2).join("/")) {
    main.querySelector("#scene-title")?.focus();
  } else {
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }
  lastRoute = nextRoute;
}

document.querySelector(".skip").addEventListener("click", (event) => {
  event.preventDefault();
  main.focus();
});
motionToggle.addEventListener("click", () => {
  motionPaused = !motionPaused;
  const video = scenery.querySelector("video");
  if (motionPaused) video?.pause();
  else video?.play().catch(() => {});
  const { page, id } = route();
  updateScenery(page, id);
});

window.addEventListener("hashchange", navigate);
reducedMotion.addEventListener("change", render);
render();
