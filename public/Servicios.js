document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('[data-tab]');
    const tabContents = document.querySelectorAll('[data-content]');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Actualizar botones
        tabButtons.forEach(btn => {
          if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('bg-blue-600', 'text-white');
            btn.classList.remove('text-gray-300', 'hover:text-white', 'hover:bg-gray-700/50');
          } else {
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('text-gray-300', 'hover:text-white', 'hover:bg-gray-700/50');
          }
        });
        
        // Actualizar contenido
        tabContents.forEach(content => {
          if (content.getAttribute('data-content') === tabId) {
            content.classList.remove('hidden');
            // Añadir animación de entrada
            content.classList.add('block');
            content.style.opacity = '0';
            setTimeout(() => {
              content.style.opacity = '1';
            }, 50);
          } else {
            content.classList.add('hidden');
            content.classList.remove('block');
          }
        });
      });
    });
  });