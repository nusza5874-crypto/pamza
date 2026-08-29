const pages = [...document.querySelectorAll(".page")];

function showPage(id){
  pages.forEach(p => p.classList.toggle("active", p.id === id));
  window.scrollTo({top:0, behavior:"smooth"});
  if(id !== "yes") clearBigHearts();
}

document.querySelectorAll("[data-next]").forEach(btn=>{
  btn.addEventListener("click",()=>showPage(btn.dataset.next));
});

const reasons = [
  "หนูทำให้พี่มีความสุขในทุกๆวัน",
  "เป็นพยาบาลส่วนตัวคอยดูแลให้คำแนะนำเวลาไม่สบาย",
  "เป็นไกด์นำเที่ยวที่ใหม่ที่พี่ไม่เคยไป"
];
let reasonIndex = 0;
const reasonText = document.getElementById("reasonText");
const reasonNumber = document.getElementById("reasonNumber");
const dots = document.getElementById("dots");

reasons.forEach((_,i)=>{
  const d=document.createElement("span");
  d.className="dot"+(i===0?" on":"");
  dots.appendChild(d);
});

document.getElementById("nextReason").addEventListener("click",()=>{
  reasonIndex=(reasonIndex+1)%reasons.length;
  reasonText.style.opacity=0;
  reasonText.style.transform="translateY(8px)";
  setTimeout(()=>{
    reasonText.textContent=reasons[reasonIndex];
    reasonNumber.textContent=String(reasonIndex+1).padStart(2,"0");
    [...dots.children].forEach((d,i)=>d.classList.toggle("on",i===reasonIndex));
    reasonText.style.opacity=1;
    reasonText.style.transform="none";
  },220);
});
reasonText.style.transition=".25s";

const audio=document.getElementById("audio");
const playBtn=document.getElementById("playBtn");
const visualizer=document.getElementById("visualizer");
const vinyl=document.querySelector(".vinyl");

function setPlaying(on){
  playBtn.textContent=on?"❚❚":"▶";
  visualizer.classList.toggle("playing",on);
  vinyl.classList.toggle("playing",on);
}
playBtn.addEventListener("click",async()=>{
  try{
    if(audio.paused){ await audio.play(); setPlaying(true); }
    else { audio.pause(); setPlaying(false); }
  }catch(e){
    alert("ยังไม่มีไฟล์ halleys-comet.mp3 ในโฟลเดอร์เว็บครับ\nใส่ไฟล์เพลงที่คุณมีสิทธิ์ใช้งาน แล้วกด Play อีกครั้ง");
  }
});
audio.addEventListener("ended",()=>setPlaying(false));

const envelope=document.getElementById("envelope");
envelope.addEventListener("click",()=>envelope.classList.toggle("open"));
document.getElementById("letterNext").addEventListener("click",()=>showPage("proposal"));

document.getElementById("yesBtn").addEventListener("click",()=>{
  showPage("yes");
  launchHearts(true);
});
document.getElementById("thinkBtn").addEventListener("click",()=>showPage("think"));
document.getElementById("backProposal").addEventListener("click",()=>showPage("proposal"));
document.getElementById("replay").addEventListener("click",()=>showPage("welcome"));

function clearBigHearts(){
  document.querySelectorAll(".float-heart").forEach(x=>x.remove());
}
function launchHearts(big=false){
  const count=big?75:10;
  for(let i=0;i<count;i++){
    const h=document.createElement("span");
    h.className="float-heart";
    h.textContent=Math.random()>.25?"♥":"♡";
    h.style.left=(Math.random()*100)+"vw";
    h.style.fontSize=(12+Math.random()*28)+"px";
    h.style.animationDuration=(3+Math.random()*5)+"s";
    h.style.animationDelay=(Math.random()*2)+"s";
    document.getElementById("hearts").appendChild(h);
    setTimeout(()=>h.remove(),9000);
  }
}
setInterval(()=>launchHearts(false),2200);
