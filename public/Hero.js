
  // Sparkles animation
  document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('sparklesCanvas');
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles = [];
    let animationFrameId;
    let mousePosition = { x: 0, y: 0 };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * (1.4 - 0.6) + 0.6;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        // Mouse interaction
        const dx = mousePosition.x - this.x;
        const dy = mousePosition.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * 1;
          this.y -= Math.sin(angle) * 1;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      mousePosition = { x: e.clientX, y: e.clientY };
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });

    // Floating papers
    const floatingPapersContainer = document.getElementById('floatingPapers');
    if (floatingPapersContainer) {
      for (let i = 0; i < 6; i++) {
        const paper = document.createElement('div');
        paper.className = 'absolute w-16 h-20 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center transform hover:scale-110 transition-transform';
        
        // Add file icon
        const icon = document.createElement('i');
        icon.className = 'fa-regular fa-file-lines text-purple-400/50 text-2xl';
        paper.appendChild(icon);
        
        // Set random initial position
        paper.style.left = `${Math.random() * 100}%`;
        paper.style.top = `${Math.random() * 100}%`;
        
        // Add floating animation with random duration
        paper.style.animation = `float ${8 + Math.random() * 4}s ease-in-out infinite`;
        paper.style.animationDelay = `${Math.random() * 5}s`;
        
        floatingPapersContainer.appendChild(paper);
        
        // Add random rotation animation
        setInterval(() => {
          paper.style.transform = `rotate(${Math.random() * 360}deg)`;
          paper.style.left = `${Math.random() * 100}%`;
          paper.style.top = `${Math.random() * 100}%`;
          paper.style.transition = 'all 20s linear';
        }, 20000);
      }
    }
  });
