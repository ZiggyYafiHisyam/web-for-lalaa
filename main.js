// Together since 28 August 2025, 11:16 AM (viewer's local time)
const START = new Date(2025, 7, 28, 11, 16, 0);

const MESSAGE = [
  "happy 28th of the month my love, we have been together for ",
  { timer: true },
  ". i hope our love becomes eternal and this timer never dies. i love u too much bubuu 💜",
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

onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);

    setTimeout(() => typeMessage(document.querySelector(".love-message")), 1500);
  };