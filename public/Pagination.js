document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('blog-carousel');
  const carouselContainer = document.getElementById('carousel-container');
  const dots = document.querySelectorAll('.carousel-dot');
  const items = document.querySelectorAll('.carousel-item');
  
  if (!carousel || !carouselContainer || !dots.length || !items.length) return;
  
  let currentIndex = 0;
  let isScrolling = false;
  let scrollTimeout;
  
  // Función para actualizar los puntos indicadores
  const updateDots = (index) => {
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active', 'w-4', 'bg-blue-500');
        dot.classList.remove('w-1.5', 'bg-gray-400');
      } else {
        dot.classList.remove('active', 'w-4', 'bg-blue-500');
        dot.classList.add('w-1.5', 'bg-gray-400');
      }
    });
  };
  
  // Función para desplazarse a un elemento específico
  const scrollToItem = (index) => {
    if (index >= 0 && index < items.length) {
      const item = items[index];
      const containerWidth = carouselContainer.offsetWidth;
      const itemLeft = item.offsetLeft;
      const itemWidth = item.offsetWidth;
      
      // Centrar el elemento en el contenedor
      const scrollPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2);
      
      carouselContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      
      currentIndex = index;
      updateDots(currentIndex);
    }
  };
  
  // Detectar el elemento visible en el carrusel
  const detectVisibleItem = () => {
    const containerRect = carouselContainer.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    let closestItem = null;
    let closestDistance = Infinity;
    
    items.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const distance = Math.abs(containerCenter - itemCenter);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestItem = index;
      }
    });
    
    if (closestItem !== null && closestItem !== currentIndex) {
      currentIndex = closestItem;
      updateDots(currentIndex);
    }
  };
  
  // Evento de clic en los puntos
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      scrollToItem(index);
    });
  });
  
  // Evento de desplazamiento del carrusel
  carouselContainer.addEventListener('scroll', () => {
    if (!isScrolling) {
      isScrolling = true;
    }
    
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
      detectVisibleItem();
    }, 150);
  });
  
  // Detectar cuando el usuario interactúa con el carrusel
  let hasInteracted = false;
  
  carouselContainer.addEventListener('touchstart', () => {
    hasInteracted = true;
  });
  
  // Repetir la animación cada 15 segundos si el usuario no ha interactuado
  carousel.addEventListener('animationend', () => {
    if (!hasInteracted) {
      setTimeout(() => {
        carousel.style.animation = 'none';
        setTimeout(() => {
          carousel.style.animation = 'slideHint 4s ease-in-out';
        }, 100);
      }, 15000);
    }
  });
  
  // Mostrar el indicador de deslizamiento solo si hay scroll horizontal disponible
  const checkOverflow = () => {
    if (carousel.scrollWidth > carouselContainer.clientWidth) {
      document.querySelector('.flex.items-center.bg-blue-600\\/80').style.display = 'flex';
    } else {
      document.querySelector('.flex.items-center.bg-blue-600\\/80').style.display = 'none';
    }
  };
  
  // Verificar al cargar y al cambiar el tamaño de la ventana
  checkOverflow();
  window.addEventListener('resize', checkOverflow);
  
  // Inicializar
  updateDots(0);
});