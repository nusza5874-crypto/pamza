const pages = [
  ...document.querySelectorAll(".page")
];


/* =====================================
   เปลี่ยนหน้า
===================================== */

function showPage(id) {

  pages.forEach(page => {

    page.classList.toggle(
      "active",
      page.id === id
    );

  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (id !== "yes") {
    clearBigHearts();
  }
}


/* =====================================
   ปุ่มไปหน้าต่าง ๆ
===================================== */

document
  .querySelectorAll("[data-next]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        showPage(
          button.dataset.next
        );

      }
    );

  });


/* =====================================
   เหตุผลที่ชอบแป๋ม
===================================== */

const reasons = [

  "พี่บ่นอยากได้ครีมกันแดดก็เอามาให้",

  "พยาบาลส่วนตัวพี่ปวดหลังแนะนำยากิน ยาพ่นจนหายดี",

  "เป็นคนนำเที่ยวที่ใหม่ที่พี่ไม่เคยไป",

  "ให้กระเป๋าเป็นของขวัญวันเกิดน่ารักมากกก"

];


let reasonIndex = 0;


const reasonText =
  document.getElementById(
    "reasonText"
  );


const reasonNumber =
  document.getElementById(
    "reasonNumber"
  );


const dots =
  document.getElementById(
    "dots"
  );


/* สร้างจุดด้านล่าง */

reasons.forEach(
  (_, index) => {

    const dot =
      document.createElement("span");

    dot.className =
      "dot" +
      (index === 0
        ? " on"
        : "");

    dots.appendChild(dot);

  }
);


/* ปุ่มเหตุผลต่อไป */

document
  .getElementById("nextReason")
  .addEventListener(
    "click",
    () => {

      reasonIndex =
        (reasonIndex + 1)
        % reasons.length;


      reasonText.style.opacity = 0;

      reasonText.style.transform =
        "translateY(8px)";


      setTimeout(
        () => {

          reasonText.textContent =
            reasons[reasonIndex];


          reasonNumber.textContent =
            String(
              reasonIndex + 1
            ).padStart(2, "0");


          [
            ...dots.children
          ].forEach(
            (dot, index) => {

              dot.classList.toggle(
                "on",
                index === reasonIndex
              );

            }
          );


          reasonText.style.opacity = 1;

          reasonText.style.transform =
            "none";

        },
        220
      );

    }
  );


reasonText.style.transition =
  "0.25s";


/* =====================================
   MUSIC
===================================== */

const audio =
  document.getElementById(
    "audio"
  );


const playBtn =
  document.getElementById(
    "playBtn"
  );


const visualizer =
  document.getElementById(
    "visualizer"
  );


const vinyl =
  document.querySelector(
    ".vinyl"
  );


function setPlaying(on) {

  playBtn.textContent =
    on ? "❚❚" : "▶";


  visualizer.classList.toggle(
    "playing",
    on
  );


  vinyl.classList.toggle(
    "playing",
    on
  );
}


playBtn.addEventListener(
  "click",
  async () => {

    try {

      if (audio.paused) {

        await audio.play();

        setPlaying(true);

      } else {

        audio.pause();

        setPlaying(false);

      }

    } catch (error) {

      alert(
        "ยังไม่มีไฟล์ halleys-comet.mp3 ในโฟลเดอร์เว็บครับ\n\n" +
        "ให้นำไฟล์เพลงที่คุณมีสิทธิ์ใช้งานมาใส่ไว้ในโฟลเดอร์เดียวกับ index.html"
      );

    }

  }
);


audio.addEventListener(
  "ended",
  () => {

    setPlaying(false);

  }
);


/* =====================================
   ENVELOPE / LETTER
===================================== */

const envelope =
  document.getElementById(
    "envelope"
  );


/*
  เปิดซองเมื่อคลิกบริเวณซอง

  สำคัญ:
  ถ้าคลิกอ่านข้อความ
  จะไม่ทำให้ซองปิด
*/

envelope.addEventListener(
  "click",
  (event) => {

    /*
      ถ้าคลิกด้านในกระดาษ
      ไม่ต้องทำอะไร
    */

    if (
      event.target.closest(
        ".letter-paper"
      )
    ) {

      return;

    }


    envelope.classList.toggle(
      "open"
    );

  }
);


