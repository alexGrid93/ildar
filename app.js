const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const sounds = [
  // НИЖНИЙ РЯД (бас)
  "sounds/low1.mp3",
  "sounds/low2.mp3",
  "sounds/low3.mp3",
  "sounds/low4.mp3",

  // ТЕЛО
  "sounds/body1.mp3",
  "sounds/body2.mp3",
  "sounds/body3.mp3",
  "sounds/body4.mp3",

  // АКЦЕНТЫ
  "sounds/accent1.mp3",
  "sounds/accent2.mp3",
  "sounds/accent3.mp3",
  "sounds/accent4.mp3",

  // ВЕРХ
  "sounds/high1.mp3",
  "sounds/high2.mp3",
  "sounds/high3.mp3",
  "sounds/high4.mp3",
];

const buffers = [];
const pad = document.getElementById("pad");

/* ---------- Audio ---------- */

async function loadSound(url) {
  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer();
  return await audioCtx.decodeAudioData(arrayBuffer);
}

async function loadAll() {
  for (const s of sounds) {
    buffers.push(await loadSound(s));
  }
}

function playSound(index) {
  if (audioCtx.state !== "running") {
    audioCtx.resume();
  }

  const source = audioCtx.createBufferSource();
  source.buffer = buffers[index];
  source.connect(audioCtx.destination);
  source.start(0);
}

/* ---------- UI ---------- */

function createPads() {
  for (let i = 0; i < 16; i++) {
    const btn = document.createElement("div");

    const rowFromBottom = Math.floor(i / 4) + 1;
    const rowClass = `row-${5 - rowFromBottom}`;

    btn.className = `pad-button ${rowClass}`;
    btn.textContent = i + 1;

    btn.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        window.alert("fff");
        playSound(i);
      },
      { passive: false }
    );

    pad.appendChild(btn);
  }
}

/* ---------- Init ---------- */

(async () => {
  await loadAll();
  createPads();
})();
