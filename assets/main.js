// Tema, troca de imagem de fundo e atualização de ícones
(function() {
  const toggle = document.getElementById('theme-toggle');
  const mobileToggle = document.getElementById('mobile-theme-toggle');
  const html = document.documentElement;
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');
  const iconSunMobile = document.getElementById('icon-sun-mobile');
  const iconMoonMobile = document.getElementById('icon-moon-mobile');
  const body = document.body;

  function setBackgroundByTheme() {
    if (html.classList.contains('dark')) {
      body.style.backgroundImage = "url('assets/img/fundo.png')";
      body.style.backgroundSize = 'cover';
      body.style.backgroundAttachment = 'fixed';
      body.style.backgroundPosition = 'center';
    } else {
      body.style.backgroundImage = "url('assets/img/fundo_claro.png')";
      body.style.backgroundSize = 'cover';
      body.style.backgroundAttachment = 'fixed';
      body.style.backgroundPosition = 'center';
    }
  }

  function updateIcons() {
    if (html.classList.contains('dark')) {
      iconSun && iconSun.classList.add('hidden');
      iconMoon && iconMoon.classList.remove('hidden');
      iconSunMobile && iconSunMobile.classList.add('hidden');
      iconMoonMobile && iconMoonMobile.classList.remove('hidden');
    } else {
      iconSun && iconSun.classList.remove('hidden');
      iconMoon && iconMoon.classList.add('hidden');
      iconSunMobile && iconSunMobile.classList.remove('hidden');
      iconMoonMobile && iconMoonMobile.classList.add('hidden');
    }
  }

  function setThemeFromStorage() {
    if (localStorage.getItem('theme') === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    setBackgroundByTheme();
    updateIcons();
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
      setBackgroundByTheme();
      updateIcons();
    });
  }
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
      setBackgroundByTheme();
      updateIcons();
    });
  }
  setThemeFromStorage();

  // Atualiza imagem de fundo se usuário mudar o tema pelo sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setThemeFromStorage);
})();

// Scroll progress bar
(function() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
})();

// Efeito de transição nas seções
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeIn', 'opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-8');
      } else {
        entry.target.classList.remove('animate-fadeIn', 'opacity-100', 'translate-y-0');
        entry.target.classList.add('opacity-0', 'translate-y-8');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('main > section').forEach(section => {
    section.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-8');
    observer.observe(section);
  });
})();

// Efeito de partículas animadas
const canvas = document.getElementById('particles-bg');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  const colors = ['#10b981', '#06b6d4', '#fbbf24', '#fff'];
  const numParticles = window.innerWidth > 768 ? 60 : 30;
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.getElementById('topo').offsetHeight;
  }
  function randomBetween(a, b) { return a + Math.random() * (b - a); }
  function createParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: randomBetween(0, canvas.width),
        y: randomBetween(0, canvas.height),
        r: randomBetween(1.5, 3.5),
        color: colors[Math.floor(Math.random() * colors.length)],
        dx: randomBetween(-0.5, 0.5),
        dy: randomBetween(-0.5, 0.5),
        alpha: randomBetween(0.5, 1)
      });
    }
  }
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }
  }
  function updateParticles() {
    for (let p of particles) {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    }
  }
  function animateParticles() {
    drawParticles();
    updateParticles();
    requestAnimationFrame(animateParticles);
  }
  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });
  setTimeout(() => {
    resizeCanvas();
    createParticles();
    animateParticles();
  }, 100);
}

// Efeito de digitação
const typedText = document.getElementById('typed-text');
if (typedText) {
  const messages = [
    'Desenvolvedor Full Stack & UI Designer',
    'Apaixonado por tecnologia e design',
    'Criando experiências digitais incríveis!'
  ];
  let msgIdx = 0, charIdx = 0, isDeleting = false;
  function typeEffect() {
    const current = messages[msgIdx];
    if (!isDeleting) {
      typedText.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1200);
        return;
      }
    } else {
      typedText.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        msgIdx = (msgIdx + 1) % messages.length;
      }
    }
    setTimeout(typeEffect, isDeleting ? 40 : 80);
  }
  typeEffect();
}
