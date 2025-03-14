import Frida from "../src/assets/Vendedores/Frida.jpeg"
import Emmanuel from "../src/assets/Vendedores/Emmanuel.jpeg"
import Hugo from "../src/assets/Vendedores/Hugo.jpeg"
import Josue from "../src/assets/Vendedores/Josue.jpeg"
import Jose from "../src/assets/Vendedores/Jose.jpeg"
    const salesData = [
        { id: 1, name: "Hugo Baena", sales: 4, target: 5, avatar: Hugo.src },
        { id: 2, name: "Frida Escobar", sales: 5, target: 5, avatar: Frida.src },
        { id: 3, name: "Emmanuel Rosales", sales: 3, target: 5, avatar: Emmanuel.src },
        { id: 4, name: "Jose Perez", sales: 2, target: 5, avatar: Jose.src },
        { id: 5, name: "Josué Salvador", sales: 1, target: 5, avatar: Josue.src },
      ];
  
      // Estado de la aplicación
      let currentWeek = "semana-actual";
  
      // Elementos del DOM
      const sellersRankingEl = document.getElementById('sellers-ranking');
      const semanaActualTab = document.getElementById('semana-actual-tab');
      const semanaAnteriorTab = document.getElementById('semana-anterior-tab');
      const totalSalesEl = document.getElementById('total-sales');
      const teamProgressBarEl = document.getElementById('team-progress-bar');
      const teamProgressTextEl = document.getElementById('team-progress-text');
      const topSellerNameEl = document.getElementById('top-seller-name');
      const topSellerSalesEl = document.getElementById('top-seller-sales');
      const topSellerAvatarEl = document.getElementById('top-seller-avatar');
      const totalSellersEl = document.getElementById('total-sellers');
  
      // Función para actualizar la UI
      function updateUI() {
        // Ordenar vendedores por número de ventas (descendente)
        const sortedSalesData = [...salesData].sort((a, b) => b.sales - a.sales);
        
        // Calcular el total de ventas del equipo
        const totalSales = salesData.reduce((sum, seller) => sum + seller.sales, 0);
        const totalTarget = salesData.reduce((sum, seller) => sum + seller.target, 0);
        const teamProgress = Math.round((totalSales / totalTarget) * 100);
        
        // Actualizar estadísticas generales
        totalSalesEl.textContent = totalSales;
        teamProgressBarEl.style.width = `${teamProgress}%`;
        teamProgressTextEl.textContent = `${teamProgress}% de la meta (${totalSales}/${totalTarget})`;
        totalSellersEl.textContent = salesData.length;
        
        // Actualizar información del líder
        if (sortedSalesData.length > 0) {
          topSellerNameEl.textContent = sortedSalesData[0].name;
          topSellerSalesEl.textContent = `${sortedSalesData[0].sales} ventas`;
          topSellerAvatarEl.src = sortedSalesData[0].avatar;
        }
        
        // Generar el ranking de vendedores
        sellersRankingEl.innerHTML = '';
        
        sortedSalesData.forEach((seller, index) => {
          const progressPercent = Math.round((seller.sales / seller.target) * 100);
          const isTopSeller = index === 0;
          
          const sellerCard = document.createElement('div');
          sellerCard.className = `overflow-hidden transition-all hover:shadow-lg rounded-lg ${
            isTopSeller ? "border-2 border-yellow-400  bg-gradient-to-r from-amber-50 to-yellow-50" : "bg-gray-800"
          }`;
          
          sellerCard.innerHTML = `
            <div class="p-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-100 to-purple-100">
                    <img
                      src="${seller.avatar}"
                      alt="${seller.name}"
                      class="h-full w-full rounded-full object-cover"
                    />
                    ${isTopSeller ? `<div class="absolute -top-3 -right-2 h-6 w-6 text-yellow-400">
                      <i class="fas fa-crown"></i>
                    </div>` : ''}
                    ${index === 1 ? `<div class="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-700">
                      2
                    </div>` : ''}
                    ${index === 2 ? `<div class="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-700">
                      3
                    </div>` : ''}
                  </div>
                  <div>
                    <div class="font-medium text-white">${seller.name}</div>
                    <div class="text-sm text-gray-200">
                      ${seller.sales} de ${seller.target} ventas
                    </div>
                  </div>
                </div>
                
                <div class="flex items-center gap-4">
                  <div class="w-48 md:w-64">
                    <div class="h-3 w-full bg-gray-900 rounded-full overflow-hidden">
                      <div class="h-full rounded-full ${
                        isTopSeller
                          ? "bg-gradient-to-r from-yellow-300 to-yellow-100"
                          : "bg-gradient-to-r from-indigo-500 to-purple-100"
                      }" style="width: ${progressPercent}%"></div>
                    </div>
                    <div class="mt-1 text-right text-xs text-gray-500">
                      ${progressPercent}%
                    </div>
                  </div>
                  
                  <div class="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                    <span class="text-lg font-bold text-indigo-50">${seller.sales}</span>
                  </div>
                  
                  ${seller.sales >= seller.target ? `<div class="h-6 w-6 text-yellow-500">
                    <i class="fas fa-trophy"></i>
                  </div>` : ''}
                </div>
              </div>
            </div>
          `;
          
          sellersRankingEl.appendChild(sellerCard);
        });
      }
  
      // Event listeners para las pestañas
      semanaActualTab.addEventListener('click', () => {
        currentWeek = "semana-actual";
        semanaActualTab.classList.add('bg-white', 'shadow-sm');
        semanaAnteriorTab.classList.remove('bg-white', 'shadow-sm');
      });
      
      semanaAnteriorTab.addEventListener('click', () => {
        currentWeek = "semana-anterior";
        semanaAnteriorTab.classList.add('bg-white', 'shadow-sm');
        semanaActualTab.classList.remove('bg-white', 'shadow-sm');
      });
  
      // Inicializar la UI
      updateUI();
  
      // Hacer que salesData sea observable para actualizar automáticamente la UI cuando cambie
      // Esta es una forma simple de observar cambios en el array
      const originalPush = Array.prototype.push;
      Array.prototype.push = function() {
        originalPush.apply(this, arguments);
        if (this === salesData) {
          updateUI();
        }
        return this.length;
      };
  
      // Observar cambios en las propiedades de los objetos dentro del array
      salesData.forEach(seller => {
        Object.defineProperty(seller, 'sales', {
          get: function() {
            return this._sales;
          },
          set: function(value) {
            this._sales = value;
            updateUI();
          }
        });
        seller._sales = seller.sales;
      });
  
      // Exponer salesData globalmente para poder modificarlo desde la consola
      window.salesData = salesData;
  
      // Instrucciones para el usuario
      console.log("Para actualizar el dashboard, modifica el array salesData desde la consola.");
      console.log("Ejemplo: salesData[0].sales = 10");
      console.log("O añade un nuevo vendedor: salesData.push({id: 6, name: 'Nuevo Vendedor', sales: 7, target: 5, avatar: '/placeholder.svg?height=40&width=40'})");