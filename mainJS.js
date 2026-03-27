// ─── Particles ───────────────────────────────────────────────────────────────
var isMobile = window.innerWidth < 1024;
particlesJS("tsparticles", {
  particles: {
    number: { value: isMobile ? 35 : 80, density: { enable: true, value_area: 800 } },
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

// ─── Login Vanta Background ───────────────────────────────────────────────────

// audio list
const audioFiles = [
  "audio_list/Amazed - Lonestar.mp3",
  "audio_list/Be Brave - Owl City.mp3",
  "audio_list/Next To You (ft. Justin Bieber) - Chris Brown.mp3",
  "audio_list/Cup of Joe - Multo.mp3",
  "audio_list/Eva Eugenio - Gulong Ng Palad.mp3",
  "audio_list/Ellie Goulding - Love Me Like You Do.mp3",
  "audio_list/George Michael - Careless Whisper.mp3",
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

let _preloadedCover = null;

// Preload the track immediately on page load so it's buffered before user reaches image page
(function() {
  currentTrack = _nextTrack();
  audio.src = currentTrack;
  audio.volume = 1;
  audio.preload = "auto";
  audio.load();
  const name = currentTrack.replace("audio_list/", "").replace(".mp3", "");
  _preloadedCover = new Image();
  _preloadedCover.src = "audio_images/" + name + ".jpg";
})();

// Shuffle bag — ensures every track plays once before repeating
function _nextTrack() {
  const key = "qrb_bag";
  let bag = [];
  try { bag = JSON.parse(localStorage.getItem(key) || "[]"); } catch(e) {}
  if (!bag.length) {
    // Refill and shuffle
    bag = audioFiles.slice();
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = bag[i]; bag[i] = bag[j]; bag[j] = tmp;
    }
  }
  const track = bag.pop();
  localStorage.setItem(key, JSON.stringify(bag));
  return track;
}

function preloadTrack() {
  currentTrack = _nextTrack();
  audio.src = currentTrack;
  audio.volume = 1;
  audio.preload = "auto";
  audio.load();
  const name = currentTrack.replace("audio_list/", "").replace(".mp3", "");
  _preloadedCover = new Image();
  _preloadedCover.src = "audio_images/" + name + ".jpg";
}

function playTrack() {
  audio.volume = 1;
  audio.play().catch(function(e) { console.warn("play failed:", e); });
  audio.onended = function() { musicLocked = false; preloadTrack(); };
  showNowPlaying(currentTrack);
}

const gradientPresets = [
  "preset-pastel", "preset-aurora", "preset-sunset", "preset-ocean",
  "preset-rosegold", "preset-neon", "preset-forest", "preset-candy",
  "preset-fire", "preset-midnight", "preset-spring", "preset-lavender",
  "preset-peach", "preset-arctic", "preset-toxic", "preset-galaxy",
  "preset-ember", "preset-mint", "preset-dusk", "preset-cherry", "preset-steel"
];

function activateEffects() {
  const el = document.getElementById("gradient-bg");
  gradientPresets.forEach(function(p) { el.classList.remove(p); });
  el.classList.add(gradientPresets[Math.floor(Math.random() * gradientPresets.length)]);
  el.classList.add("active");
  document.getElementById("tsparticles").classList.add("active");
  document.getElementById("particles-default").classList.add("hidden");
  document.getElementById("main-content").classList.add("vignette-on");
}

function deactivateEffects() {
  const el = document.getElementById("gradient-bg");
  el.classList.remove("active");
  gradientPresets.forEach(function(p) { el.classList.remove(p); });
  document.getElementById("gradient-bg").classList.remove("active");
  document.getElementById("tsparticles").classList.remove("active");
  document.getElementById("particles-default").classList.remove("hidden");
  document.getElementById("main-content").classList.remove("vignette-on");
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
    artEl.textContent = "\u266b";
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
  playTrack();
  setTimeout(revealNote, 300);
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
    ls.style.transition = "opacity 1s ease";
    ls.style.opacity = "0";
    document.body.classList.add("bg-main");
    mc.classList.remove("hidden-main");
    mc.style.visibility = "visible";
    mc.style.opacity = "0";
    mc.style.transition = "opacity 1s ease";
    setTimeout(function() {
      ls.style.display = "none";
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          mc.style.opacity = "1";
          document.querySelector(".book-wrapper").classList.add("drop-in");
        });
      });
    }, 200);
  }
  function _fail() {
    var err = document.getElementById("login-error");
    err.textContent = "Lipat na ku ngaran niya...";
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
  audio.volume = 0;
  var p = audio.play();
  function afterPrime() {
    audio.pause();
    audio.currentTime = 0;
    audio.volume = 1;
    window._gate();
  }
  if (p !== undefined) {
    p.then(afterPrime).catch(function() {
      audio.volume = 1;
      window._gate();
    });
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
  "sungit baga ISUS ISUS...takot mo man 😱",
  "Ah Ah Ah",
  "nag message sa salamat pero bana lang agnow ku salamat.",
  "Ya wowers haha",
  "Hiii",
  "Iniwi, Goood luck and ulways wish U the best!",
  "si isay man kitun diri ma-fafall itun na smile malaka heavenly, bana man sana hulog ng langit na Angel, Angel na Chubby to be precise :)",
  "Ya WOW haha?...pirmi naman sana baga.....",
  "Thank you?...Thank you.",
  "photo bomber si Voight 🤣",
  "Isi ko na lang baba ka chance ko sobra pero.....I'll take my chances. Amen",
  "Insert CRINGEY message...loading...Ende me rew, leng criiinge me nenemen...🤣",
  "Kurdapyaaaaa!",
  "mala anghel na smile + heavenly tone na tawa pero kin seryoso talagang naka tiger look, yikes takot isus isus (grrrr)...pero cute pa rin :)",
  "nagkagusto naman ako sa ibang babayi pero e-uutot ko lang su feelings and then vaaanish arog lang kadto, pero ika, feeling ko bottomless pit traphole na ulugan ko. Dipisil makabalik pataas.",
  "pakagisong, check ka cp kin agko message...uda :(",
  "nakapirang steps na? 10k? Gibohon ta yan na 20k ta gusto ko pa magwalk na kaiba ika hehe...",
  "Thank you? haha. Uyam mo Kurdapya",
  "If you're reading this, it means you scanned a little piece of my heart...curious yan? aawwhhh",
  "Out of all the peeps in the wewld, I'm really glad I met you.",
  "Kin pinag scan mo d, ibig sabihon curious ika. Ya wow.",
  "This QR code only works for one person.....YOU.",
  "hmmm....Caaaaanciiiillllll? Yep",
  "Meaningless daw a panaginip...I say Neeeinnn!",
  "I made this little QR code just for you. Sometimes, the smallest things carry the BIGGEST feelings.",
  "I don't know where this will go. But I do know that I really enjoy every moment I get to talk to you.",
  "Loading Complete...................\nFatima scanned == Felix happy :)",
  "I always remember you laughing....at Manay Shuuushaaan.",
  "Faaaaaaaaaatimaaaaaaaaaaaaa!!!",
  "Mapagal man pero NEVER GIVE UP, EBER!!!",
  "Above All, Try --Fatima",
  "Above All, Don't Try --Felix",
  "At least, nag effort. That alone means a lot.",
  "kaka-stalk mo yan Gar na in-love ka tuloy...pero seryoso, na-inlove ako dahil ku mga tawa na dawa sa luog na ako ka CR malaka rungog palanggad.",
  "Leng criiinge menn...bwahahaha!",
  "kacute mo magbayle, super --Felix>_____Leng criiinge me nenemen, ende me rew--Fatima",
  "CHUBBY SUPREMACY 🥵🔥",
  "Felix, F-E-L-I-X, Felix...B2 na sana raw kin lang hirap e-pronounce o kaya Toy nalang ulit kindi bana man ako kan bubuy, bwahahaha",
  "I'll never ask you for anything, not even a single coin. Being with you is more than enough for me. --Felix",
  "Hello po Maam good morning 👀 -12/13/25-", "uno gusto mo mabasa? haha", "A special set of random messages hidden in this QR code… meant only for YOU.", "lang takot nanaman kitun lalawgon mo, pag smile raw ta sayang ka beauty. Beauty in the best.", "share ko lang...sher ke leng kene. Sabihon mo gusto mo lang magchat...same here.",
  "Toy? Akala ko ba Love Story, yun pala Toy Story...",
  "Dawa man stress, pagal, pirot, basta BYOTEPOWL, keep smiling.",
  "Good morning Miss BYOTEPOWL Sunshine", "Travesered through heavy rain storm just for you, proven and tested pati brief basang basa bwahaha"

  
  
];

// Rare note
const _visitKey = "qrb_visits";
const _visits = parseInt(localStorage.getItem(_visitKey) || "0") + 1;
localStorage.setItem(_visitKey, _visits);
const _rareNote = "since 2026...unong year na ba? Kin nababasa mo d hanggang nguwan, Godbless you and wish you the best and LOVE YOU with all my HEART, always. --Felix/B2 <3";
const _pool = _visits >= 40 ? allNotes.concat([_rareNote]) : allNotes;
const pickedNote = _pool[Math.floor(Math.random() * _pool.length)];

const noteContainer = document.getElementById("notes-container");
const noteEl = document.createElement("p");
noteEl.className = "note-item";
noteEl.style.opacity = "1";
noteContainer.appendChild(noteEl);

let _typeTimer = null;

function revealNote() {
  clearInterval(_typeTimer);
  noteEl.innerHTML = "";
  const full = "\u201C" + pickedNote + "\u201D";
  // Split by newlines first, then words within each line
  const lines = full.split("\n");
  let wordIndex = 0;
  lines.forEach(function(line, lineIdx) {
    if (lineIdx > 0) {
      const br = document.createElement("br");
      noteEl.appendChild(br);
    }
    const words = line.split(" ");
    words.forEach(function(word) {
      const span = document.createElement("span");
      span.textContent = (wordIndex === 0 ? "" : " ") + word;
      span.style.cssText = "opacity:0; transition: opacity 0.6s ease " + (wordIndex * 0.18 + 1.8) + "s;";
      noteEl.appendChild(span);
      requestAnimationFrame(function() {
        requestAnimationFrame(function() { span.style.opacity = "1"; });
      });
      wordIndex++;
    });
  });
}

function hideNote() {
  clearInterval(_typeTimer);
  noteEl.innerHTML = "";
}

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
      // Only pause effects during flip when music isn't playing
      if (!hasPlayed) {
        document.getElementById("tsparticles").style.visibility = "hidden";
        document.getElementById("gradient-bg").style.transition = "none";
        document.getElementById("gradient-bg").style.animationPlayState = "paused";
      }
    },
    turned: function(_e, _page) {
      // Restore after flip
      document.getElementById("tsparticles").style.visibility = "visible";
      document.getElementById("gradient-bg").style.animationPlayState = "running";
      document.getElementById("gradient-bg").style.transition = "";
      const visible = isImagePageVisible();
      if (visible && !hasPlayed) {
        if (window.innerWidth >= 1024) {
          hasPlayed = true;
          musicLocked = true;
          playTrack();
          activateEffects();
          setTimeout(revealNote, 300);
        } else {
          document.getElementById("music-bar").style.display = "flex";
        }
      } else if (!visible) {
        document.getElementById("music-bar").style.display = "none";
        hideNote();
        audio.pause();
        audio.currentTime = 0;
        musicLocked = false;
        hideNowPlaying();
        deactivateEffects();
      }
    }
  }
});
