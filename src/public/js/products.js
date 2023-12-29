document.addEventListener('DOMContentLoaded', () => {
  const categoryFilter = document.getElementById('categoryFilter');
  const productList = document.getElementById('productList');
  const paginationDiv = document.getElementById('pagination'); // Nuevo elemento para la paginación

  // Función para obtener productos filtrados por tipo y página
  const fetchProductsByTipoAndPage = async (tipo, page) => {
      const response = await fetch(`/api/products/tipo/${tipo}?page=${page}`);
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
  const renderPagination = (totalPages, tipo) => {
    paginationDiv.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.addEventListener('click', () => {
            fetchProductsByTipoAndPage(tipo, i);
        });
        paginationDiv.appendChild(button);
    }
  };

  // Event listener para el cambio de tipo
  categoryFilter.addEventListener('change', (event) => {
    const selectedTipo = event.target.value; 
    if (selectedTipo === 'all') {
        // Si se selecciona "Todos", simplemente carga todos los productos
        window.location.href = '/products';
    } else {
      window.location.href = `/products/tipo/${selectedTipo}`;
    }
  });

  // Inicialmente, carga todos los productos
  const fetchInitialProducts = async () => {
      const response = await fetch('/api/products');
      const products = await response.json();
      renderProducts(products);
  };

  fetchInitialProducts();
});
