document.addEventListener("DOMContentLoaded", () => {
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const carouselSlide = document.querySelector(".carousel-slide");
    const carouselItems = document.querySelectorAll(".carousel-item");
    
    let currentIndex = 0;
  
    function updateCarousel() {
      const itemWidth = carouselItems[0].offsetWidth;
      carouselSlide.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
  
    nextBtn.addEventListener("click", () => {
      if (currentIndex < carouselItems.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0; // Vuelve al inicio
      }
      updateCarousel();
    });
  
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = carouselItems.length - 1; // Vuelve al final
      }
      updateCarousel();
    });
  });
  