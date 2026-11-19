import { games, pairs, peoples, sources } from "./content.js";
import { cues } from "./audio-cues.js";

const main = document.querySelector("main");
const announcement = document.querySelector("#announcement");
const progressKey = "aborigenes-ethan-recorrido-v1";
const lessonIds = Object.keys(peoples);
const gameIds = Object.keys(games);
const validProgress = [...lessonIds, ...gameIds];
let progress = new Set();
let roundState;
let currentGame;
let returnToLesson;
let currentSound;
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

const artwork = (people) => `<img src="./art/${people.art}.webp" alt="${people.alt}" decoding="async">`;
const emoji = (value, className = "") => `<span class="${className}" aria-hidden="true">${value}</span>`;
const button = (label, action, style = "secondary", attrs = "") =>
  `<button type="button" class="btn ${style}" data-action="${action}" ${attrs}>${label}</button>`;
const link = (label, href, style = "secondary") => `<a class="btn ${style}" href="${href}">${label}</a>`;
const back = (label, href) => `<a class="breadcrumb" href="${href}">← ${label}</a>`;
const sectionHead = (title, description = "") => `<div class="section-head"><div><h2>${title}</h2>${description ? `<p>${description}</p>` : ""}</div></div>`;
const pageHead = (title, description = "") => `<div class="page-head"><h1>${title}</h1>${description ? `<p>${description}</p>` : ""}</div>`;
const audioButton = (action = "listen", label = "Escuchar") => button(`${emoji("🔊")} ${label}`, action);
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

