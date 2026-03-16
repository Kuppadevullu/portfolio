/* ============================================================
   main.js  –  Cybersecurity Portfolio Interactive Logic
   ============================================================ */

/* ── Matrix Rain Canvas ─────────────────────────────────────── */
(function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  let cols, drops;
  const chars = '01アイウエオカキクケコABCDEF0123456789';

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / 20);
    drops = Array(cols).fill(1);
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.fillStyle = 'rgba(5,10,14,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00e5ff';
    ctx.font = '14px "Share Tech Mono"';
    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * 20, y * 20);
      if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }
  setInterval(draw, 60);
})();

/* ── Typewriter Effect ──────────────────────────────────────── */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  const lines = [
    'Web Application Tester',
    'VAPT Analyst',
    'Cybersecurity Graduate',
    'OWASP Top 10 Specialist',
    'Web Application Security Analyst',
  ];
  let li = 0, ci = 0, deleting = false;

  function type() {
    const current = lines[li];
    if (!deleting) {
      el.textContent = current.slice(0, ++ci);
      if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = current.slice(0, --ci);
      if (ci === 0) { deleting = false; li = (li + 1) % lines.length; }
    }
    setTimeout(type, deleting ? 60 : 90);
  }
  type();
})();

/* ── Navbar Scroll Behaviour ────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 400);
});

/* ── Hamburger Menu ─────────────────────────────────────────── */
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('nav-links').classList.remove('open'));
});

/* ── Back to Top ────────────────────────────────────────────── */
document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Intersection Observer – Animate on Scroll ──────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');

      /* Skill bars */
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });

      /* Counter animation */
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        const target = +el.dataset.target;
        let count = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          count = Math.min(count + step, target);
          el.textContent = count + (target >= 100 ? '+' : '');
          if (count >= target) clearInterval(timer);
        }, 25);
      });

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('section, .skill-card, .tool-card, .project-card, .cert-card, .timeline-card')
  .forEach(el => observer.observe(el));

/* ── Contact Form ───────────────────────────────────────────── */
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #39ff14, #00b4d8)';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.disabled = false;
    this.reset();
  }, 3000);
});

/* ── Smooth section fade-in (CSS helper) ────────────────────── */
const style = document.createElement('style');
style.textContent = `
  .skill-card,.tool-card,.project-card,.cert-card,.timeline-card {
    opacity:0; transform:translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .skill-card.in-view,.tool-card.in-view,.project-card.in-view,
  .cert-card.in-view,.timeline-card.in-view {
    opacity:1; transform:translateY(0);
  }
`;
document.head.appendChild(style);
