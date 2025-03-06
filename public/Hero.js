function initStarfield() {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;

    const stars = [];
    const starCount = Math.floor((width * height) / 500); // Reducimos la densidad de estrellas

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function createStars() {
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width - width / 2,
          y: Math.random() * height - height / 2,
          z: Math.random() * width,
          size: Math.random() * 0.5 + 0.1, // Mantenemos el tamaño pequeño
        });
      }
    }

    function animate() {
      ctx.fillStyle = "rgb(10, 10, 25)"; // Eliminamos la transparencia
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.z -= 0.9; // Velocidad constante para todas las estrellas

        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }

        const k = 128.0 / star.z;
        const px = star.x * k + width / 2;
        const py = star.y * k + height / 2;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = Math.min(star.size, 1.5); // Limitamos el tamaño máximo
          const brightness = (1 - star.z / width);
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
      resizeCanvas();
      stars.length = 0;
      createStars();
    });

    resizeCanvas();
    createStars();
    animate();
  }

  // Ejecutar la inicialización cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', initStarfield);