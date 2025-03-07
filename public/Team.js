 // Script para manejar la expansión de las biografías
 document.addEventListener('DOMContentLoaded', () => {
    const bioToggles = document.querySelectorAll('.bio-toggle');
    
    bioToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const index = toggle.getAttribute('data-index');
        const bioContainer = document.querySelector(`.bio-container[data-index="${index}"]`);
        const bioText = bioContainer.querySelector('.bio-text');
        const toggleText = toggle.querySelector('.toggle-text');
        const toggleIcon = toggle.querySelector('.toggle-icon');
        
        if (bioText.classList.contains('line-clamp-2')) {
          // Expandir
          bioText.classList.remove('line-clamp-2');
          toggleText.textContent = 'Menos';
          toggleIcon.style.transform = 'rotate(180deg)';
        } else {
          // Colapsar
          bioText.classList.add('line-clamp-2');
          toggleText.textContent = 'Más';
          toggleIcon.style.transform = 'rotate(0deg)';
        }
      });
    });
    
    // Añadir una animación sutil para indicar deslizamiento después de cargar
    setTimeout(() => {
      const carousel = document.querySelector('.flex.space-x-4');
      if (carousel) {
        carousel.style.animation = 'slideHint 4s ease-in-out';
        carousel.addEventListener('animationend', () => {
          // Repetir la animación cada 10 segundos si el usuario no ha interactuado
          let hasInteracted = false;
          
          carousel.addEventListener('touchstart', () => {
            hasInteracted = true;
          });
          
          if (!hasInteracted) {
            setTimeout(() => {
              carousel.style.animation = 'none';
              setTimeout(() => {
                carousel.style.animation = 'slideHint 4s ease-in-out';
              }, 100);
            }, 10000);
          }
        });
      }
    }, 2000);
  });