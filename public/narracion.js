const recorded = new Audio("./audio/ethan.mp3");
recorded.preload = "none";
const synth = window.speechSynthesis;
synth?.getVoices();
let active;
let utterance;

export function listenButton(label, text, welcome = false) {
  return `<button type="button" class="btn secondary" data-listen="${welcome ? "ethan" : "story"}" data-script="${encodeURIComponent(text)}">🔊 ${label}</button>`;
}

export function stopListening() {
  if (!active) return;
  const previous = active;
  active = null;
  recorded.pause();
  recorded.currentTime = 0;
  synth?.cancel();
  utterance = null;
  previous.textContent = previous.dataset.original;
}

document.addEventListener("click", async event => {
  const control = event.target.closest("[data-listen]");
  if (!control) return;
  const repeat = active === control;
  stopListening();
  if (repeat) return;
  active = control;
  control.dataset.original = control.textContent;
  control.textContent = "■ Detener";
  const finish = () => { if (active === control) stopListening(); };
  const fail = () => {
    if (active !== control) return;
    finish();
    const status = document.createElement("p");
    status.setAttribute("role", "status");
    status.textContent = "El audio no está disponible en este dispositivo.";
    if (control.nextElementSibling?.getAttribute("role") !== "status") control.after(status);
  };
  if (control.dataset.listen === "ethan") {
    recorded.onended = finish;
    try { await recorded.play(); } catch { fail(); }
    return;
  }
  if (!synth || !window.SpeechSynthesisUtterance) { fail(); return; }
  utterance = new SpeechSynthesisUtterance(decodeURIComponent(control.dataset.script));
  const voices = synth.getVoices().filter(v => /^es\b/i.test(v.lang));
  const rank = v => (/natural|neural|premium|enhanced|mónica|paulina/i.test(v.name) ? 10 : 0) +
    (/^es-VE$/i.test(v.lang) ? 5 : /^es-(MX|US|CO|419)$/i.test(v.lang) ? 3 : 0);
  const voice = voices.sort((a,b) => rank(b) - rank(a))[0];
  if (voice) utterance.voice = voice;
  utterance.lang = voice?.lang || "es-VE";
  utterance.rate = 0.93;
  utterance.onend = finish;
  utterance.onerror = fail;
  synth.speak(utterance);
});
window.addEventListener("pagehide", stopListening);