/* =====================================
   ปุ่มหลังเปิดจดหมาย
===================================== */

const letterNext =
  document.getElementById(
    "letterNext"
  );


letterNext.addEventListener(
  "click",
  () => {

    /*
      หยุดเพลงก่อน
      ถ้ากำลังเล่นอยู่
    */

    if (!audio.paused) {

      audio.pause();

      setPlaying(false);

    }


    showPage(
      "proposal"
    );

  }
);


/* =====================================
   คำตอบ "ตกลง"
===================================== */

document
  .getElementById("yesBtn")
  .addEventListener(
    "click",
    () => {

      showPage("yes");

      launchHearts(true);

    }
  );


/* =====================================
   คำตอบ "ขอคิดดูก่อน"
===================================== */

document
  .getElementById("thinkBtn")
  .addEventListener(
    "click",
    () => {

      showPage("think");

    }
  );


/* =====================================
   กลับไปหน้าคำถาม
===================================== */

document
  .getElementById("backProposal")
  .addEventListener(
    "click",
    () => {

      showPage(
        "proposal"
      );

    }
  );


/* =====================================
   เล่นใหม่ตั้งแต่ต้น
===================================== */

document
  .getElementById("replay")
  .addEventListener(
    "click",
    () => {

      showPage(
        "welcome"
      );

    }
  );

// วาง URL ที่ได้จากการ Deploy Web App ของ Google Apps Script ตรงนี้
const SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxjOWp5tI8hAoIlUCc2rAe2SznU6kGSsSLrpo2kmhf3BzHL9yGcSHbbYP3sEQUY8-TH/exec";
 
function logAcceptTime(){
  try{
    const now = new Date();
    const payload = {
      isoTime: now.toISOString(),
      thaiTime: now.toLocaleString("th-TH", {
        timeZone: "Asia/Bangkok",
        dateStyle: "long",
        timeStyle: "medium"
      })
    };
    // ใช้ mode:"no-cors" เพราะ Apps Script Web App ไม่ส่ง CORS header กลับมา
    // (เรายิงแบบ fire-and-forget ไม่ต้องรออ่านผลลัพธ์)
    fetch(SHEET_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload)
    }).catch(()=>{ /* เงียบไว้ ไม่ให้กระทบหน้าเว็บถ้าเน็ตมีปัญหา */ });
  }catch(err){
    console.warn("บันทึกเวลาไป Google Sheet ไม่สำเร็จ:", err);
  }
}
 
document.getElementById("yesBtn").addEventListener("click",()=>{
  logAcceptTime();
  showPage("yes");
  launchHearts(true);
});
document.getElementById("thinkBtn").addEventListener("click",()=>showPage("think"));
document.getElementById("backProposal").addEventListener("click",()=>showPage("proposal"));
document.getElementById("replay").addEventListener("click",()=>showPage("welcome"));
 
/* =====================================
   HEART EFFECT
===================================== */

function clearBigHearts() {

  document
    .querySelectorAll(
      ".float-heart"
    )
    .forEach(
      element => element.remove()
    );

}


function launchHearts(
  big = false
) {

  const count =
    big ? 75 : 10;


  for (
    let i = 0;
    i < count;
    i++
  ) {

    const heart =
      document.createElement(
        "span"
      );


    heart.className =
      "float-heart";


    heart.textContent =
      Math.random() > 0.25
        ? "♥"
        : "♡";


    heart.style.left =
      (
        Math.random() * 100
      ) + "vw";


    heart.style.fontSize =
      (
        12 +
        Math.random() * 28
      ) + "px";


    heart.style.animationDuration =
      (
        3 +
        Math.random() * 5
      ) + "s";


    heart.style.animationDelay =
      (
        Math.random() * 2
      ) + "s";


    document
      .getElementById("hearts")
      .appendChild(
        heart
      );


    setTimeout(
      () => heart.remove(),
      9000
    );

  }

}


/* =====================================
   หัวใจลอยเบา ๆ
===================================== */

setInterval(
  () => {

    launchHearts(false);

  },
  2200
);
