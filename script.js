const CONFIG = {
  name: "Dr. Chizubem Benson",
  birthdayDate: "2026-10-01T00:00:00",
  typedMessage: `To a remarkable mentor, guide, and incredible uncle—Happy Birthday, Dr. Chizubem Benson! 🌟

Thank you for your endless wisdom, support, and the great example you set for us every single day. Your dedication, warmth, and laughter make every moment with family special, and having an uncle like you is a true blessing.

Your life is a beautiful example of strength, kindness, and grace. May your new age be filled with abundant joy, peace, health, prosperity, and countless reasons to smile. May God bless you with long life, divine favor, and deeper happiness in every chapter ahead.

We celebrate you today and always. Happy Birthday, and may your dreams continue to shine brighter than ever! 🥂✨`,
  floatingEmojis: ["🎈", "✨", "💖", "🎉", "🌸", "⭐"]
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".highlight-name").forEach((el) => {
    el.textContent = CONFIG.name;
  });

  initParticles();
  initFloatingElements();

  let progress = 0;
  const loaderBar = document.getElementById("loader-bar");
  const loadingInterval = setInterval(() => {
    progress += 15;
    if (loaderBar) loaderBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(loadingInterval);
      setTimeout(() => {
        const loader = document.getElementById("loading-screen");
        const main = document.getElementById("main-content");
        if (loader) loader.style.opacity = "0";
        setTimeout(() => {
          if (loader) loader.classList.add("hidden");
          if (main) main.classList.remove("hidden");
        }, 800);
      }, 300);
    }
  }, 150);

  bindOpenGift();
  initRevealObserver();
  bindGalleryLightbox();
  bindCakeInteraction();
  bindMusicPlayer();
  bindCountdown();
  bindReplay();
  bindTypewriter();
});

function bindOpenGift() {
  const button = document.getElementById("open-gift-btn");
  const giftBox = document.getElementById("gift-box-hero");
  const wrapper = document.getElementById("experience-wrapper");

  if (!button || !giftBox || !wrapper) return;

  button.addEventListener("click", () => {
    giftBox.classList.add("opening");
    triggerConfetti(2200);
    playAudioOnceUserGesture();

    setTimeout(() => {
      wrapper.classList.remove("hidden-flow");
      setTimeout(() => {
        const firstSection = document.getElementById("welcome-section");
        if (firstSection) firstSection.classList.add("is-visible");
      }, 80);
    }, 420);
  });
}

function initRevealObserver() {
  const sections = document.querySelectorAll(".reveal-section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, {
    threshold: 0.18
  });

  sections.forEach((section) => observer.observe(section));
}

function bindGalleryLightbox() {
  const cards = document.querySelectorAll(".memory-card");
  const modal = document.getElementById("lightbox");
  const image = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  const close = document.getElementById("lightbox-close");

  if (!cards.length || !modal || !image || !caption || !close) return;

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const src = card.dataset.src;
      const img = card.querySelector("img");
      image.src = src || img.src;
      caption.textContent = card.dataset.caption || "";
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  close.addEventListener("click", () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
    }
  });
}

function bindCakeInteraction() {
  const cake = document.getElementById("cake");
  const flames = document.querySelectorAll(".flame");
  const wishStatus = document.getElementById("wish-status");
  if (!cake || !flames.length) return;

  let blownOut = false;

  cake.addEventListener("click", () => {
    if (blownOut) return;
    blownOut = true;

    flames.forEach((flame) => flame.classList.add("out"));
    triggerConfetti(2500);

    if (wishStatus) {
      wishStatus.classList.remove("hidden-text");
    }
  });
}

function playAudioOnceUserGesture() {
  const audio = document.getElementById("bg-music");
  if (!audio) return;

  if (audio.paused) {
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  }
}

function bindMusicPlayer() {
  const audio = document.getElementById("bg-music");
  const playBtn = document.getElementById("play-pause-btn");
  const seekBar = document.getElementById("seek-bar");
  const volumeBar = document.getElementById("volume-bar");
  const currTimeEl = document.getElementById("curr-time");
  const durTimeEl = document.getElementById("dur-time");
  const disc = document.getElementById("disc-icon");

  if (!audio || !playBtn || !seekBar || !volumeBar || !currTimeEl || !durTimeEl || !disc) return;

  function formatTime(secs) {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      playAudioOnceUserGesture();
      playBtn.textContent = "⏸️";
      disc.classList.add("spinning");
    } else {
      audio.pause();
      playBtn.textContent = "▶️";
      disc.classList.remove("spinning");
    }
  });

  audio.addEventListener("play", () => {
    playBtn.textContent = "⏸️";
    disc.classList.add("spinning");
  });

  audio.addEventListener("pause", () => {
    playBtn.textContent = "▶️";
    disc.classList.remove("spinning");
  });

  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    seekBar.value = (audio.currentTime / audio.duration) * 100;
    currTimeEl.textContent = formatTime(audio.currentTime);
    durTimeEl.textContent = formatTime(audio.duration);
  });

  seekBar.addEventListener("input", () => {
    if (audio.duration) {
      audio.currentTime = (seekBar.value / 100) * audio.duration;
    }
  });

  volumeBar.addEventListener("input", () => {
    audio.volume = Number(volumeBar.value) / 100;
  });

  audio.volume = 0.8;
}

