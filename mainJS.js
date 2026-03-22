// ─── Particles ───────────────────────────────────────────────────────────────
particlesJS("tsparticles", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: ["#ffcc70", "#ff6b9d", "#ff9a9e", "#fff176", "#ffffff"] },
    shape: { type: "circle" },
    opacity: {
      value: 1, random: true,
      anim: { enable: true, speed: 0.8, opacity_min: 0.4, sync: false }
    },
    size: {
      value: 18, random: true,
      anim: { enable: true, speed: 3, size_min: 6, sync: false }
    },
    line_linked: { enable: true, distance: 150, color: "#ffcc70", opacity: 0.35, width: 1.5 },
    move: { enable: true, speed: 1.5, direction: "none", random: true, straight: false, out_mode: "out" }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" }
    },
    modes: {
      grab: { distance: 180, line_linked: { opacity: 0.6 } },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});

// audio list
const audioFiles = [
  "audio_list/Amazed - Lonestar.mp3",
  "audio_list/Be Brave - Owl City.mp3",
  "audio_list/Chris Brown - Next To You (feat. Justin Bieber).mp3",
  "audio_list/Cup of Joe - Multo.mp3",
  "audio_list/Eva Eugenio - Gulong Ng Palad.mp3",
  "audio_list/I Will Be Here For You - Michael W. Smith.mp3",
  "audio_list/Joe Lamont - Victims of Love.mp3",
  "audio_list/Jovit Baldivino - Pusong Bato.mp3",
  "audio_list/Katy Perry - The One That Got Away.mp3",
  "audio_list/Katy Perry - Thinking Of You.mp3",
  "audio_list/Kitchie Nadal - Huwag Na Huwag Mong Sasabihin.mp3",
  "audio_list/Kitchie Nadal - Majika.mp3",
  "audio_list/Lady A - Need You Now.mp3",
  "audio_list/Last Christmas - Wham!.mp3",
  "audio_list/Lucid Dream - Owl City.mp3",
  "audio_list/My Chemical Romance - I Don t Love You.mp3",
  "audio_list/ONE OK ROCK - Take What You Want (feat. 5 Seconds of Summer).mp3",
  "audio_list/Over October - Alive.mp3",
  "audio_list/The 1975 - About You.mp3",
  "audio_list/The Climb - Miley Cyrus.mp3",
  "audio_list/The Script - Six Degrees of Separation.mp3",
  "audio_list/Then You Look at Me - Celine Dion.mp3",
  "audio_list/Two is Better than One (ft. Talor Swift) - BOYS LIKE GIRLS.mp3"
];

const audio = new Audio();
let musicLocked = false;
let hasPlayed = false;

let currentTrack = "";

function preloadTrack() {
  currentTrack = audioFiles[Math.floor(Math.random() * audioFiles.length)];
  audio.src = currentTrack;
  audio.volume = 1;
  audio.load();
}

function playTrack() {
  audio.volume = 1;
  audio.play().catch(function(e) { console.warn("play failed:", e); });
  audio.onended = function() { musicLocked = false; };
  showNowPlaying(currentTrack);
}

const gradientPresets = [
  "preset-pastel", "preset-aurora", "preset-sunset", "preset-ocean",
  "preset-rosegold", "preset-neon", "preset-forest", "preset-candy",
  "preset-fire", "preset-midnight", "preset-spring", "preset-lavender"
];

function activateEffects() {
  const el = document.getElementById("gradient-bg");
  gradientPresets.forEach(function(p) { el.classList.remove(p); });
  el.classList.add(gradientPresets[Math.floor(Math.random() * gradientPresets.length)]);
  el.classList.add("active");
  document.getElementById("tsparticles").classList.add("active");
  document.getElementById("particles-default").classList.add("hidden");
}

function deactivateEffects() {
  const el = document.getElementById("gradient-bg");
  el.classList.remove("active");
  gradientPresets.forEach(function(p) { el.classList.remove(p); });
  document.getElementById("gradient-bg").classList.remove("active");
  document.getElementById("tsparticles").classList.remove("active");
  document.getElementById("particles-default").classList.remove("hidden");
}

