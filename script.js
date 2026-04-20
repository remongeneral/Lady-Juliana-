const envelope = document.getElementById("envelope");
const seal = document.getElementById("seal");
const title = document.getElementById("mainTitle");
const music = document.getElementById("bgMusic");

seal.addEventListener("click", () => {
seal.classList.add("open");

envelope.classList.toggle("open");

title.classList.add("hide");
music.play();

createHeartBurst(e.clientX, e.clientY);
createSparkles(e.clientX, e.clientY);

const isOpen = envelope.classList.contains("open");

if (isOpen) {
title.style.opacity = "0";
seal.style.opacity = "0";
seal.style.pointerEvents = "none";
} else {
title.style.opacity = "1";
seal.style.opacity = "1";
seal.style.pointerEvents = "auto";
}

});


const figures = document.querySelectorAll(".decor");

figures.forEach(fig => {

fig.addEventListener("click", (e) => {

fig.classList.add("pop");

createHeartBurst(e.clientX, e.clientY);
createSparkles(e.clientX, e.clientY);

setTimeout(()=>{
fig.classList.remove("pop");
},500);
});

});

figures.forEach(fig => {

let isDragging = false;

fig.addEventListener("mousedown", () => {
isDragging = true;
fig.style.cursor = "grabbing";
});

document.addEventListener("mouseup", () => {
isDragging = false;
fig.style.cursor = "grab";
});

let last = 0;

document.addEventListener("mousemove", (e) => {
const now = Date.now();

if (now - last > 20) { // controls density
createTrailSparkle(e.clientX, e.clientY);
last = now;
}
});

if(isDragging){
fig.style.left = e.clientX + "px";
fig.style.top = e.clientY + "px";
}

});


function createHeartBurst(x, y) {
const heart = document.createElement("div");

const hearts = ["❤️","💖","💗","💘","💝"];
heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];

heart.classList.add("heart-burst");

heart.style.left = x + "px";
heart.style.top = y + "px";

document.body.appendChild(heart);

setTimeout(() => {
heart.remove();
}, 1000);
}


function createFirework(x, y) {
const colors = ["#ff4d6d", "#76b0e5", "#ffd166", "#903de4", "#f30530", "#992a60"];

const particleCount = Math.floor(Math.random() * 15) + 20;

for (let i = 0; i < particleCount; i++) {
const particle = document.createElement("div");
particle.classList.add("firework");

const angle = Math.random() * Math.PI * 2;
const distance = Math.random() * 140 + 40;

const size = Math.random() * 4 + 2;
const color = colors[Math.floor(Math.random() * colors.length)];

particle.style.left = x + "px";
particle.style.top = y + "px";
particle.style.width = size + "px";
particle.style.height = size + "px";
particle.style.background = color;

particle.style.setProperty("--x", Math.cos(angle) * distance + "px");
particle.style.setProperty("--y", Math.sin(angle) * distance + "px");

document.body.appendChild(particle);

setTimeout(() => particle.remove(), 1200);
}
}


function randomFirework() {
const x = Math.random() * window.innerWidth;
const y = Math.random() * (window.innerHeight * 0.6); // upper sky only

createFirework(x, y);
}

// start ambient fireworks loop
setInterval(() => {
if (Math.random() > 0.4) { 
fireworkBurst();
}
}, Math.random() * 3000 + 2000);

function fireworkBurst() {
const count = Math.floor(Math.random() * 2) + 1; 
// ONLY 1–2 fireworks per burst (reduced)

for (let i = 0; i < count; i++) {
setTimeout(() => {
const x = Math.random() * window.innerWidth;
const y = Math.random() * (window.innerHeight * 0.6);
createFirework(x, y);
}, i * 250);
}
}

// calmer timing (key fix)
function startFireworks() {
setInterval(() => {
if (Math.random() > 0.4) {
fireworkBurst();
}
}, Math.random() * 3000 + 2000);
}

startFireworks();


function createSparkles(x, y) {
for (let i = 0; i < 6; i++) {
const s = document.createElement("div");
s.className = "sparkle";

s.style.left = (x + Math.random() * 40 - 20) + "px";
s.style.top = (y + Math.random() * 40 - 20) + "px";

document.body.appendChild(s);

setTimeout(() => s.remove(), 800);
}
}

function createTrailSparkle(x, y) {
const s = document.createElement("div");
s.className = "trail-sparkle";

s.style.left = x + "px";
s.style.top = y + "px";

document.body.appendChild(s);

setTimeout(() => s.remove(), 700);
}

let activeElement = null;
let offsetX = 0;
let offsetY = 0;

document.querySelectorAll(".decor").forEach(el => {

// make sure it can be moved visually without breaking layout
el.style.position = "absolute";

el.addEventListener("mousedown", (e) => {
activeElement = el;

offsetX = e.clientX - el.getBoundingClientRect().left;
offsetY = e.clientY - el.getBoundingClientRect().top;

el.style.zIndex = 9999;
el.style.cursor = "grabbing";
});

});

document.addEventListener("mousemove", (e) => {
if (!activeElement) return;

activeElement.style.left = (e.clientX - offsetX) + "px";
activeElement.style.top = (e.clientY - offsetY) + "px";
});

document.addEventListener("mouseup", () => {
if (activeElement) {
activeElement.style.cursor = "grab";
activeElement.style.zIndex = 1;
}
activeElement = null;
});


function createStars(){
const starsContainer = document.querySelector(".stars");

for(let i = 0; i < 120; i++){

const star = document.createElement("div");

star.style.position = "absolute";

star.style.width = Math.random() * 3 + "px";
star.style.height = star.style.width;

star.style.background = "white";
star.style.borderRadius = "50%";

star.style.top = Math.random() * 100 + "vh";
star.style.left = Math.random() * 100 + "vw";

star.style.opacity = Math.random();

star.style.animation = `twinkle ${2 + Math.random() * 3}s infinite alternate`;

starsContainer.appendChild(star);
}

}

createStars();