function bindCountdown() {
  const cdDays = document.getElementById("cd-days");
  const cdHours = document.getElementById("cd-hours");
  const cdMinutes = document.getElementById("cd-minutes");
  const cdSeconds = document.getElementById("cd-seconds");
  const alertEl = document.getElementById("birthday-alert");

  if (!cdDays || !cdHours || !cdMinutes || !cdSeconds) return;

  function updateTimer() {
    const target = new Date(CONFIG.birthdayDate).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      cdDays.textContent = "00";
      cdHours.textContent = "00";
      cdMinutes.textContent = "00";
      cdSeconds.textContent = "00";
      if (alertEl) alertEl.classList.remove("hidden");
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    cdDays.textContent = String(days).padStart(2, "0");
    cdHours.textContent = String(hours).padStart(2, "0");
    cdMinutes.textContent = String(minutes).padStart(2, "0");
    cdSeconds.textContent = String(seconds).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

function bindReplay() {
  const replayBtn = document.getElementById("replay-btn");
  if (!replayBtn) return;

  replayBtn.addEventListener("click", () => {
    playAudioOnceUserGesture();
    triggerConfetti(3000);

    const wrapper = document.getElementById("experience-wrapper");
    const sections = document.querySelectorAll(".reveal-section");
    const giftBox = document.getElementById("gift-box-hero");

    sections.forEach((section) => section.classList.remove("is-visible"));
    if (wrapper) wrapper.classList.add("hidden-flow");

    const hero = document.getElementById("hero-gift");
    if (hero) hero.style.display = "flex";

    const button = document.getElementById("open-gift-btn");
    if (button) button.disabled = false;

    if (giftBox) giftBox.classList.remove("opening");
  });
}

let typewriterStarted = false;

function bindTypewriter() {
  const messageSection = document.getElementById("message-section");
  if (!messageSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !typewriterStarted) {
        typewriterStarted = true;
        startTypewriter();
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  observer.observe(messageSection);
}

function startTypewriter() {
  const target = document.getElementById("typewriter-text");
  const text = CONFIG.typedMessage;
  let index = 0;

  if (!target) return;
  target.textContent = "";

  function typeNextChar() {
    if (index < text.length) {
      target.textContent += text.charAt(index);
      index++;
      setTimeout(typeNextChar, 35 + Math.random() * 25);
    }
  }

  typeNextChar();
}

function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.45 + 0.2,
      speedY: Math.random() * 0.6 + 0.12
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.y -= p.speedY;
      if (p.y < 0) p.y = height;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 184, 207, ${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(render);
  }

  render();
}

function initFloatingElements() {
  const container = document.getElementById("floating-bg");
  if (!container) return;

  for (let i = 0; i < 18; i++) {
    const el = document.createElement("div");
    el.className = "floating-element";
    el.textContent = CONFIG.floatingEmojis[Math.floor(Math.random() * CONFIG.floatingEmojis.length)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDuration = `${10 + Math.random() * 12}s`;
    el.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(el);
  }
}

function triggerConfetti(durationMs = 2200) {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const colors = ["#ff416c", "#ff4b2b", "#a855f7", "#ffd700", "#ffffff", "#00f2fe"];
  const pieces = [];

  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: width / 2,
      y: height / 2,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.7) * 18,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.22,
      opacity: 1
    });
  }

  const startTime = Date.now();

  function animate() {
    const elapsed = Date.now() - startTime;
    ctx.clearRect(0, 0, width, height);

    pieces.forEach((piece) => {
      piece.x += piece.vx;
      piece.y += piece.vy;
      piece.vy += piece.gravity;
      piece.rotation += piece.rotSpeed;

      if (elapsed > durationMs - 500) {
        piece.opacity = Math.max(0, piece.opacity - 0.02);
      }

      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate((piece.rotation * Math.PI) / 180);
      ctx.globalAlpha = piece.opacity;
      ctx.fillStyle = piece.color;
      ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
      ctx.restore();
    });

    if (elapsed < durationMs) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, width, height);
    }
  }

  animate();
}