function lessonCards() {
  return `<div class="cards">${Object.entries(peoples).map(([id, people]) =>
    `<a class="card" href="#leccion/${id}/1">
      <img class="cover" src="./art/${people.art}.webp" alt="" decoding="async">
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
      <h1>Explora los <span>pueblos originarios</span></h1>
      <p>Viaja por Venezuela, escucha historias y juega con lo que descubras.</p>
      <div class="actions">${link(`${emoji("🧭")} Explorar`, "#explorar", "gold")}${link(`${emoji("🎲")} Jugar`, "#jugar")}</div>
    </div>
    <figure>${artwork(peoples.warao)}<figcaption>${emoji("📍")} Delta del Orinoco</figcaption></figure>
  </section>
  <section class="section">${sectionHead("Elige tu primera aventura", "Tres pueblos, tres lugares para descubrir.")}${lessonCards()}</section>
  <section class="section">${sectionHead("Vamos a jugar")}${gameCards()}</section>`;
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

function explore() {
  return `${pageHead("Explora el mapa", "Toca un nombre para abrir su historia.")}
    <div class="map"><img src="./art/mapa.svg" alt="Mapa simplificado de Venezuela con tres lugares para explorar">
      ${Object.entries(pins).map(([id, [x, y]]) => `<a class="pin" style="left:${x}%;top:${y}%" href="#leccion/${id}/1" aria-label="${peoples[id].name}, ${peoples[id].area}">${peoples[id].name}</a>`).join("")}
    </div>${lessonCards()}`;
}

function lesson(id, sceneIndex) {
  const people = peoples[id];
  const [topic, title, spoken, icon] = people.scenes[sceneIndex];
  const last = sceneIndex === people.scenes.length - 1;
  const detail = sceneDetails[title];
  return `${back("Mapa", "#explorar")}${pageHead(`Pueblo ${people.name}`, people.area)}
    <nav class="steps" aria-label="Páginas de la lección">${people.scenes.map(([label], index) =>
      `<a href="#leccion/${id}/${index + 1}" aria-label="Página ${index + 1}, ${label}" ${index === sceneIndex ? 'aria-current="step"' : ""}>${index + 1}</a>`).join("")}</nav>
    <article class="lesson">
      <div class="lesson-art">${artwork(people)}${detail ? `<img class="scene-detail" src="./art/${detail}.webp" alt="">` : emoji(icon, "scene-icon")}</div>
      <div class="lesson-copy"><span class="kicker">${topic}</span><h2 id="scene-title" tabindex="-1">${title}</h2>
        <p>${spoken}</p>${audioButton()}
      </div>
    </article>
    <div class="actions lesson-controls">
      ${sceneIndex > 0 ? link("← Anterior", `#leccion/${id}/${sceneIndex}`) : "<span></span>"}
      ${last ? button("Terminar y jugar →", `finish-lesson:${id}`, "") : link("Siguiente →", `#leccion/${id}/${sceneIndex + 2}`, "")}
      ${returnToLesson ? button("Volver a mi pregunta", "return-game") : ""}
    </div>`;
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

function notice(message, success = false, listen = false) {
  return `<div class="notice ${success ? "success" : ""}">
    <p>${success ? "✓" : "💡"} ${escapeHtml(message)}</p>${listen ? audioButton("listen-feedback", "Escuchar mensaje") : ""}
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
    <div class="actions">${audioButton()}${!state.solved ? button("Ver pista", "hint") : ""}${button("Ver la lección", "review-lesson")}</div>
    <div class="choices">${item.choices.map(({ label, icon }, index) => {
      const correct = state.solved && index === item.answer;
      const wrong = !state.solved && state.selected === index;
      return choice(label, icon, `answer:${index}`, correct ? "correct" : wrong ? "wrong" : "", state.solved, correct ? "✓" : wrong ? "↻" : "");
    }).join("")}</div>
    ${id === "cesta" ? `<p class="basket">${emoji("🧺")} Cesta ${basket.length} de 3 ${basket.map(people => emoji(people.food[0])).join("")}</p>` : ""}
    ${feedback ? notice(feedback, state.solved, true) : ""}
    ${state.solved ? `<div class="actions">${button(state.index + 1 === game.rounds.length ? "Ver mi logro →" : "Siguiente →", "next-round", "")}</div>` : ""}`;
}

function memory(game) {
  const state = roundState;
  return `${roundArt(game, "Encuentra las parejas", `${state.matched.length / 2} de 3 parejas`)}
    <p>Voltea dos cartas. Busca dos imágenes iguales.</p>
    <div class="actions">${audioButton()}</div>
    <div class="memory">${state.deck.map((pair, index) => {
      const matched = state.matched.includes(index);
      const visible = state.open.includes(index) || matched;
      const locked = state.open.length === 2 || visible;
      return choice(visible ? pairs[pair].label : `Carta ${index + 1}`, visible ? pairs[pair].icon : "✦", `flip:${index}`, matched ? "matched" : visible ? "" : "face-down", locked, matched ? "✓" : "");
    }).join("")}</div>
    ${state.fact ? notice(state.fact, !state.open.length, true) : ""}
    ${state.matched.length === state.deck.length ? `<div class="actions">${button("Ver mi logro →", "finish-game", "")}</div>` : ""}`;
}

function sequence(game) {
  const state = roundState;
  const people = peoples[state.sequencePeople];
  const text = state.solved ? "¡Encontraste el orden!" : state.hint ? "Probemos de nuevo. Piensa en lo que pasó primero." : "";
  return `${roundArt(game, "¿Qué pasó primero?", `Historia del pueblo ${people.name}`)}
    <p>Toca las escenas en orden. Puedes deshacer tu última elección.</p>
    <div class="actions">${audioButton()}
      <label for="sequence-people">Historia</label>
      <select id="sequence-people" class="btn secondary">${lessonIds.map(id => `<option value="${id}" ${id === state.sequencePeople ? "selected" : ""}>${peoples[id].name}</option>`).join("")}</select>
    </div>
    <div class="choices">${state.shuffledOrder.map(index =>
      choice(people.sequence[index][1], people.sequence[index][0], `place:${index}`, state.order.includes(index) ? "matched" : "", state.solved || state.order.includes(index))).join("")}</div>
    <ol class="sequence">${state.order.map((index, position) => `<li>${position + 1}. ${emoji(people.sequence[index][0])} ${people.sequence[index][1]}</li>`).join("")}</ol>
    ${text ? notice(text, state.solved, true) : ""}
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
      <p>Tu estrella de ${game.name} está en Mi recorrido.</p>
      <div class="actions">${link("Más juegos", "#jugar", "")}${link("Mi recorrido", "#progreso")}${button("Jugar otra vez", "replay")}</div>`;
  } else if (game.rounds) {
    body = quiz(id, game);
  } else {
    body = id === "memoria" ? memory(game) : sequence(game);
  }
  return `<div class="play">${back("Juegos", "#jugar")}${pageHead(game.name)}<section class="board">${body}</section></div>`;
}

function progressView() {
  const list = (ids, object, path) => `<ul class="list">${ids.map(id =>
    `<li><a href="${path(id)}"><span>${object[id].name}</span><span>${progress.has(id) ? "★ Completado" : "→ Abrir"}</span></a></li>`).join("")}</ul>`;
  return `${pageHead("Mi recorrido", `Has completado ${progress.size} de ${validProgress.length} actividades.`)}
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
      <div class="actions" style="margin-top:.8rem">${button("Reiniciar el recorrido", "reset")}</div>
    </section>
  </div>`;
}

function route() {
  const [page = "inicio", id, number] = (location.hash.slice(1) || "inicio").split("/");
  const scene = Number(number) - 1;
  return { page, id, scene };
}

function render() {
  const { page, id, scene } = route();
  let view;
  let active = page;
  if (page === "explorar") view = explore();
  else if (page === "jugar") view = pageHead("Vamos a jugar", "Elige una actividad.") + gameCards();
  else if (page === "progreso") view = progressView();
  else if (page === "guia") view = guide();
  else if (page === "leccion" && lessonIds.includes(id) && Number.isInteger(scene) && peoples[id].scenes[scene]) {
    view = lesson(id, scene);
    active = "explorar";
  } else if (page === "juego" && gameIds.includes(id)) {
    if (currentGame !== id) initGame(id);
    view = gameView(id);
    active = "jugar";
  } else {
    view = home();
  }
  main.innerHTML = view;
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

function stopSound() {
  if (currentSound) currentSound.pause();
  currentSound = null;
  window.speechSynthesis?.cancel();
}

function speak(text, clip) {
  if (!text) return;
  stopSound();
  const synth = window.speechSynthesis;
  const voice = synth?.getVoices().find(item => item.lang.toLowerCase() === "es-ve") ??
    synth?.getVoices().find(item => item.lang.toLowerCase().startsWith("es") && item.localService);
  if (voice) {
    const words = new SpeechSynthesisUtterance(text);
    words.lang = voice.lang;
    words.voice = voice;
    words.rate = 0.87;
    synth.speak(words);
  } else if (cues[clip]) {
    const [track, start, end] = cues[clip];
    const audio = new Audio(`./audio/${track}.mp3`);
    currentSound = audio;
    audio.currentTime = start;
    audio.addEventListener("timeupdate", () => {
      if (audio.currentTime >= end) audio.pause();
    });
    audio.play().catch(() => {
      if (currentSound === audio) announce(text);
    });
  } else if (synth?.getVoices().some(item => item.lang.toLowerCase().startsWith("es"))) {
    const words = new SpeechSynthesisUtterance(text);
    words.lang = "es-VE";
    words.rate = 0.87;
    synth.speak(words);
  } else {
    announce(text);
  }
}

function listen(feedback) {
  const { page, id, scene } = route();
  if (page === "leccion") {
    speak(peoples[id].scenes[scene][2], `leccion-${id}-${scene}`);
    return;
  }
  const state = roundState;
  const item = games[id]?.rounds?.[state.index];
  if (item) {
    const key = `juego-${id}-${state.index}`;
    const suffix = state.solved ? "bien" : "pista";
    if (feedback) speak(state.solved ? item.feedback : item.hint, `${key}-${suffix}`);
    else speak(`${item.title} ${item.choices.map(choice => choice.label).join(". ")}.`, key);
  } else if (id === "memoria") {
    if (feedback) {
      const pair = pairs.findIndex(item => item.fact === state.fact);
      speak(state.fact, pair < 0 ? "memoria-intento" : `memoria-${pair}`);
    } else speak("Voltea dos cartas. Busca dos imágenes iguales.", "memoria");
  } else if (id === "ordenar") {
    if (feedback) {
      speak(state.solved ? "Encontraste el orden." : "Probemos de nuevo. Piensa en lo que pasó primero.", state.solved ? "ordenar-bien" : "ordenar-pista");
    } else {
      const people = peoples[state.sequencePeople];
      speak(`Toca las escenas en orden. ${people.sequence.map(item => item[1]).join(". ")}.`, `ordenar-${state.sequencePeople}`);
    }
  }
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
    speak(state.solved ? item.feedback : item.hint, `juego-${id}-${state.index}-${state.solved ? "bien" : "pista"}`);
  } else if (action === "hint" && item) {
    state.hint = true;
    repaint("hint");
    speak(item.hint, `juego-${id}-${state.index}-pista`);
  } else if (action === "review-lesson" && item) {
    returnToLesson = id;
    location.hash = `leccion/${item.people}/${item.scene + 1}`;
  } else if (action === "next-round" && state.solved) {
    stopSound();
    if (state.index === game.rounds.length - 1) state.done = true;
    else {
      state.index++;
      state.selected = -1;
      state.solved = false;
      state.hint = false;
    }
    repaint();
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
    stopSound();
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
  const { page, id } = route();
  if (action === "listen" || action === "listen-feedback") listen(action === "listen-feedback");
  else if (action === "reset" && window.confirm("¿Quieres borrar el avance guardado en este navegador?")) {
    progress.clear();
    saveProgress();
    location.hash = "progreso";
  } else if (action === "finish-lesson") {
    complete(value);
    location.hash = "jugar";
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
  stopSound();
  if (page === "juego" && id === returnToLesson) {
    returnToLesson = undefined;
  } else if (page !== "leccion" || !returnToLesson) {
    currentGame = undefined;
    returnToLesson = undefined;
  }
  render();
  const nextRoute = location.hash;
  if (lastRoute && nextRoute.startsWith("#leccion/") && lastRoute.split("/").slice(0, 2).join("/") === nextRoute.split("/").slice(0, 2).join("/")) {
    main.querySelector("#scene-title")?.focus({ preventScroll: true });
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
window.addEventListener("hashchange", navigate);
render();
