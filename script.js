// 🌠 Fade in sections on scroll
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.1
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// 🪐 Interactive Particles Canvas
const canvas = document.createElement('canvas');
canvas.id = 'space-canvas';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let width, height;
function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// 🌌 Particle system
const particles = [];
for (let i = 0; i < 200; i++) {
  particles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'white';
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;

    // Bounce off edges
    if (p.x < 0 || p.x > width) p.dx *= -1;
    if (p.y < 0 || p.y > height) p.dy *= -1;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ☄️ Meteor shower on click
window.addEventListener('click', () => {
  for (let i = 0; i < 10; i++) {
    createMeteor();
  }
});

// 🌠 Create random meteors (falling stars)
function createMeteor() {
  const meteor = document.createElement('div');
  meteor.classList.add('meteor');
  meteor.style.left = Math.random() * width + 'px';
  meteor.style.top = Math.random() * -100 + 'px';
  document.body.appendChild(meteor);

  setTimeout(() => {
    meteor.remove();
  }, 3000);
}

// 🪐 Mouse moves = gravity pull effect
window.addEventListener('mousemove', (e) => {
  particles.forEach(p => {
    let dx = e.clientX - p.x;
    let dy = e.clientY - p.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
    let force = Math.min(100 / dist, 0.5);
    p.dx += dx * force * 0.0001;
    p.dy += dy * force * 0.0001;
  });
});
