// Together since 28 August 2025, 11:16 AM WIB (Jakarta, UTC+7)
const START = new Date("2025-08-28T11:16:00+07:00");

const MESSAGE = [
  "happy 28th of the month, my love\nwe have been together for:\n",
  { timer: true },
  "\n\ni hope our love becomes eternal and this timer never dies...\ni love you too much bubuu 💜",
];

const TYPE_SPEED = 70; // ms per character

const pad = (n) => String(n).padStart(2, "0");

const formatElapsed = () => {
  let total = Math.max(0, Math.floor((Date.now() - START.getTime()) / 1000));
  const days = Math.floor(total / 86400);
  total %= 86400;
  const hours = Math.floor(total / 3600);
  total %= 3600;
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${days} days ${pad(hours)} hours ${pad(minutes)} minutes ${pad(seconds)} seconds`;
};

const typeMessage = (el) => {
  const caret = document.createElement("span");
  caret.className = "love-message__caret";
  el.appendChild(caret);

  // Flatten into steps; Array.from keeps the emoji in one piece
  const steps = MESSAGE.flatMap((part) =>
    typeof part === "string" ? Array.from(part) : [part]
  );

  let i = 0;
  const next = () => {
    if (i >= steps.length) {
      caret.classList.add("love-message__caret--done");
      return;
    }
    const step = steps[i++];
    if (typeof step === "string") {
      caret.before(step);
    } else {
      const timer = document.createElement("span");
      timer.className = "love-message__timer";
      timer.textContent = formatElapsed();
      caret.before(timer);
      setInterval(() => (timer.textContent = formatElapsed()), 1000);
    }
    setTimeout(next, TYPE_SPEED);
  };
  next();
};

// Browsers block sound until the visitor interacts, so the first tap
// anywhere starts the music and the button toggles it afterwards
const setupMusic = () => {
  const audio = document.querySelector(".music");
  const button = document.querySelector(".music-toggle");

  const render = () => {
    const playing = !audio.paused;
    button.textContent = playing ? "music on 🎵" : "tap for music 🎵";
    button.classList.toggle("music-toggle--playing", playing);
  };

  const play = () => audio.play().then(render).catch(render);

  audio.addEventListener("play", render);
  audio.addEventListener("pause", render);

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    audio.paused ? play() : audio.pause();
  });

  document.addEventListener("pointerdown", (e) => {
    if (!button.contains(e.target) && audio.paused && audio.currentTime === 0) play();
  });

  play(); // works only where autoplay is allowed
};

onload = () => {
    setupMusic();

    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);

    setTimeout(() => typeMessage(document.querySelector(".love-message")), 1500);
  };