function showNowPlaying(trackPath) {
  const name = trackPath.replace("audio_list/", "").replace(".mp3", "");
  const titleEl = document.getElementById("np-title");
  const cloneEl = document.getElementById("np-title-clone");
  const artEl = document.getElementById("np-art");
  titleEl.textContent = name;
  cloneEl.textContent = name;

  // Try to load matching cover image
  const coverPath = "audio_images/" + name + ".jpg";
  const img = new Image();
  img.onload = function() {
    artEl.style.backgroundImage = "url('" + coverPath + "')";
    artEl.style.backgroundSize = "cover";
    artEl.style.backgroundPosition = "center";
    artEl.textContent = "";
  };
  img.onerror = function() {
    artEl.style.backgroundImage = "";
    artEl.textContent = "♫";
  };
  img.src = coverPath;

  document.getElementById("now-playing").style.display = "flex";
}

function hideNowPlaying() {
  document.getElementById("now-playing").style.display = "none";
}

// play button for mobile/tablet
window.triggerMusic = function() {
  if (hasPlayed) return;
  hasPlayed = true;
  musicLocked = true;
  activateEffects();
  document.getElementById("music-bar").style.display = "none";
  noteEl.style.opacity = "1";
  playTrack();
};

// login
(function() {
  var _x = [107,117,114,100,97,112,121,97];
  function _chk(s) {
    if (s.length !== _x.length) return false;
    for (var i = 0; i < s.length; i++) {
      if (s.charCodeAt(i) !== _x[i]) return false;
    }
    return true;
  }
  function _unlock() {
    var ls = document.getElementById("login-screen");
    var mc = document.getElementById("main-content");
    ls.style.transition = "opacity 0.8s ease";
    ls.style.opacity = "0";
    document.body.classList.add("bg-main");
    setTimeout(function() {
      ls.style.display = "none";
      mc.classList.remove("hidden-main");
      mc.style.visibility = "visible";
      mc.style.opacity = "0";
      mc.style.transition = "opacity 0.8s ease";
      setTimeout(function() { mc.style.opacity = "1"; }, 50);
    }, 800);
  }
  function _fail() {
    var err = document.getElementById("login-error");
    err.textContent = "That\u2019s not right. Try again.";
    var inp = document.getElementById("name-input");
    inp.classList.add("shake");
    setTimeout(function() { inp.classList.remove("shake"); }, 500);
  }
  window._gate = function() {
    var v = document.getElementById("name-input").value.trim().toLowerCase();
    if (_chk(v)) { _unlock(); } else { _fail(); }
  };
})();

// Unlock audio context on user gesture, then open the book and preload track
function primeAndGate() {
  audio.src = audioFiles[0];
  audio.volume = 0;
  var p = audio.play();
  function afterPrime() {
    audio.pause();
    audio.currentTime = 0;
    window._gate();
    preloadTrack();
  }
  if (p !== undefined) {
    p.then(afterPrime).catch(afterPrime);
  } else {
    afterPrime();
  }
}

document.getElementById("enter-btn").addEventListener("click", primeAndGate);
document.getElementById("name-input").addEventListener("keydown", function(e) {
  if (e.key === "Enter") primeAndGate();
});

