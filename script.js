/* ============================================================
   💌 Love Website — script.js  (FIXED : เพลงเล่นวนต่อเนื่อง)
   ============================================================ */

/* ------------------------------------------------------------
   1) ELEMENTS
   ------------------------------------------------------------ */
const pages         = document.querySelectorAll(".page");

const audio         = document.getElementById("audio");
const playBtn       = document.getElementById("playBtn");
const visualizer    = document.getElementById("visualizer");
const vinyl         = document.querySelector(".vinyl");

const nextReason    = document.getElementById("nextReason");
const letterNext    = document.getElementById("letterNext");
const yesBtn        = document.getElementById("yesBtn");
const thinkBtn      = document.getElementById("thinkBtn");
const replay        = document.getElementById("replay");
const backProposal  = document.getElementById("backProposal");


/* ------------------------------------------------------------
   2) AUDIO CONFIG  ⭐ แก้จุดที่ 2+3 : บังคับเล่นวน
   ------------------------------------------------------------ */
audio.loop   = true;    // ให้เบราว์เซอร์วนซ้ำเอง
audio.volume = 0.6;     // ปรับระดับเสียงตามชอบ (0.0 – 1.0)

let userWantsMusic = false;   // ผู้ใช้ "อยากฟัง" อยู่หรือไม่


/* ------------------------------------------------------------
   3) PAGE NAVIGATION
   ------------------------------------------------------------ */
function showPage(id) {
  pages.forEach(page => {
    page.classList.toggle("active", page.id === id);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (id !== "yes") {
    clearBigHearts();
  }
  /* ⛔ ห้ามใส่ audio.pause() / audio.load() / audio.src = ... ในนี้เด็ดขาด */
}

/* ปุ่มทุกตัวที่มี data-next="xxx" → ไปหน้านั้นอัตโนมัติ */
document.querySelectorAll("[data-next]").forEach(btn => {
  btn.addEventListener("click", () => showPage(btn.dataset.next));
});


/* ------------------------------------------------------------
   4) MUSIC PLAYER
   ------------------------------------------------------------ */
function setPlaying(on) {
  playBtn.textContent = on ? "❚❚" : "▶";
  playBtn.setAttribute("aria-label", on ? "หยุดเพลง" : "เล่นเพลง");
  visualizer.classList.toggle("playing", on);
  vinyl.classList.toggle("playing", on);
}

/* ---- ปุ่มเล่น / หยุด ---- */
playBtn.addEventListener("click", async () => {
  try {
    if (audio.paused) {
      userWantsMusic = true;        // ⭐ เปิด auto-resume
      await audio.play();
      setPlaying(true);
    } else {
      userWantsMusic = false;       // ⭐ ผู้ใช้กดหยุดเอง → ไม่ต้องเล่นต่อ
      audio.pause();
      setPlaying(false);
    }
  } catch (error) {
    alert(
      "ยังไม่มีไฟล์ halleys-comet.mp3 ในโฟลเดอร์เว็บครับ\n\n" +
      "ให้นำไฟล์เพลงที่คุณมีสิทธิ์ใช้งานมาใส่ไว้ในโฟลเดอร์เดียวกับ index.html"
    );
  }
});

/* ---- ⭐ แก้จุดที่ 3 : เพลงจบ → วนกลับไปเริ่มใหม่ (fallback) ---- */
audio.addEventListener("ended", () => {
  audio.currentTime = 0;
  audio.play()
       .then(() => setPlaying(true))
       .catch(() => setPlaying(false));
});

/* ---- ⭐ กันโค้ดส่วนอื่นแอบสั่ง pause → ดึงกลับมาเล่นต่อ ---- */
audio.addEventListener("pause", () => {
  if (userWantsMusic && !audio.ended) {
    setTimeout(() => {
      audio.play().catch(() => {});
    }, 80);
  } else {
    setPlaying(false);
  }
});

audio.addEventListener("play", () => setPlaying(true));

/* ---- สลับแท็บแล้วกลับมา → เล่นต่อ ---- */
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && userWantsMusic && audio.paused) {
    audio.play().then(() => setPlaying(true)).catch(() => {});
  }
});


/* ------------------------------------------------------------
   5) BUTTON HANDLERS
   ------------------------------------------------------------ */

/* หน้า reasons → music */
if (nextReason) {
  nextReason.addEventListener("click", () => showPage("music"));
}

/* ⭐⭐ แก้จุดที่ 1 (ตัวการหลัก) : ลบ audio.pause() ออกแล้ว ⭐⭐ */
letterNext.addEventListener("click", () => {
  showPage("proposal");          // เพลงเล่นต่อ ไม่ถูกหยุดอีกต่อไป
});

/* ตอบตกลง */
if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    showPage("yes");
    launchHearts(true);
  });
}

/* ขอคิดดูก่อน */
if (thinkBtn) {
  thinkBtn.addEventListener("click", () => showPage("think"));
}

/* เล่นใหม่ตั้งแต่ต้น */
if (replay) {
  replay.addEventListener("click", () => showPage("welcome"));
}

/* ย้อนกลับไปหน้าคำถาม */
if (backProposal) {
  backProposal.addEventListener("click", () => showPage("proposal"));
}


/* ------------------------------------------------------------
   6) HEARTS EFFECT
   ------------------------------------------------------------ */
function clearBigHearts() {
  document.querySelectorAll(".float-heart").forEach(element => element.remove());
}

function launchHearts(big = false) {
  const count = big ? 75 : 10;
  const container = document.getElementById("hearts");
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "float-heart";
    heart.textContent = Math.random() > 0.25 ? "♥" : "♡";
    heart.style.left              = (Math.random() * 100) + "vw";
    heart.style.fontSize          = (12 + Math.random() * 28) + "px";
    heart.style.animationDuration = (3 + Math.random() * 5) + "s";
    heart.style.animationDelay    = (Math.random() * 2) + "s";
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 9000);
  }
}

setInterval(() => {
  launchHearts(false);
}, 2200);

