document.addEventListener('DOMContentLoaded', () => {
  const categoryFilter = document.getElementById('categoryFilter');
  const productList = document.getElementById('productList');
  const paginationDiv = document.getElementById('pagination'); // Nuevo elemento para la paginación

  // Función para obtener productos filtrados por categoría y página
  const fetchProductsByCategoryAndPage = async (category, page) => {
      const response = await fetch(`/api/products/category/${category}?page=${page}`);
      const products = await response.json();
      renderProducts(products);
  };

  // Función para renderizar productos en el DOM
  const renderProducts = (products) => {
      productList.innerHTML = '';
      products.forEach(product => {
          const productCard = `
              <div class="product-card">
                  <h2>${product.nombre}</h2>
                  <p>${product.descripcion}</p>
                  <p>Precio: $${product.precio}</p>
                  <p>Stock: ${product.stock}</p>
                  <button class="add-to-cart-btn" data-product-id="${product._id}">Agregar al carrito</button>
              </div>
          `;
          productList.insertAdjacentHTML('beforeend', productCard);
      });
  };

  // Función para renderizar los botones de paginación
  const renderPagination = (totalPages, selectedCategory) => {
      paginationDiv.innerHTML = '';
      for (let i = 1; i <= totalPages; i++) {
          const button = document.createElement('button');
          button.innerText = i;
          button.addEventListener('click', () => {
              fetchProductsByCategoryAndPage(selectedCategory, i);
          });
          paginationDiv.appendChild(button);
      }
  };

  // Event listener para el cambio de categoría
  categoryFilter.addEventListener('change', (event) => {
      const selectedCategory = event.target.value;
      if (selectedCategory === 'all') {
          // Si se selecciona "Todos", simplemente carga todos los productos
          // Aquí deberías implementar la función para obtener todos los productos paginados si lo necesitas
      } else {
          // Si se selecciona una categoría específica, filtra los productos por esa categoría y muestra la paginación
          // Suponiendo que conoces el número total de páginas para la categoría seleccionada
          const totalPages = 5; // A modo de ejemplo, deberías calcular el número real de páginas
          renderPagination(totalPages, selectedCategory);
          fetchProductsByCategoryAndPage(selectedCategory, 1);
      }
  });

  // Inicialmente, carga todos los productos (esto es solo un ejemplo inicial, ajusta según tus necesidades)
  const fetchInitialProducts = async () => {
      const response = await fetch('/api/products');
      const products = await response.json();
      renderProducts(products);
  };

  fetchInitialProducts();
});