// myRandomized_Notes List
const allNotes = [
  "sungit baga ISUS ISUS...takot mo man",
  "ah ah ah...mga taga Nabuaaa talagaaa. Buko an considered na racist ta parehas lang kita sa rasa haha",
  "Salamat na very cold, grrrr....",
  "Ya wowers haha",
  "Hiii",
  "Iniwi, Goood luck and ulways wish U the best of outcome!",
  "si isay man kitun diri ma-fafall itun na smile malaka heavenly, bana man sana Anghel na chubby...:)",
  "Ya WOW haha?...adi nanaman si 'Ya Wow Haha'",
  "Thank you?",
  "photo bomber si Voight haha",
  "ako si Felix/Felicidad/B2, naghihintay parin hanggang ngayon at walang balak tumigil sa paghihintay. Amen <3",
  "isi ko lang cringe ko, super...",
  "Kurdapyaaaaa!",
  "mala anghel na smile + heavenly tone na tawa pero kin seryoso talagang naka tiger look, yikes takot grrrr...pero cute pa rin :)",
  "nagkagusto naman ako sa ibang babayi pero e-uutot ko lang su feelings and then vaaanish, pero ika, feeling ko bottomless pit hole na ulugan ko.",
  "since 2026...unong year na ba? Kin nababasa mo d hanggang nguwan, Godbless you and wish you the best and love you, always. --Felix/B2 <3",
  "pakagisong, check ka cp kin agko message...uda :(",
  "nakapirang steps na? 10k? Gibohon ta yan na 20k ta gusto ko pa magwalk na kaiba ika hehe...",
  "Thank you? pa ulit ulit haha",
  "If you're reading this, it means you scanned a little piece of my heart...",
  "Out of all the peeps in the wewld, I'm really glad I met you.",
  "Kin pinag scan mo d, ibig sabihon curious ika. Tauno ika curious? haha...keryes leng",
  "This QR code only works for one person: YOU.",
  "Caaaaanciiiillllll hmm...",
  "Meaningless daw panaginip...I say Neeeinnn!",
  "01001001 00100000 01101100 01101111 01110110 01100101 00100000 01000010 01000010 01010111 hahaha :)",
  "I made this little QR code just for you. Sometimes the smallest things carry the biggest feelings.",
  "I don't know where this will go. But I do know that I really enjoy every moment I get to talk to you.",
  "Loading Complete...Fatima scanned == Felix Happy :)"
];

const picked = allNotes[Math.floor(Math.random() * allNotes.length)];
const noteContainer = document.getElementById("notes-container");
const noteEl = document.createElement("p");
noteEl.className = "note-item";
noteEl.textContent = "\u201C" + picked + "\u201D";
noteEl.style.opacity = "0";
noteEl.style.transition = "opacity 1.2s ease";
noteContainer.appendChild(noteEl);

// mainBook Logic
function isImagePageVisible() {
  const el = document.getElementById("image-page");
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  const bookRect = document.querySelector(".flipbook").getBoundingClientRect();
  return rect.width > 50 && rect.left >= bookRect.left && rect.right <= bookRect.right + 5;
}

function getBookSize() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (vw >= 1600) return { width: 1120, height: 700 };
  if (vw >= 1024) return { width: 800, height: 500 };
  if (vw >= 768)  return { width: 600, height: 375 };
  const maxW = vw - 8;
  const maxH = vh - 70;
  const h = Math.round(maxW * 5 / 8);
  if (h <= maxH) return { width: maxW, height: h };
  return { width: Math.round(maxH * 8 / 5), height: maxH };
}

const bookSize = getBookSize();

$(".flipbook").turn({
  width: bookSize.width,
  height: bookSize.height,
  gradients: true,
  acceleration: true,
  when: {
    turning: function(_e) {
      if (musicLocked) _e.preventDefault();
    },
    turned: function(_e, _page) {
      const visible = isImagePageVisible();
      if (visible && !hasPlayed) {
        if (window.innerWidth >= 1024) {
          // Desktop: auto-play, track already preloaded
          hasPlayed = true;
          musicLocked = true;
          playTrack();
          activateEffects();
          noteEl.style.opacity = "1";
        } else {
          // Mobile/tablet: show play button
          document.getElementById("music-bar").style.display = "flex";
        }
      } else if (!visible) {
        document.getElementById("music-bar").style.display = "none";
        noteEl.style.opacity = "0";
        audio.pause();
        audio.currentTime = 0;
        musicLocked = false;
        hideNowPlaying();
        deactivateEffects();
      }
    }
  }
});
