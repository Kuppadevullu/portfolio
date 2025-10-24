document.getElementById("year").textContent = new Date().getFullYear();

// Particle effect
const canvas = document.getElementById("bgParticles");
const ctx = canvas.getContext("2d");
let w = (canvas.width = innerWidth);
let h = (canvas.height = innerHeight);
const particles = Array.from({ length: 100 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 2,
  dx: Math.random() * 0.6 - 0.3,
  dy: Math.random() * 0.6 - 0.3,
  hue: Math.random() * 360,
}));

function drawParticles() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach((p) => {
    p.x += p.dx; p.y += p.dy;
    if (p.x < 0 || p.x > w) p.dx *= -1;
    if (p.y < 0 || p.y > h) p.dy *= -1;
    ctx.beginPath();
    ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, 0.8)`;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

window.addEventListener("resize", () => {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
});

// Contact form
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("🚀 Message Sent Successfully! (Demo Mode)");
  e.target.reset();
});
